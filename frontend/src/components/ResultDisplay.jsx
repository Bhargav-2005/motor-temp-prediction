import React from 'react';
import { Clock, TrendingUp, Database, Activity } from 'lucide-react';
import './ResultDisplay.css';

const ResultDisplay = ({ prediction }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getRecommendation = (riskLevel) => {
    switch(riskLevel) {
      case 'low':
        return {
          title: 'Optimal Operation',
          actions: [
            'Continue normal operation',
            'Monitor temperature trends',
            'Maintain current load levels'
          ]
        };
      case 'normal':
        return {
          title: 'Normal Operation',
          actions: [
            'Continue monitoring',
            'Schedule routine maintenance',
            'Check cooling system efficiency'
          ]
        };
      case 'warning':
        return {
          title: 'Increased Monitoring',
          actions: [
            'Increase monitoring frequency',
            'Reduce motor load if possible',
            'Inspect cooling system',
            'Prepare for potential maintenance'
          ]
        };
      case 'critical':
        return {
          title: 'IMMEDIATE ACTION REQUIRED',
          actions: [
            'STOP MOTOR IMMEDIATELY if safe to do so',
            'Inspect for mechanical issues',
            'Check coolant levels and circulation',
            'Contact maintenance team urgently',
            'Do not restart until inspected'
          ]
        };
      default:
        return {
          title: 'Monitor',
          actions: ['Continue normal operation']
        };
    }
  };

  const recommendation = getRecommendation(prediction.risk_level);

  return (
    <div className="result-display">
      {/* Prediction Metadata */}
      <div className="metadata-grid">
        <div className="metadata-card">
          <Clock size={20} />
          <div>
            <div className="metadata-label">Timestamp</div>
            <div className="metadata-value">{formatTimestamp(prediction.timestamp)}</div>
          </div>
        </div>
        
        <div className="metadata-card">
          <TrendingUp size={20} />
          <div>
            <div className="metadata-label">Confidence</div>
            <div className="metadata-value">96% R²</div>
          </div>
        </div>
        
        <div className="metadata-card">
          <Database size={20} />
          <div>
            <div className="metadata-label">Model</div>
            <div className="metadata-value">Decision Tree</div>
          </div>
        </div>
      </div>

      {/* Input Features Summary */}
      <div className="features-section">
        <h3 className="section-title">
          <Activity size={18} />
          Input Parameters
        </h3>
        <div className="features-grid">
          {Object.entries(prediction.input_features).map(([key, value]) => (
            <div key={key} className="feature-item">
              <span className="feature-label">{key.replace(/_/g, ' ')}</span>
              <span className="feature-value">{value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations-section">
        <h3 className="section-title recommendation-title">
          {recommendation.title}
        </h3>
        <ul className="recommendations-list">
          {recommendation.actions.map((action, index) => (
            <li key={index} className="recommendation-item">
              <div className="recommendation-bullet"></div>
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technical Details */}
      <div className="technical-details">
        <h4>Technical Information</h4>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Raw Prediction Value:</span>
            <span className="detail-value">{prediction.prediction.toFixed(6)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Normalized Scale:</span>
            <span className="detail-value">0.0 - 1.0</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Algorithm:</span>
            <span className="detail-value">DecisionTreeRegressor</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">RMSE:</span>
            <span className="detail-value">0.03</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
