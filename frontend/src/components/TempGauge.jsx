import React from 'react';
import { Thermometer, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import './TempGauge.css';

const TempGauge = ({ prediction }) => {
  const temp = prediction.prediction;
  const riskLevel = prediction.risk_level;
  
  // Convert normalized value to percentage
  const percentage = Math.min(Math.max(temp * 100, 0), 100);
  
  // Determine color based on risk level
  const getRiskColor = () => {
    switch(riskLevel) {
      case 'low': return 'var(--risk-low)';
      case 'normal': return 'var(--risk-normal)';
      case 'warning': return 'var(--risk-warning)';
      case 'critical': return 'var(--risk-critical)';
      default: return 'var(--accent-cyan)';
    }
  };

  const getRiskIcon = () => {
    switch(riskLevel) {
      case 'low': return <CheckCircle size={24} />;
      case 'normal': return <Thermometer size={24} />;
      case 'warning': return <AlertTriangle size={24} />;
      case 'critical': return <XCircle size={24} />;
      default: return <Thermometer size={24} />;
    }
  };

  const getRiskMessage = () => {
    switch(riskLevel) {
      case 'low': return 'Operating within safe temperature range';
      case 'normal': return 'Normal operating temperature';
      case 'warning': return 'Temperature approaching warning threshold';
      case 'critical': return 'CRITICAL: Immediate attention required!';
      default: return 'Temperature analysis complete';
    }
  };

  return (
    <div className="temp-gauge">
      {/* Main Temperature Display */}
      <div className="gauge-main">
        <div className="gauge-circle" style={{ '--risk-color': getRiskColor() }}>
          <svg className="gauge-svg" viewBox="0 0 200 200">
            {/* Background Circle */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="var(--bg-tertiary)"
              strokeWidth="20"
            />
            
            {/* Progress Circle */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke={getRiskColor()}
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 5.34} 534`}
              transform="rotate(-90 100 100)"
              className="gauge-progress"
              style={{ filter: `drop-shadow(0 0 10px ${getRiskColor()})` }}
            />
          </svg>
          
          <div className="gauge-content">
            <div className="gauge-icon" style={{ color: getRiskColor() }}>
              {getRiskIcon()}
            </div>
            <div className="gauge-value" style={{ color: getRiskColor() }}>
              {(temp * 100).toFixed(1)}
            </div>
            <div className="gauge-unit">°C</div>
          </div>
        </div>
      </div>

      {/* Risk Level Badge */}
      <div className={`risk-status risk-status-${riskLevel}`}>
        <div className="risk-indicator" style={{ background: getRiskColor() }}></div>
        <div className="risk-text">
          <div className="risk-label">{riskLevel.toUpperCase()}</div>
          <div className="risk-message">{getRiskMessage()}</div>
        </div>
      </div>

      {/* Temperature Scale */}
      <div className="temp-scale">
        <div className="scale-bar">
          <div className="scale-gradient"></div>
          <div 
            className="scale-marker" 
            style={{ 
              left: `${percentage}%`,
              background: getRiskColor()
            }}
          >
            <div className="marker-pulse" style={{ background: getRiskColor() }}></div>
          </div>
        </div>
        <div className="scale-labels">
          <span>0°C</span>
          <span>25°C</span>
          <span>50°C</span>
          <span>75°C</span>
          <span>100°C</span>
        </div>
      </div>
    </div>
  );
};

export default TempGauge;
