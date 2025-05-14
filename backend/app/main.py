from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from .models import ThreatIndicator
from .otx_client import OTXClient

app = FastAPI(title="CTI Dashboard API")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OTX client
otx_client = None

@app.on_event("startup")
async def startup_event():
    global otx_client
    try:
        otx_client = OTXClient()
    except ValueError as e:
        print(f"Error initializing OTX client: {e}")

@app.get("/api/threats", response_model=List[ThreatIndicator])
async def get_threats(days: int = 7):
    if not otx_client:
        raise HTTPException(status_code=500, detail="OTX client not initialized")
    
    try:
        return otx_client.get_recent_indicators(days=days)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
