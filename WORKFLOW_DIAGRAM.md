# 🔄 Project Workflow & Architecture

## Visual Guide: How Everything Connects

```
┌─────────────────────────────────────────────────────────────────┐
│                     YOUR COMPUTER                                │
│                                                                  │
│  ┌────────────────┐    ┌────────────────┐    ┌───────────────┐ │
│  │   Terminal 1   │    │   Terminal 2   │    │   Terminal 3  │ │
│  │   (Backend)    │    │   (Frontend)   │    │   (Optional)  │ │
│  │                │    │                │    │               │ │
│  │  cd backend    │    │  cd frontend   │    │  Testing/     │ │
│  │  python app.py │    │  npm start     │    │  Jupyter      │ │
│  │                │    │                │    │               │ │
│  │  Port: 5000    │    │  Port: 3000    │    │               │ │
│  └────────┬───────┘    └────────┬───────┘    └───────────────┘ │
│           │                     │                               │
└───────────┼─────────────────────┼───────────────────────────────┘
            │                     │
            │                     │
    ┌───────▼────────┐    ┌───────▼────────┐
    │  Flask Server  │    │  React Dev     │
    │  (Backend)     │◄───┤  Server        │
    │                │ API│  (Frontend)    │
    │  Endpoints:    │────►                │
    │  /health       │HTTP│  Renders UI    │
    │  /predict      │    │  Sends API     │
    │  /batch-predict│    │  Requests      │
    │  /model-info   │    │                │
    └───────┬────────┘    └────────────────┘
            │
    ┌───────▼────────┐
    │  ML Model      │
    │  (model.save)  │
    │                │
    │  Inputs:       │
    │  7 parameters  │
    │                │
    │  Output:       │
    │  Temperature   │
    │  Risk Level    │
    └────────────────┘
```

---

## 📊 Data Flow Diagram

```
USER MAKES PREDICTION
         │
         ▼
┌────────────────────┐
│   React Frontend   │  http://localhost:3000
│   (Browser)        │
│                    │
│  1. User fills     │
│     form with 7    │
│     parameters     │
│                    │
│  2. Clicks         │
│     "Predict"      │
└─────────┬──────────┘
          │
          │ HTTP POST Request
          │ {ambient: 25.5, coolant: 22.3, ...}
          │
          ▼
┌─────────────────────┐
│   Flask Backend     │  http://localhost:5000/predict
│   (Python)          │
│                     │
│  3. Validates       │
│     input data      │
│                     │
│  4. Loads scaler    │
│     (transform.save)│
│                     │
│  5. Normalizes      │
│     data (0-1)      │
└──────────┬──────────┘
           │
           │ Normalized Data
           │ [0.5, 0.4, ...]
           ▼
┌──────────────────────┐
│   ML Model           │
│   (model.save)       │
│                      │
│  6. Linear Regression│
│     processes data   │
│                      │
│  7. Predicts temp    │
│     value (0-1)      │
└──────────┬───────────┘
           │
           │ Raw Prediction: 0.6842
           │
           ▼
┌──────────────────────┐
│   Backend Logic      │
│                      │
│  8. Determines       │
│     risk level:      │
│     - low (< 0.3)    │
│     - normal (0.3-0.6)│
│     - warning (0.6-0.8)│
│     - critical (> 0.8)│
│                      │
│  9. Creates JSON     │
│     response         │
└──────────┬───────────┘
           │
           │ HTTP Response
           │ {success: true, prediction: 0.6842,
           │  risk_level: "normal", ...}
           ▼
┌──────────────────────┐
│   React Frontend     │
│                      │
│  10. Receives data   │
│                      │
│  11. Updates state   │
│                      │
│  12. Renders:        │
│      • Gauge (68.4°C)│
│      • Risk badge    │
│      • Details       │
└──────────────────────┘
           │
           ▼
    USER SEES RESULT!
```

---

## 🗂️ File Organization & Purpose

