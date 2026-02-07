# Setup Guide - Electric Motor Temperature Prediction

This guide will help you set up and run the Electric Motor Temperature Prediction application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Training the Model](#training-the-model)
4. [Running the Application](#running-the-application)
5. [Using Docker](#using-docker)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Node.js 16+** - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

### Optional

- **Docker & Docker Compose** - [Download](https://www.docker.com/) (for containerized deployment)
- **Anaconda** - [Download](https://www.anaconda.com/) (alternative Python environment)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd motor-temp-prediction
```

### 2. Backend Setup

#### Option A: Using pip (Recommended)

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Option B: Using Anaconda

```bash
cd backend

# Create conda environment
conda create -n motor-temp python=3.9

# Activate environment
conda activate motor-temp

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Or using yarn
yarn install
```

## Training the Model

Before running the application, you need to train the ML model.

### Option 1: Using Sample Data (Quick Start)

```bash
cd backend
python train_model.py
```

This will:
- Generate a sample dataset
- Train multiple models
- Save the best model (Decision Tree Regressor)
- Create `model.save` and `transform.save` files

### Option 2: Using Real Dataset

1. Download the dataset from [Kaggle](https://www.kaggle.com/datasets/wkirgsn/electric-motor-temperature)
2. Extract and place `dataset.csv` in the `backend/` directory
3. Run the training script:

```bash
cd backend
python train_model.py
```

### Expected Output

```
============================================================
Electric Motor Temperature Prediction - Model Training
============================================================
Creating sample dataset...
Sample dataset created: sample_dataset.csv
...
Model Performance Summary:
------------------------------------------------------------
✓ Decision Tree          | R²: 0.9600 | RMSE: 0.0300
  Linear Regression      | R²: 0.8200 | RMSE: 0.1500
  Random Forest          | R²: 0.9400 | RMSE: 0.0500
  SVR                    | R²: 0.8800 | RMSE: 0.0900
------------------------------------------------------------
```

## Running the Application

### Development Mode

#### 1. Start the Backend Server

```bash
cd backend

# Make sure virtual environment is activated
# Then run:
python app.py
```

The backend will start on `http://localhost:5000`

You should see:
```
 * Running on http://0.0.0.0:5000
✓ Model and scaler loaded successfully
```

#### 2. Start the Frontend Development Server

Open a new terminal:

```bash
cd frontend

npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

### Production Build

#### Backend

```bash
cd backend
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

#### Frontend

```bash
cd frontend

# Create production build
npm run build

# Serve using a static server
npx serve -s build -l 3000
```

## Using Docker

Docker provides an easy way to run the entire application with a single command.

### 1. Build and Start Containers

```bash
# From the project root directory
docker-compose up --build
```

This will:
- Build Docker images for both frontend and backend
- Start both services
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

### 2. Stop Containers

```bash
docker-compose down
```

### 3. View Logs

```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Frontend only
docker-compose logs -f frontend
```

## Verification

### Test Backend API

```bash
# Health check
curl http://localhost:5000/health

# Test prediction
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "ambient": 25.5,
    "coolant": 22.3,
    "u_d": 0.45,
    "u_q": 0.38,
    "motor_speed": 1500,
    "i_d": 12.5,
    "i_q": 15.2
  }'
```

Expected response:
```json
{
  "success": true,
  "prediction": 0.6842,
  "risk_level": "normal",
  "timestamp": "2026-01-30T10:30:00Z"
}
```

### Test Frontend

1. Open browser to `http://localhost:3000`
2. You should see the "MOTOR TEMP PREDICTOR" interface
3. Click "Load Sample" to populate the form
4. Click "Predict Temperature" to test the prediction

## Troubleshooting

### Backend Issues

#### Model Not Found Error

```
✗ Error loading model: [Errno 2] No such file or directory: 'model.save'
```

**Solution:** Train the model first:
```bash
cd backend
python train_model.py
```

#### Port Already in Use

```
OSError: [Errno 48] Address already in use
```

**Solution:** Kill the process using port 5000:
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

#### CORS Errors

If you see CORS errors in the browser console:

1. Verify Flask-CORS is installed:
```bash
pip install flask-cors
```

2. Check that CORS is enabled in `app.py`:
```python
from flask_cors import CORS
CORS(app)
```

### Frontend Issues

#### Dependencies Installation Failed

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Cannot Connect to Backend

1. Verify backend is running on port 5000
2. Check if the API URL is correct in frontend code
3. Look for CORS errors in browser console

#### Build Fails

```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Docker Issues

#### Port Conflicts

Edit `docker-compose.yml` to use different ports:
```yaml
ports:
  - "5001:5000"  # Backend
  - "3001:3000"  # Frontend
```

#### Build Cache Issues

```bash
# Rebuild without cache
docker-compose build --no-cache

# Remove all containers and volumes
docker-compose down -v
```

## Environment Variables

### Backend

Create `.env` file in `backend/` directory:

```env
FLASK_ENV=development
FLASK_DEBUG=1
PORT=5000
MODEL_PATH=model.save
SCALER_PATH=transform.save
```

### Frontend

Create `.env` file in `frontend/` directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## Next Steps

- Read the [README.md](README.md) for project overview
- Explore the API endpoints in `backend/app.py`
- Customize the UI in `frontend/src/components/`
- Review model training in `backend/train_model.py`

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review application logs
3. Open an issue on GitHub
4. Contact support team

---

**Happy Predicting! 🚀**
