import os
from datetime import datetime, timedelta
from typing import List
from OTXv2 import OTXv2
from dotenv import load_dotenv
from .models import ThreatIndicator

load_dotenv()

class OTXClient:
    def __init__(self):
        self.api_key = os.getenv("OTX_API_KEY")
        if not self.api_key:
            raise ValueError("OTX_API_KEY not found in environment variables")
        self.client = OTXv2(self.api_key)

    def _determine_severity(self, pulse) -> str:
        # Simple severity determination based on tags
        high_risk_terms = {"malware", "ransomware", "exploit", "critical"}
        medium_risk_terms = {"suspicious", "warning", "phishing"}
        
        tags = {tag.lower() for tag in pulse.get("tags", [])}
        
        if tags & high_risk_terms:
            return "High"
        elif tags & medium_risk_terms:
            return "Medium"
        return "Low"

    def get_recent_indicators(self, days: int = 30) -> List[ThreatIndicator]:
        # Increase default days to get more diverse data
        since = datetime.now() - timedelta(days=days)
        since_timestamp = since.isoformat()
        
        try:
            # Get recent pulses
            pulses = self.client.getall(modified_since=since_timestamp)
            
            indicators = []
            type_counts = {}  # Track counts of each type to ensure diversity
            max_per_type = 20  # Maximum number of indicators per type
            
            # Process each pulse to extract indicators
            for pulse in pulses:
                for indicator in pulse.get('indicators', []):
                    try:
                        indicator_type = indicator.get("type", "unknown")
                        
                        # Skip if we already have enough of this type
                        if type_counts.get(indicator_type, 0) >= max_per_type:
                            continue
                            
                        # Create a ThreatIndicator object for each indicator
                        threat = ThreatIndicator(
                            indicator=indicator.get("indicator", ""),
                            type=indicator_type,
                            first_seen=indicator.get("created", datetime.now().isoformat()),
                            source="AlienVault OTX",
                            tags=pulse.get("tags", []),
                            severity=self._determine_severity(pulse)
                        )
                        
                        # Update type count
                        type_counts[indicator_type] = type_counts.get(indicator_type, 0) + 1
                        indicators.append(threat)
                    except Exception as e:
                        print(f"Error processing indicator: {e}")
                        continue
            
            # If we didn't get enough diverse data, fall back to some predefined types
            if len(type_counts.keys()) < 4:
                print(f"Warning: Only found {len(type_counts.keys())} different indicator types. Adding sample data.")
                # Add some sample indicators of different types for better visualization
                sample_indicators = [
                    {"indicator": "malicious-domain.com", "type": "domain", "severity": "High"},
                    {"indicator": "192.168.1.100", "type": "IPv4", "severity": "Medium"},
                    {"indicator": "https://malicious-url.com/path", "type": "URL", "severity": "Critical"},
                    {"indicator": "5f4dcc3b5aa765d61d8327deb882cf99", "type": "FileHash-MD5", "severity": "Low"}
                ]
                
                for sample in sample_indicators:
                    if sample["type"] not in type_counts or type_counts[sample["type"]] < 5:
                        threat = ThreatIndicator(
                            indicator=sample["indicator"],
                            type=sample["type"],
                            first_seen=datetime.now().isoformat(),
                            source="Sample Data",
                            tags=["sample"],
                            severity=sample["severity"]
                        )
                        indicators.append(threat)
            
            print(f"Returning {len(indicators)} indicators with {len(type_counts.keys())} different types")
            return indicators[:100]  # Limit to 100 indicators for performance
        except Exception as e:
            print(f"Error fetching pulses from OTX: {e}")
            raise