```
motor-temp-prediction/
│
├── 📁 backend/                    ← PYTHON / ML CODE
│   │
│   ├── 🐍 train_model.py          ← RUN THIS FIRST
│   │   Purpose: Train ML model
│   │   Input: Dataset (CSV)
│   │   Output: model.save, transform.save
│   │   When: Once initially, or when retraining
│   │   Command: python train_model.py
│   │
│   ├── 🐍 app.py                  ← RUN THIS ALWAYS
│   │   Purpose: API server
│   │   Input: HTTP requests
│   │   Output: JSON predictions
│   │   When: Always running for app to work
│   │   Command: python app.py
│   │
│   ├── 💾 model.save              ← CREATED BY train_model.py
│   │   Purpose: Trained ML model
│   │   Type: Joblib pickle
│   │   Used by: app.py
│   │
│   ├── 💾 transform.save          ← CREATED BY train_model.py
│   │   Purpose: Data normalizer
│   │   Type: MinMaxScaler
│   │   Used by: app.py
│   │
│   ├── 📊 sample_dataset.csv      ← CREATED BY train_model.py
│   │   Purpose: Training data
│   │   Rows: 10,000
│   │   Columns: 8 (7 features + 1 target)
│   │
│   ├── 🧪 test_app.py             ← OPTIONAL
│   │   Purpose: Unit tests
│   │   Command: pytest test_app.py
│   │
│   ├── 📓 exploration.ipynb       ← OPTIONAL
│   │   Purpose: Data exploration
│   │   Use: Jupyter Notebook
│   │   Command: jupyter notebook
│   │
│   ├── 📋 requirements.txt        ← DEPENDENCY LIST
│   │   Purpose: Python packages
│   │   Command: pip install -r requirements.txt
│   │
│   └── 📁 venv/                   ← CREATED BY YOU
│       Purpose: Virtual environment
│       Command: python -m venv venv
│
├── 📁 frontend/                   ← REACT / UI CODE
│   │
│   ├── 📁 src/
│   │   │
│   │   ├── ⚛️ index.js           ← ENTRY POINT
│   │   │   Purpose: Start React app
│   │   │   Rarely modified
│   │   │
│   │   ├── ⚛️ App.jsx             ← MAIN COMPONENT
│   │   │   Purpose: UI logic
│   │   │   Contains:
│   │   │     • State management
│   │   │     • API calls
│   │   │     • Form handling
│   │   │     • Result display
│   │   │   Modify: Often (for features)
│   │   │
│   │   ├── 🎨 index.css          ← GLOBAL STYLES
│   │   │   Purpose: Theme, colors
│   │   │   Contains:
│   │   │     • CSS variables
│   │   │     • Animations
│   │   │     • Base styles
│   │   │   Modify: For theme changes
│   │   │
│   │   └── 🎨 App.css            ← COMPONENT STYLES
│   │       Purpose: Layout, components
│   │       Modify: For UI changes
│   │
│   ├── 📁 public/
│   │   └── 📄 index.html         ← HTML TEMPLATE
│   │       Purpose: Base HTML
│   │       Contains: Fonts, meta tags
│   │       Modify: Rarely
│   │
│   ├── 📋 package.json            ← DEPENDENCY LIST
│   │   Purpose: Node packages
│   │   Command: npm install
│   │
│   └── 📁 node_modules/           ← CREATED BY npm install
│       Purpose: Installed packages
│       Size: ~500MB
│       Don't modify!
│
├── 📁 Documentation/
│   ├── 📘 README.md               ← Start here
│   ├── 📗 STEP_BY_STEP_GUIDE.md  ← Detailed instructions
│   ├── 📙 SETUP.md                ← Installation guide
│   ├── 📕 API.md                  ← API reference
│   ├── 📓 DEPLOYMENT.md           ← Deploy guide
│   └── 📖 FAQ.md                  ← Common questions
│
└── 🚀 Quick Start Scripts/
    ├── quickstart.sh              ← Mac/Linux
    └── quickstart.bat             ← Windows
```

---

## 🔧 What Happens Where

### Jupyter Notebook (exploration.ipynb)

**Use for:**
```python
# ✅ Data exploration
df.head()
df.describe()
df.info()

# ✅ Visualizations
import matplotlib.pyplot as plt
df.hist()
plt.show()

# ✅ Quick experiments
from sklearn.tree import DecisionTreeRegressor
model = DecisionTreeRegressor()
model.fit(X_train, y_train)
print(model.score(X_test, y_test))

# ✅ Interactive testing
prediction = model.predict([[25, 22, 0.5, 0.4, 1500, 12, 15]])
print(f"Temp: {prediction[0]}")
```

### Python Script (train_model.py)

