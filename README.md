# Cyber Threat Intelligence Dashboard

A modern, full-stack web application that aggregates and visualizes Cyber Threat Intelligence (CTI) data from AlienVault OTX. Built with a clean, minimal design focusing on usability and efficient data presentation.

## Features

- **Real-time Threat Data**
  - Direct integration with AlienVault OTX API
  - Automatic data refresh
  - Comprehensive threat indicators

- **Advanced Filtering & Search**
  - Full-text search across indicators
  - Quick severity filters
  - Type-based categorization

- **Visual Analytics**
  - Interactive donut charts for type distribution
  - Severity breakdown with color-coded indicators
  - Clean, modern data presentation

- **Modern UI/UX**
  - Responsive design for all devices
  - Dark mode support
  - Shadcn UI components
  - Smooth animations and transitions

## Tech Stack

### Backend
- Python 3.8+
- FastAPI - High-performance API framework
- OTXv2 SDK - Official AlienVault client
- Pydantic - Data validation

### Frontend
- Next.js 14 - React framework
- TypeScript - Type-safe code
- Tailwind CSS - Utility-first styling
- Shadcn UI - Modern component library
- Tremor - Data visualization

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- AlienVault OTX API key ([Get one here](https://otx.alienvault.com/api))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cti-dashboard.git
cd cti-dashboard
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Add your OTX API key to this file
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

### Configuration

1. Backend configuration (`.env`):
```plaintext
OTX_API_KEY=your_api_key_here
```

### Running the Application

1. Start the backend server:
```bash
cd backend
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
uvicorn app.main:app --reload
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Access the application at `http://localhost:3000`

## Development

### Project Structure

```
cti-dashboard/
├── backend/
│   ├── app/
│   │   ├── main.py      # FastAPI application
│   │   ├── models.py    # Data models
│   │   └── otx_client.py # OTX API client
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── app/         # Next.js pages
    │   ├── components/  # React components
    │   ├── lib/        # Utilities
    │   └── types/      # TypeScript types
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


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
