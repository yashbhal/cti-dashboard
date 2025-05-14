from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ThreatIndicator(BaseModel):
    indicator: str
    type: str
    first_seen: datetime
    source: str
    tags: List[str]
    severity: str  # Can be "Low", "Medium", "High", "Critical"