**Use for:**
```python
# ✅ Production training
def train_models():
    # Load data
    # Preprocess
    # Train
    # Save model
    
# ✅ Automated pipeline
if __name__ == "__main__":
    main()
```

### Flask API (app.py)

**Use for:**
```python
# ✅ Serve predictions
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    prediction = model.predict(data)
    return jsonify(prediction)

# ✅ Handle HTTP requests
# ✅ Load saved model
# ✅ Return JSON responses
```

### React Frontend (App.jsx)

**Use for:**
```javascript
// ✅ UI rendering
return (
  <div>
    <form onSubmit={handleSubmit}>
      {/* Input fields */}
    </form>
    <div>
      {/* Results display */}
    </div>
  </div>
);

// ✅ API calls
const response = await fetch('/predict', {
  method: 'POST',
  body: JSON.stringify(formData)
});

// ✅ State management
const [prediction, setPrediction] = useState(null);
```

---

## 🔄 Typical Development Workflow

### 1️⃣ First Time Setup (Once)

```
1. Install Python, Node.js
2. cd backend
3. python -m venv venv
4. activate venv
5. pip install -r requirements.txt
6. python train_model.py
7. cd ../frontend
8. npm install
```

### 2️⃣ Daily Development (Every Time)

```
Terminal 1:
  cd backend
  activate venv
  python app.py

Terminal 2:
  cd frontend
  npm start

Browser:
  http://localhost:3000
```

### 3️⃣ Make Changes

**Want to change UI?**
```
Edit: frontend/src/App.jsx or App.css
See: Changes auto-reload in browser
```

**Want to change API?**
```
Edit: backend/app.py
Action: Stop and restart python app.py
```

**Want to retrain model?**
```
Action: python train_model.py
Result: New model.save and transform.save
Action: Restart python app.py
```

### 4️⃣ Test Changes

**Test Backend:**
```bash
# Terminal 3
curl http://localhost:5000/health
curl -X POST http://localhost:5000/predict -d '{...}'
```

**Test Frontend:**
```
Browser: http://localhost:3000
Action: Click buttons, test features
```

---

## 🎯 Quick Decision Tree

```
I want to...

├─ See data visually
│  └─→ Use Jupyter Notebook (exploration.ipynb)
│
├─ Train a model
│  └─→ Use train_model.py
│
├─ Serve predictions
│  └─→ Use app.py (Flask)
│
├─ Change how it looks
│  └─→ Edit App.jsx or App.css
│
├─ Add a new feature
│  ├─→ Backend: Edit app.py
│  └─→ Frontend: Edit App.jsx
│
├─ Fix a bug
│  ├─→ Backend: Check app.py, run tests
│  └─→ Frontend: Check browser console, edit App.jsx
│
└─ Deploy to production
   └─→ See DEPLOYMENT.md
```

---

## 📝 Common Tasks Reference

| Task | Location | Command |
|------|----------|---------|
| Train model | backend/ | `python train_model.py` |
| Start backend | backend/ | `python app.py` |
| Start frontend | frontend/ | `npm start` |
| Run tests | backend/ | `pytest test_app.py` |
| Explore data | backend/ | `jupyter notebook` |
| Install dependencies | backend/ | `pip install -r requirements.txt` |
| Install dependencies | frontend/ | `npm install` |
| Build for production | frontend/ | `npm run build` |

---

## 🐛 Debug Flow

```
Problem occurs
    ↓
Check which part:
    │
    ├─ Can't train model
    │  └─→ Check: backend/train_model.py
    │     └─→ Look at: Terminal output, error messages
    │
    ├─ Backend won't start
    │  └─→ Check: backend/app.py, model files exist
    │     └─→ Look at: Terminal errors, file permissions
    │
    ├─ Frontend won't start
    │  └─→ Check: npm install ran, package.json
    │     └─→ Look at: Terminal errors, node_modules
    │
    ├─ Frontend can't reach backend
    │  └─→ Check: Backend running, CORS enabled, correct URL
    │     └─→ Look at: Browser console, Network tab
    │
    └─ Predictions wrong
       └─→ Check: Model training, input data, scaling
          └─→ Look at: Jupyter notebook, test with known values
```

---

**This diagram shows the complete flow!** Follow STEP_BY_STEP_GUIDE.md for detailed instructions.
