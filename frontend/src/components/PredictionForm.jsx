import React, { useState } from 'react';
import { Send, RotateCcw } from 'lucide-react';
import './PredictionForm.css';

const PredictionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    ambient: '',
    coolant: '',
    u_d: '',
    u_q: '',
    motor_speed: '',
    i_d: '',
    i_q: ''
  });

  const inputFields = [
    { name: 'ambient', label: 'Ambient Temperature', min: 0, max: 50, step: 0.1, unit: '°C' },
    { name: 'coolant', label: 'Coolant Temperature', min: 0, max: 50, step: 0.1, unit: '°C' },
    { name: 'u_d', label: 'Voltage d-component', min: -100, max: 100, step: 0.1, unit: 'V' },
    { name: 'u_q', label: 'Voltage q-component', min: -100, max: 100, step: 0.1, unit: 'V' },
    { name: 'motor_speed', label: 'Motor Speed', min: 0, max: 5000, step: 1, unit: 'RPM' },
    { name: 'i_d', label: 'Current d-component', min: -100, max: 100, step: 0.1, unit: 'A' },
    { name: 'i_q', label: 'Current q-component', min: -100, max: 100, step: 0.1, unit: 'A' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const hasEmptyFields = Object.values(formData).some(value => value === '');
    if (hasEmptyFields) {
      alert('Please fill in all fields');
      return;
    }

    // Convert to numbers and submit
    const numericData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = parseFloat(formData[key]);
      return acc;
    }, {});

    onSubmit(numericData);
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

  return (
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
                onChange={handleChange}
                min={field.min}
                max={field.max}
                step={field.step}
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
          <RotateCcw size={18} />
          Reset
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
              <Send size={18} />
              Predict Temperature
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PredictionForm;
