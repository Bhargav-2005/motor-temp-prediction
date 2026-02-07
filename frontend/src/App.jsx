import React, { useState } from 'react';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ambient: '',
    coolant: '',
    u_d: '',
    u_q: '',
    motor_speed: '',
    i_d: '',
    i_q: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loadSampleData = () => {
    setFormData({
      ambient: '25.5',
      coolant: '22.3',
      u_d: '0.45',
      u_q: '0.38',
      motor_speed: '1500',
      i_d: '12.5',
      i_q: '15.2'
    });
  };

  const handleReset = () => {
    setFormData({
      ambient: '',
      coolant: '',
      u_d: '',
      u_q: '',
      motor_speed: '',
      i_d: '',
      i_q: ''
    });
    setPrediction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    const hasEmptyFields = Object.values(formData).some(value => value === '');
    if (hasEmptyFields) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const numericData = Object.keys(formData).reduce((acc, key) => {
        acc[key] = parseFloat(formData[key]);
        return acc;
      }, {});

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(numericData),
      });

      const data = await response.json();
      
      if (data.success) {
        setPrediction(data);
      } else {
        alert('Prediction failed: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to the server. Please ensure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel) => {
    switch(riskLevel) {
      case 'low': return '#00ff88';
      case 'normal': return '#00d9ff';
      case 'warning': return '#ffa500';
      case 'critical': return '#ff3366';
      default: return '#00d9ff';
    }
  };

  const inputFields = [
    { name: 'ambient', label: 'Ambient Temperature', unit: '°C' },
    { name: 'coolant', label: 'Coolant Temperature', unit: '°C' },
    { name: 'u_d', label: 'Voltage d-component', unit: 'V' },
    { name: 'u_q', label: 'Voltage q-component', unit: 'V' },
    { name: 'motor_speed', label: 'Motor Speed', unit: 'RPM' },
    { name: 'i_d', label: 'Current d-component', unit: 'A' },
    { name: 'i_q', label: 'Current q-component', unit: 'A' }
  ];

  return (
    <div className="app">
      <div className="background-grid"></div>
      
      {/* Header */}
      <header className="app-header fade-in">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">⚡</div>
            <div>
              <h1>MOTOR TEMP PREDICTOR</h1>
              <p className="subtitle">AI-Powered Predictive Maintenance System</p>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">⚡</span>
              <div>
                <div className="stat-value">96%</div>
                <div className="stat-label">R² Accuracy</div>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📊</span>
              <div>
                <div className="stat-value">0.03</div>
                <div className="stat-label">RMSE Error</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">
          <div className="grid-layout">
            {/* Left Column - Input Form */}
            <div className="form-section">
              <div className="section-header">
                <h2>Input Parameters</h2>
                <div className="header-line"></div>
              </div>
              
              <form onSubmit={handleSubmit} className="prediction-form">
                <div className="form-grid">
                  {inputFields.map((field) => (
                    <div key={field.name} className="form-group">
                      <label htmlFor={field.name} className="form-label">
                        {field.label}
                        <span className="unit-badge">{field.unit}</span>
                      </label>
                      <div className="input-wrapper">
                        <input
                          type="number"
                          id={field.name}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          step="0.1"
                          className="form-input"
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          disabled={loading}
                        />
                        <div className="input-border-effect"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={loadSampleData}
                    className="btn btn-secondary"
                    disabled={loading}
                  >
                    Load Sample
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-secondary"
                    disabled={loading}
                  >
                    🔄 Reset
                  </button>
                  
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="btn-spinner"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        📤 Predict Temperature
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column - Results */}
            <div className="results-section">
              <div className="section-header">
                <h2>Prediction Results</h2>
                <div className="header-line"></div>
              </div>
              
              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Analyzing motor parameters...</p>
                </div>
              ) : prediction ? (
                <div className="results-content">
                  {/* Temperature Gauge */}
                  <div className="temp-gauge">
                    <div className="gauge-main">
                      <div className="gauge-circle" style={{ '--risk-color': getRiskColor(prediction.risk_level) }}>
                        <svg className="gauge-svg" viewBox="0 0 200 200">
                          <circle
                            cx="100"
                            cy="100"
                            r="85"
                            fill="none"
                            stroke="var(--bg-tertiary)"
                            strokeWidth="20"
                          />
                          <circle
                            cx="100"
                            cy="100"
                            r="85"
                            fill="none"
                            stroke={getRiskColor(prediction.risk_level)}
                            strokeWidth="20"
                            strokeLinecap="round"
                            strokeDasharray={`${prediction.prediction * 100 * 5.34} 534`}
                            transform="rotate(-90 100 100)"
                            className="gauge-progress"
                            style={{ filter: `drop-shadow(0 0 10px ${getRiskColor(prediction.risk_level)})` }}
                          />
                        </svg>
                        
                        <div className="gauge-content">
                          <div className="gauge-icon" style={{ color: getRiskColor(prediction.risk_level) }}>
                            🌡️
                          </div>
                          <div className="gauge-value" style={{ color: getRiskColor(prediction.risk_level) }}>
                            {(prediction.prediction * 100).toFixed(1)}
                          </div>
                          <div className="gauge-unit">°C</div>
                        </div>
                      </div>
                    </div>

                    {/* Risk Status */}
                    <div className={`risk-status risk-status-${prediction.risk_level}`}>
                      <div className="risk-indicator" style={{ background: getRiskColor(prediction.risk_level) }}></div>
                      <div className="risk-text">
                        <div className="risk-label">{prediction.risk_level.toUpperCase()}</div>
                        <div className="risk-message">
                          {prediction.risk_level === 'critical' && 'CRITICAL: Immediate attention required!'}
                          {prediction.risk_level === 'warning' && 'Temperature approaching warning threshold'}
                          {prediction.risk_level === 'normal' && 'Normal operating temperature'}
                          {prediction.risk_level === 'low' && 'Operating within safe temperature range'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="result-display">
                    <div className="metadata-grid">
                      <div className="metadata-card">
                        <span>🕐</span>
                        <div>
                          <div className="metadata-label">Timestamp</div>
                          <div className="metadata-value">
                            {new Date(prediction.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="metadata-card">
                        <span>📈</span>
                        <div>
                          <div className="metadata-label">Confidence</div>
                          <div className="metadata-value">96% R²</div>
                        </div>
                      </div>
                    </div>

                    <div className="technical-details">
                      <h4>Technical Information</h4>
                      <div className="details-grid">
                        <div className="detail-item">
                          <span className="detail-label">Prediction Value:</span>
                          <span className="detail-value">{prediction.prediction.toFixed(4)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Risk Level:</span>
                          <span className="detail-value">{prediction.risk_level}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📊</div>
                  <h3>No predictions yet</h3>
                  <p>Enter motor parameters and click "Predict Temperature" to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Powered by Linear Regression ML Model (96% Accuracy) | Built with React & Flask</p>
      </footer>
    </div>
  );
}

export default App;
