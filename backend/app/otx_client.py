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

    def get_recent_indicators(self, days: int = 7) -> List[ThreatIndicator]:
        since = datetime.now() - timedelta(days=days)
        pulses = self.client.get_pulse_indicators(modified_since=since)
        
        indicators = []
        for pulse in pulses:
            indicator = ThreatIndicator(
                indicator=pulse.get("indicator", ""),
                type=pulse.get("type", "unknown"),
                first_seen=pulse.get("created", datetime.now()),
                source="AlienVault OTX",
                tags=pulse.get("tags", []),
                severity=self._determine_severity(pulse)
            )
            indicators.append(indicator)
        
        return indicators
