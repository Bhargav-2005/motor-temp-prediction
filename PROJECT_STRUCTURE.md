# Project Structure

```
motor-temp-prediction/
│
├── 📄 README.md                    # Project overview and documentation
├── 📄 SETUP.md                     # Detailed setup instructions
├── 📄 API.md                       # API endpoint documentation
├── 📄 .gitignore                   # Git ignore rules
├── 📄 docker-compose.yml           # Docker orchestration
├── 🚀 quickstart.sh                # Unix/Mac quick start script
├── 🚀 quickstart.bat               # Windows quick start script
│
├── 🔧 backend/                     # Flask Backend
│   ├── 📄 app.py                   # Main Flask application
│   ├── 📄 train_model.py           # Model training script
│   ├── 📄 requirements.txt         # Python dependencies
│   ├── 📄 Dockerfile               # Backend Docker configuration
│   ├── 💾 model.save              # Trained ML model (generated)
│   └── 💾 transform.save          # MinMax scaler (generated)
│
├── 🎨 frontend/                    # React Frontend
│   ├── 📄 package.json            # Node.js dependencies
│   ├── 📄 Dockerfile              # Frontend Docker configuration
│   │
│   ├── 📁 public/
│   │   └── 📄 index.html          # HTML template
│   │
│   └── 📁 src/
│       ├── 📄 index.js            # React entry point
│       ├── 📄 index.css           # Global styles
│       ├── 📄 App.jsx             # Main React component
│       ├── 📄 App.css             # App-specific styles
│       │
│       └── 📁 components/
│           ├── 📄 PredictionForm.jsx      # Input form component
│           ├── 📄 PredictionForm.css      # Form styles
│           ├── 📄 TempGauge.jsx           # Temperature gauge component
│           ├── 📄 TempGauge.css           # Gauge styles
│           ├── 📄 ResultDisplay.jsx       # Results component
│           └── 📄 ResultDisplay.css       # Results styles
│
└── 📁 data/ (optional)
    └── 📄 dataset.csv             # Training dataset
```

## File Descriptions

### Root Directory

| File | Purpose |
|------|---------|
| `README.md` | Comprehensive project documentation with overview, features, and usage |
| `SETUP.md` | Step-by-step installation and configuration guide |
| `API.md` | Complete API reference with examples |
| `.gitignore` | Specifies files to exclude from version control |
| `docker-compose.yml` | Defines multi-container Docker application |
| `quickstart.sh` | Automated setup and run script for Unix/Mac |
| `quickstart.bat` | Automated setup and run script for Windows |

### Backend (`backend/`)

| File | Purpose |
|------|---------|
| `app.py` | Flask REST API with prediction endpoints |
| `train_model.py` | ML model training with multiple algorithms |
| `requirements.txt` | Python package dependencies |
| `Dockerfile` | Container configuration for backend |
| `model.save` | Serialized Decision Tree model (auto-generated) |
| `transform.save` | Serialized MinMax scaler (auto-generated) |

### Frontend (`frontend/`)

| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies and scripts |
| `Dockerfile` | Container configuration for frontend |
| `public/index.html` | HTML template with custom fonts |
| `src/index.js` | React application entry point |
| `src/index.css` | Global styles with futuristic theme |
| `src/App.jsx` | Main application component with state management |
| `src/App.css` | Application layout and animations |

### Components (`frontend/src/components/`)

| Component | Purpose |
|-----------|---------|
| `PredictionForm` | User input form with validation |
| `TempGauge` | Animated circular temperature gauge |
| `ResultDisplay` | Detailed prediction results and recommendations |

## Technology Stack

### Backend
- **Framework:** Flask 3.0
- **ML Library:** scikit-learn 1.3
- **Data Processing:** pandas, numpy
- **API:** RESTful with CORS support

### Frontend
- **Framework:** React 18
- **Charts:** Recharts
- **Icons:** Lucide React
- **HTTP Client:** Axios (via fetch API)
- **Fonts:** Orbitron, IBM Plex Mono (Google Fonts)

### DevOps
- **Containerization:** Docker, Docker Compose
- **Version Control:** Git

## Key Features by Module

### Backend Features
✅ Model training with 4 algorithms  
✅ Automatic best model selection  
✅ RESTful API with 4 endpoints  
✅ Input validation  
✅ Error handling  
✅ Health monitoring  
✅ Batch predictions  

### Frontend Features
✅ Futuristic industrial design  
✅ Real-time form validation  
✅ Animated temperature gauge  
✅ Risk level visualization  
✅ Prediction history tracking  
✅ Sample data loading  
✅ Responsive design  
✅ Dark theme optimized  

## Data Flow

```
┌──────────────┐
│ User Input   │
│ (React Form) │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ HTTP POST        │
│ /predict         │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Flask Backend    │
│ • Validate       │
│ • Scale          │
│ • Predict        │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ ML Model         │
│ Decision Tree    │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ JSON Response    │
│ • Temperature    │
│ • Risk Level     │
│ • Timestamp      │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ React UI         │
│ • Gauge          │
│ • Results        │
│ • Recommendations│
└──────────────────┘
```

## Build Outputs

After building, these additional directories will be created:

```
backend/
├── venv/                    # Python virtual environment
├── __pycache__/            # Python bytecode cache
├── model.save              # Trained model
└── transform.save          # Feature scaler

frontend/
├── node_modules/           # NPM packages
└── build/                  # Production build
```

## Development Workflow

1. **Setup:** Run `quickstart.sh` or `quickstart.bat`
2. **Train Model:** `python backend/train_model.py`
3. **Start Backend:** `python backend/app.py`
4. **Start Frontend:** `npm start` in frontend/
5. **Test:** Access `http://localhost:3000`
6. **Deploy:** Use Docker Compose or build for production

## Production Deployment Structure

```
Production/
├── Frontend (Vercel/Netlify)
│   └── Static build files
│
└── Backend (Heroku/AWS/GCP)
    ├── Flask app
    ├── Model files
    └── Environment variables
```
