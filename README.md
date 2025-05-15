# Cyber Threat Intelligence Dashboard

![Dashboard Preview](cti-dash-demo.gif)
[the grid-filled look has shown up as part of the conversion from .mov to .gif, they don't exist on the web. this is just a quick visual of what it looks like deployed]
A modern, full-stack web application that aggregates and visualizes Cyber Threat Intelligence (CTI) data from AlienVault OTX. Built with a professional dark-mode design focusing on usability, efficient data presentation, and subtle animations for an enhanced user experience.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- AlienVault OTX API key ([Get it here](https://otx.alienvault.com/api))

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cti-dashboard.git
   cd cti-dashboard
   ```

2. **Set up the backend**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Create and activate virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env and add your OTX API key
   
   # Start the backend server
   cd app
   uvicorn main:app --reload
   # Backend will be available at http://localhost:8000
   ```

3. **Set up the frontend**
   ```bash
   # Navigate to frontend directory
   cd frontend
   
   # Install dependencies
   npm install
   
   # Set up environment variables
   cp .env.example .env.local
   # The default configuration should work for local development
   
   # Start the development server
   npm run dev
   # Frontend will be available at http://localhost:3000
   ```

4. **Access the Dashboard**
   - Open your browser and navigate to http://localhost:3000
   - The dashboard should connect to your local backend automatically
   - If you see no data, verify your OTX API key is correctly set in the backend .env file

### Troubleshooting

- **No data showing up?**
  - Verify your OTX API key is correct
  - Check the backend console for any error messages
  - Ensure both frontend and backend are running
  
- **CORS errors in console?**
  - Make sure you're running the frontend on http://localhost:3000
  - Verify the backend is running on http://localhost:8000
  - Check that NEXT_PUBLIC_API_URL is set correctly in frontend .env.local

- **Module not found errors?**
  - For backend: Make sure you've activated the virtual environment
  - For frontend: Delete node_modules and run npm install again

## What It Does

The Cyber Threat Intelligence Dashboard connects to the AlienVault Open Threat Exchange (OTX) API to fetch, process, and visualize real-time threat intelligence data. It provides security professionals with a clear, intuitive interface to monitor, analyze, and respond to emerging cyber threats across various categories including domains, IPs, URLs, file hashes, and more.

## Features

- **Real-time Threat Intelligence**
  - Direct integration with AlienVault OTX API
  - Configurable timeframe selection (7, 14, 30 days)
  - Manual refresh capability
  - Comprehensive threat indicators with diverse types

- **Advanced Filtering & Search**
  - Full-text search across indicators and types
  - Quick severity filters (Critical, High, Medium, Low)
  - Type-based categorization with visual indicators
  - Real-time filtering with animated transitions

- **Visual Analytics**
  - Interactive donut charts for threat type distribution with percentage labels
  - Severity breakdown with color-coded indicators
  - Summary cards showing total indicators, unique types, and severity counts
  - Clean, modern data presentation optimized for quick insights

- **Modern UI/UX**
  - Responsive design that works on desktop, tablet, and mobile devices
  - Professional dark mode interface with subtle indigo/purple accents
  - Desaturated status colors for better readability
  - Smooth animations and transitions for an engaging experience
  - Interactive hover states and visual feedback
  - Loading skeletons during data fetching

- **Robust Architecture**
  - Fallback to sample data if API is unavailable
  - Error handling with user-friendly messages
  - Optimized for performance with pagination and data limiting

## Design Choices

The dashboard was designed with the following principles in mind:

- **Professional Cybersecurity Aesthetic**
  - Dark mode interface (bg-gray-950) to reduce eye strain and create a professional look
  - Subtle indigo/purple accent colors that convey security and trust
  - Desaturated reds/greens/yellows for status indicators to avoid visual overwhelm
  - Softer chart colors (purple, teal, muted blue) for better readability

- **Information Hierarchy**
  - White primary text and gray-400 secondary text for clear content hierarchy
  - Subtle gradient title (indigo to purple) to draw attention to important sections
  - Consistent max-w-7xl layout for optimal readability
  - Grouped status cards with subtle borders and shadows

- **User Experience**
  - Side-by-side charts on desktop, stacked on mobile for optimal space usage
  - Card-based design for table filters to visually group related controls
  - Hover states and loading indicators for better user feedback
  - Subtle transitions and animations to guide user attention without distraction
  - Icons paired with text for improved comprehension

## Tech Stack

### Backend
- **Python 3.8+** - Core programming language
- **FastAPI** - High-performance API framework with automatic OpenAPI documentation
- **OTXv2 SDK** - Official AlienVault client for reliable data access
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server for production deployment
- **python-dotenv** - Environment variable management

### Frontend
- **Next.js 14** - React framework with server-side rendering capabilities
- **TypeScript** - Type-safe code for better developer experience and fewer bugs
- **Tailwind CSS** - Utility-first styling for rapid UI development
- **Shadcn UI** - Modern, accessible component library
- **Tremor** - Data visualization components optimized for dashboards
- **Framer Motion** - Animation library for smooth transitions and effects
- **Lucide Icons** - Consistent, clean SVG icons

## How It Works

### Data Flow

1. **Data Collection**
   - The backend connects to the AlienVault OTX API using the provided API key
   - It fetches recent threat intelligence pulses from the specified timeframe
   - The data is processed to extract relevant indicators and enrich them with severity information

2. **Data Processing**
   - Indicators are categorized by type (domain, IP, URL, file hash, etc.)
   - Severity levels are assigned based on tags and context (Critical, High, Medium, Low)
   - The system ensures diversity of indicator types by limiting each type to a maximum count
   - If insufficient diverse data is available, the system adds sample indicators to improve visualization

3. **Data Presentation**
   - The frontend fetches processed data from the backend API
   - Charts visualize the distribution of threat types and severity levels
   - The table component displays detailed information about each indicator
   - Users can filter and search through the data in real-time

### Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  AlienVault │     │   Backend   │     │  Frontend   │
│  OTX API    │────▶│  FastAPI    │────▶│  Next.js    │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                   │
                           ▼                   ▼
                    ┌─────────────┐     ┌─────────────┐
                    │ Data Models │     │    UI       │
                    │ Processing  │     │ Components  │
                    └─────────────┘     └─────────────┘
```

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
cp .env.example .env.local  # Configure your environment variables
```

### Configuration

1. Backend configuration (`.env`):
```plaintext
OTX_API_KEY=your_api_key_here
```

2. Frontend configuration (`.env.local`):
```plaintext
NEXT_PUBLIC_API_URL=http://localhost:8000
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

### Using the Dashboard

1. **View Threat Intelligence**
   - The dashboard loads with the default 7-day timeframe
   - The top section shows charts visualizing threat types and severity distribution
   - The bottom section displays a detailed table of all threat indicators

2. **Filter and Search**
   - Use the search box to find specific indicators or types
   - Use the severity dropdown to filter by threat severity
   - Results update in real-time with smooth animations

3. **Change Timeframe**
   - Select different timeframes (7, 14, or 30 days) to view threats from different periods
   - Use the refresh button to manually update the data

4. **Interact with Charts**
   - Hover over chart segments to see detailed information
   - View the summary card for quick statistics about the current dataset

## Development

### Project Structure

```
cti-dashboard/
├── backend/
│   ├── app/
│   │   ├── main.py       # FastAPI application and endpoints
│   │   ├── models.py     # Pydantic data models
│   │   └── otx_client.py # AlienVault OTX API client
│   ├── requirements.txt  # Python dependencies
│   └── .env.example      # Example environment variables
└── frontend/
    ├── public/           # Static assets
    │   └── grid.svg      # Background pattern
    ├── src/
    │   ├── app/          # Next.js pages and layouts
    │   │   ├── page.tsx  # Main dashboard page
    │   │   ├── layout.tsx # Root layout with common elements
    │   │   └── animations.css # Custom animations
    │   ├── components/   # React components
    │   │   ├── ThreatCharts.tsx # Chart visualizations
    │   │   ├── ThreatTable.tsx  # Data table
    │   │   └── ui/       # Reusable UI components
    │   ├── lib/          # Utilities and helpers
    │   │   ├── api.ts    # API client functions
    │   │   └── utils.ts  # Utility functions
    │   ├── types/        # TypeScript type definitions
    │   └── data/         # Mock data for development
    ├── package.json      # Node dependencies
    └── .env.local        # Frontend environment variables
```

### API Endpoints

- **GET** `/api/threats` - Fetch recent threat indicators
  - Query parameters:
    - `days` (optional): Number of days to look back (default: 7)
  - Response: Array of threat indicators with the following properties:
    - `indicator`: The actual threat indicator (domain, IP, hash, etc.)
    - `type`: Type of the indicator (domain, IPv4, URL, FileHash-MD5, etc.)
    - `severity`: Threat severity (Critical, High, Medium, Low)
    - `first_seen`: ISO timestamp of when the threat was first observed
    - `source`: Source of the threat data
    - `tags`: Array of tags associated with the threat

## Extending the Dashboard

The CTI Dashboard is designed to be extensible. Here are some ways you can enhance it:

1. **Add New Data Sources**
   - Implement additional clients for other threat intelligence platforms
   - Modify the `otx_client.py` file or create new client classes

2. **Create New Visualizations**
   - Add new chart types in the `ThreatCharts.tsx` component
   - Consider timeline views, geographic maps, or relationship graphs

3. **Implement Advanced Features**
   - User authentication for personalized dashboards
   - Alerting capabilities for critical threats
   - Threat enrichment with additional context from other sources
   - Export functionality for reports and sharing

4. **Optimize for Production**
   - Add caching mechanisms for API responses
   - Implement server-side pagination for large datasets
   - Set up CI/CD pipelines for automated testing and deployment

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [AlienVault OTX](https://otx.alienvault.com/) for providing the threat intelligence API
- [Tremor](https://www.tremor.so/) for the excellent chart components
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for the animation library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the React framework
- [FastAPI](https://fastapi.tiangolo.com/) for the API framework


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
