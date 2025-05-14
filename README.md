# Cyber Threat Intelligence Dashboard

A full-stack web application that pulls and visualizes Cyber Threat Intelligence (CTI) data from AlienVault OTX.

## Features

- Real-time threat data from AlienVault OTX
- Searchable and filterable threat indicators
- Visual analytics with charts:
  - Indicator type distribution
  - Threats by severity
  - Timeline view
- Modern, responsive UI built with Next.js and Tailwind CSS

## Tech Stack

### Backend
- Python
- FastAPI
- OTXv2 SDK

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Tremor (charts and UI components)

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- AlienVault OTX API key

### Setup

1. Clone the repository

2. Set up the backend:
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env  # Add your OTX API key
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
uvicorn app.main:app --reload
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open http://localhost:3000 in your browser

## API Endpoints

- GET `/api/threats` - Fetch recent threat indicators
  - Query params:
    - `days` (optional): Number of days to look back (default: 7)

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py       # FastAPI application
│   │   ├── models.py     # Data models
│   │   └── otx_client.py # OTX API client
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── app/          # Next.js pages
    │   ├── components/   # React components
    │   └── types/        # TypeScript types
    └── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
