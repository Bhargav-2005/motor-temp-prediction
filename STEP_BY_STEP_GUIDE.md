# 🚀 Complete Step-by-Step Guide

## Electric Motor Temperature Prediction - From Zero to Working App

This guide will walk you through **every single step** to get this application running.

---

## 📋 Table of Contents

1. [Prerequisites Installation](#1-prerequisites-installation)
2. [Project Setup](#2-project-setup)
3. [Training the ML Model](#3-training-the-ml-model)
4. [Backend Setup and Testing](#4-backend-setup-and-testing)
5. [Frontend Setup](#5-frontend-setup)
6. [Running the Complete Application](#6-running-the-complete-application)
7. [Understanding Each Component](#7-understanding-each-component)
8. [Jupyter Notebook Usage](#8-jupyter-notebook-usage)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Prerequisites Installation

### Windows Users:

**Step 1.1: Install Python**
1. Download Python 3.9+ from https://www.python.org/downloads/
2. **IMPORTANT**: Check "Add Python to PATH" during installation
3. Verify installation:
   ```cmd
   python --version
   ```

**Step 1.2: Install Node.js**
1. Download from https://nodejs.org/ (LTS version)
2. Run installer with default options
3. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

**Step 1.3: Install Git (Optional)**
1. Download from https://git-scm.com/
2. Install with default options

### Mac/Linux Users:

**Step 1.1: Install Python**
```bash
# Mac (using Homebrew)
brew install python@3.9

# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip python3-venv

# Verify
python3 --version
```

**Step 1.2: Install Node.js**
```bash
# Mac (using Homebrew)
brew install node

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

---

## 2. Project Setup

### Step 2.1: Navigate to Project Directory

**Windows:**
```cmd
cd path\to\motor-temp-prediction
```

**Mac/Linux:**
```bash
cd path/to/motor-temp-prediction
```

### Step 2.2: Verify Project Structure

You should see these folders:
```
motor-temp-prediction/
├── backend/
├── frontend/
├── README.md
└── other files...
```

---

## 3. Training the ML Model

### Step 3.1: Setup Python Virtual Environment

**Windows:**
```cmd
cd backend
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### Step 3.2: Install Python Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**Wait for installation to complete** (2-5 minutes)

### Step 3.3: Train the Model

```bash
python train_model.py
```

**What this does:**
- Creates sample dataset (10,000 records)
- Trains 4 different ML models
- Compares their performance
- Saves the best model

**Expected Output:**
```
============================================================
Electric Motor Temperature Prediction - Model Training
============================================================
Creating sample dataset...
Sample dataset created: sample_dataset.csv

Preprocessing data...
Training models...

Training Linear Regression...
R² Score: 0.9632
RMSE: 0.0365

...

Best model: Linear Regression
Model saved as 'model.save'
Scaler saved as 'transform.save'
============================================================
```

**Files Created:**
- ✅ `model.save` - Trained ML model
- ✅ `transform.save` - Feature scaler
- ✅ `sample_dataset.csv` - Training data

### Step 3.4: Verify Model Files

**Windows:**
```cmd
dir *.save
```

**Mac/Linux:**
```bash
ls -lh *.save
```

You should see both `model.save` and `transform.save`

---

## 4. Backend Setup and Testing

### Step 4.1: Test Backend Server

Make sure you're still in the `backend/` directory with virtual environment active.

```bash
python app.py
```

**Expected Output:**
```
 * Running on http://0.0.0.0:5000
✓ Model and scaler loaded successfully
```

**Keep this terminal running!**

### Step 4.2: Test API (Open New Terminal)

**Open a NEW terminal/command prompt** (keep the backend running)

**Test 1: Health Check**
```bash
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true,
  "timestamp": "2026-02-05T..."
}
```

**Test 2: Make a Prediction**

**Windows PowerShell:**
```powershell
$body = @{
    ambient = 25.5
    coolant = 22.3
    u_d = 0.45
    u_q = 0.38
    motor_speed = 1500
    i_d = 12.5
    i_q = 15.2
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/predict -Method Post -Body $body -ContentType "application/json"
```

**Mac/Linux:**
```bash
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

**Expected Response:**
```json
{
  "success": true,
  "prediction": 0.6842,
  "risk_level": "normal",
  "timestamp": "...",
  "input_features": {...}
}
```

✅ **If you see this response, your backend is working perfectly!**

---

## 5. Frontend Setup

### Step 5.1: Open New Terminal for Frontend

**Keep the backend terminal running!**

Open a **third terminal** and navigate to frontend:

**Windows:**
```cmd
cd path\to\motor-temp-prediction\frontend
```

**Mac/Linux:**
```bash
cd path/to/motor-temp-prediction/frontend
```

### Step 5.2: Install Node.js Dependencies

```bash
npm install
```

**This will take 3-5 minutes.** You'll see a progress bar.

**Expected Output:**
```
added 1500+ packages in 3m
```

### Step 5.3: Start React Development Server

```bash
npm start
```

**What happens:**
- React app compiles (takes 30-60 seconds first time)
- Browser automatically opens to http://localhost:3000
- You'll see "Compiling..." then the app loads

**Expected Output:**
```
Compiled successfully!

You can now view motor-temp-prediction-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

---

## 6. Running the Complete Application

### Current Status Check

You should now have **3 terminals running**:

1. **Terminal 1 (Backend):**
   ```
   cd backend
   venv active
   python app.py
   → Running on http://0.0.0.0:5000
   ```

2. **Terminal 2 (Empty/Testing):**
   ```
   Used for testing API calls
   ```

3. **Terminal 3 (Frontend):**
   ```
   cd frontend
   npm start
   → Running on http://localhost:3000
   ```

### Step 6.1: Access the Application

Open browser to: **http://localhost:3000**

You should see:
- Header: "MOTOR TEMP PREDICTOR"
- Left panel: Input form with 7 fields
- Right panel: "No predictions yet"

### Step 6.2: Make Your First Prediction

1. **Click "Load Sample" button** → Form fills with test data
2. **Click "Predict Temperature" button**
3. **Watch the magic happen!** ✨
   - Gauge animates
   - Temperature displays
   - Risk level shows with color

### Step 6.3: Try Different Values

Experiment with different inputs:

**Low Temperature (Safe):**
- Ambient: 20
- Coolant: 18
- Motor Speed: 500
- All others: 5

**High Temperature (Warning):**
- Ambient: 35
- Coolant: 30
- Motor Speed: 3000
- All others: 50

---

## 7. Understanding Each Component

### What Each File Does

#### Backend Files

**`train_model.py`** - Model Training Script
- **Purpose:** Train ML model from data
- **When to run:** Once initially, or when retraining
- **Creates:** model.save, transform.save, sample_dataset.csv
- **Run with:** `python train_model.py`

**`app.py`** - Flask API Server
- **Purpose:** Serve predictions via REST API
- **When to run:** Always (for the app to work)
- **Endpoints:**
  - `/health` - Check if server is running
  - `/predict` - Get temperature prediction
  - `/batch-predict` - Predict multiple samples
  - `/model-info` - Get model details
- **Run with:** `python app.py`

**`model.save`** - Trained ML Model
- **Purpose:** Serialized machine learning model
- **Created by:** train_model.py
- **Used by:** app.py for predictions
- **Format:** Joblib pickle file

**`transform.save`** - Feature Scaler
- **Purpose:** Normalizes input data (0-1 scale)
- **Why needed:** ML model expects normalized inputs
- **Created by:** train_model.py
- **Used by:** app.py before prediction

**`test_app.py`** - Unit Tests
- **Purpose:** Test API endpoints
- **When to run:** After changes to app.py
- **Run with:** `pytest test_app.py`

#### Frontend Files

**`src/index.js`** - Entry Point
- **Purpose:** Initialize React app
- **What it does:** Mounts App component to DOM
- **You modify:** Rarely

**`src/App.jsx`** - Main Application
- **Purpose:** Main UI component
- **Contains:**
  - State management
  - API calls to backend
  - Form handling
  - Result display
- **You modify:** Often (for features)

**`src/index.css`** - Global Styles
- **Purpose:** App-wide styling
- **Contains:**
  - CSS variables (colors, fonts)
  - Base styles
  - Animations
- **You modify:** For theme changes

**`src/App.css`** - Component Styles
- **Purpose:** Specific component styling
- **Contains:**
  - Layout styles
  - Component-specific CSS
- **You modify:** For UI changes

**`package.json`** - Node.js Config
- **Purpose:** Define dependencies and scripts
- **Contains:**
  - React and library versions
  - NPM scripts (start, build, test)
- **You modify:** When adding libraries

**`public/index.html`** - HTML Template
- **Purpose:** Base HTML file
- **Contains:**
  - Meta tags
  - Font imports
  - Root div
- **You modify:** For fonts, meta tags

---

## 8. Jupyter Notebook Usage

### What to Do in Jupyter vs. Python Files

#### Use Jupyter Notebook (`exploration.ipynb`) For:

**1. Data Exploration**
```python
# Load and examine data
import pandas as pd
df = pd.read_csv('sample_dataset.csv')
df.head()
df.describe()
df.info()
```

**2. Visualization**
```python
# Plot feature distributions
import matplotlib.pyplot as plt
df.hist(bins=50, figsize=(15, 10))
plt.show()

# Correlation heatmap
import seaborn as sns
sns.heatmap(df.corr(), annot=True)
```

**3. Experiment with Models**
```python
# Try different models quickly
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor

# Quick training
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Immediate results
score = model.score(X_test, y_test)
print(f"R² Score: {score}")
```

**4. Feature Engineering**
```python
# Create new features
df['temp_diff'] = df['ambient'] - df['coolant']
df['power'] = df['motor_speed'] * (df['i_d']**2 + df['i_q']**2)

# Test if they improve model
```

**5. Interactive Testing**
```python
# Test predictions interactively
import joblib
model = joblib.load('model.save')

test_input = [[25, 22, 0.5, 0.4, 1500, 12, 15]]
prediction = model.predict(test_input)
print(f"Predicted temp: {prediction[0]}")
```

#### Use Python Files (`train_model.py`) For:

**1. Production Model Training**
- Final model training
- Automated preprocessing
- Model saving
- Reproducible results

**2. Batch Processing**
- Training on large datasets
- Automated retraining
- Scheduled model updates

**3. Pipeline Creation**
- Complete data → model pipeline
- Consistent preprocessing
- Version control

### How to Use Jupyter Notebook

**Step 1: Install Jupyter**
```bash
# With venv activated
pip install jupyter notebook
```

**Step 2: Start Jupyter**
```bash
cd backend
jupyter notebook
```

Browser opens automatically to Jupyter interface.

**Step 3: Open exploration.ipynb**
- Click on `exploration.ipynb`
- Run cells one by one with Shift+Enter
- Modify and experiment

**Step 4: Export Findings**
When you find something that works:
1. Copy code from Jupyter
2. Add to `train_model.py`
3. Test with `python train_model.py`
4. Commit to version control

---

## 9. Troubleshooting

### Problem: "python: command not found"

**Windows:** Use `python` instead of `python3`
**Mac/Linux:** Use `python3` instead of `python`

### Problem: "pip: command not found"

**Solution:**
```bash
# Windows
python -m pip install -r requirements.txt

# Mac/Linux
python3 -m pip install -r requirements.txt
```

### Problem: "Permission denied"

**Windows:** Run Command Prompt as Administrator
**Mac/Linux:**
```bash
sudo pip install -r requirements.txt
# Or use --user flag
pip install --user -r requirements.txt
```

### Problem: Port 5000 already in use

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

Or change port in `app.py`:
```python
app.run(host='0.0.0.0', port=5001, debug=True)
```

### Problem: Frontend can't connect to backend

**Check:**
1. Backend is running: Visit http://localhost:5000/health
2. CORS is enabled: Check `app.py` has `CORS(app)`
3. Correct URL: Check API_URL in frontend code

**Fix:** Update frontend API URL if needed:
```javascript
// In App.jsx
const response = await fetch('http://localhost:5000/predict', ...
```

### Problem: "Module not found"

**Backend:**
```bash
cd backend
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate      # Windows
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Problem: Model accuracy is low

**Solutions:**
1. Use real data instead of synthetic
2. Increase dataset size
3. Try different algorithms
4. Add feature engineering
5. Tune hyperparameters

### Problem: React app won't start

**Solution:**
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm start
```

---

## 🎯 Quick Reference Commands

### Start Everything (3 Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

**Terminal 3 - Testing:**
```bash
# Use for curl commands, Jupyter, etc.
```

### Stop Everything

- Press `Ctrl+C` in each terminal
- Or close terminal windows

### Retrain Model

```bash
cd backend
source venv/bin/activate
python train_model.py
```

### Run Tests

```bash
cd backend
pytest test_app.py -v
```

### Build for Production

**Backend:**
```bash
cd backend
pip install gunicorn
gunicorn app:app
```

**Frontend:**
```bash
cd frontend
npm run build
# Output in build/ folder
```

---

## 🎓 Learning Path

### Beginner:
1. Run the app with sample data
2. Try different input values
3. Explore Jupyter notebook
4. Modify colors in CSS

### Intermediate:
1. Add new features to frontend
2. Modify API endpoints
3. Train with custom data
4. Add new visualizations

### Advanced:
1. Implement user authentication
2. Add database for history
3. Deploy to cloud
4. Create mobile app

---

## 📞 Need Help?

1. **Check logs:** Look at terminal output for errors
2. **Read error messages:** They usually tell you what's wrong
3. **Search documentation:** Check README.md, API.md, etc.
4. **Test components:** Test backend and frontend separately

---

**You're all set! Start with Step 1 and work through each section.** 🚀
