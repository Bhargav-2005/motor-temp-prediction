# Electric Motor Temperature Prediction

A modern full-stack machine learning application for predicting electric motor rotor temperatures using operational sensor data. Built with React frontend and Flask backend.

![Project Architecture](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-Flask-000000?logo=flask&logoColor=white)
![ML](https://img.shields.io/badge/ML-Scikit--Learn-F7931E?logo=scikit-learn&logoColor=white)

## 🎯 Project Overview

This predictive maintenance solution forecasts electric motor temperatures to prevent failures, optimize energy consumption, and enhance equipment reliability. The system achieves 96% R² accuracy using a Decision Tree Regressor model.

### Key Features

- **Real-time Predictions**: Input operational parameters and get instant temperature forecasts
- **Modern UI**: Responsive React interface with beautiful visualizations
- **High Accuracy**: 96% R² score with RMSE of 0.03
- **RESTful API**: Flask backend with JSON endpoints
- **Production Ready**: Deployable to cloud platforms

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React UI      │ ──HTTP─→│   Flask API     │ ──────→│  ML Model       │
│   (Frontend)    │ ←─JSON──│   (Backend)     │ ←──────│  (Decision Tree)│
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

### Tech Stack

**Frontend:**
- React 18
- Recharts (data visualization)
- Tailwind CSS
- Lucide Icons

**Backend:**
- Flask
- Flask-CORS
- Scikit-learn
- Pandas, NumPy

**ML Pipeline:**
- Decision Tree Regressor
- MinMax Scaler
- Joblib for model serialization

## 📊 Input Features

The model uses the following operational parameters:

| Feature | Description | Unit |
|---------|-------------|------|
| Ambient Temperature | Environmental temperature | Normalized |
| Coolant Temperature | Cooling system temperature | Normalized |
| Voltage d-component | Direct axis voltage | Normalized |
| Voltage q-component | Quadrature axis voltage | Normalized |
| Motor Speed | Rotational speed | Normalized |
| Current d-component | Direct axis current | Normalized |
| Current q-component | Quadrature axis current | Normalized |

**Output:** Permanent Magnet Surface Temperature (Rotor Temperature)

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd motor-temp-prediction
```

2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

### Running the Application

1. **Start the Backend Server**
```bash
cd backend
python app.py
```
Backend runs on `http://localhost:5000`

2. **Start the Frontend Development Server**
```bash
cd frontend
npm start
```
Frontend runs on `http://localhost:3000`

3. **Access the Application**
Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
motor-temp-prediction/
├── README.md
├── backend/
│   ├── app.py                    # Flask application
│   ├── requirements.txt          # Python dependencies
│   ├── model.save               # Trained ML model
│   ├── transform.save           # MinMax scaler
│   └── train_model.ipynb        # Model training notebook
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.jsx              # Main React component
│       ├── components/
│       │   ├── PredictionForm.jsx
│       │   ├── ResultDisplay.jsx
│       │   └── TempGauge.jsx
│       └── index.js
└── data/
    └── dataset.csv              # Training dataset
```

## 🔬 Model Performance

- **Algorithm**: Decision Tree Regressor
- **R² Score**: 0.96 (96% variance explained)
- **RMSE**: 0.03
- **Training Data**: Electric Motor Temperature Dataset from Kaggle

### Model Comparison

| Algorithm | R² Score | RMSE |
|-----------|----------|------|
| Linear Regression | 0.82 | 0.15 |
| Decision Tree | **0.96** | **0.03** |
| Random Forest | 0.94 | 0.05 |
| SVR | 0.88 | 0.09 |

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Validation**: Input validation with helpful error messages
- **Visual Feedback**: Temperature gauge with color-coded risk levels
- **Historical Predictions**: Track prediction history
- **Dark/Light Mode**: Theme toggle support

## 🔧 API Endpoints

### POST `/predict`
Predict motor temperature based on input parameters.

**Request Body:**
```json
{
  "ambient": 25.5,
  "coolant": 22.3,
  "u_d": 0.45,
  "u_q": 0.38,
  "motor_speed": 1500,
  "i_d": 12.5,
  "i_q": 15.2
}
```

**Response:**
```json
{
  "success": true,
  "prediction": 68.4,
  "risk_level": "normal",
  "timestamp": "2026-01-30T10:30:00Z"
}
```

### GET `/health`
Check API health status.

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

## 🌍 Real-World Applications

### Manufacturing
- Predictive maintenance for CNC machines
- Assembly line motor monitoring
- Conveyor system optimization

### Automotive
- Electric vehicle motor health monitoring
- Production equipment reliability
- Quality control automation

### HVAC Systems
- Building climate control efficiency
- Energy consumption optimization
- Equipment lifespan extension

### Renewable Energy
- Wind turbine generator monitoring
- Solar tracking system motors
- Hydroelectric plant equipment

## 📈 Data Preprocessing Pipeline

1. **Feature Selection**: Remove unreliable features (torque, stator components)
2. **Outlier Detection**: IQR method with capping technique
3. **Normalization**: MinMax scaling for all features
4. **Train-Test Split**: 80-20 split for validation

## 🧪 Model Training

The Jupyter notebook `train_model.ipynb` contains:
- Exploratory Data Analysis (EDA)
- Feature engineering
- Model comparison
- Hyperparameter tuning
- Performance evaluation

To retrain the model:
```bash
jupyter notebook backend/train_model.ipynb
```

## 🚢 Deployment

### Docker Deployment

```bash
docker-compose up --build
```

### Cloud Deployment

**Backend (Heroku/AWS/GCP):**
- Deploy Flask app as a web service
- Set environment variables
- Configure CORS for frontend domain

**Frontend (Vercel/Netlify):**
- Build React app: `npm run build`
- Deploy build folder
- Update API endpoint in environment variables

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Dataset: [Kaggle Electric Motor Temperature Dataset](https://www.kaggle.com/datasets/wkirgsn/electric-motor-temperature)
- Machine Learning: Scikit-learn team
- Frontend Libraries: React, Recharts, Tailwind CSS

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@example.com
- Documentation: [Project Wiki](wiki-link)

---

**Built with ❤️ for predictive maintenance and industrial IoT applications**
"# motor-temp-prediction" 
