"""
Flask Backend for Electric Motor Temperature Prediction
Provides RESTful API endpoints for ML model predictions
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load the trained model and scaler
MODEL_PATH = 'model.save'
SCALER_PATH = 'transform.save'

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print("✓ Model and scaler loaded successfully")
except Exception as e:
    print(f"✗ Error loading model: {e}")
    model = None
    scaler = None


def determine_risk_level(temperature):
    """
    Determine risk level based on predicted temperature
    Args:
        temperature: Predicted temperature value (normalized)
    Returns:
        str: Risk level (low, normal, warning, critical)
    """
    if temperature < 0.3:
        return "low"
    elif temperature < 0.6:
        return "normal"
    elif temperature < 0.8:
        return "warning"
    else:
        return "critical"


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'scaler_loaded': scaler is not None,
        'timestamp': datetime.now().isoformat()
    }), 200


@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict motor temperature based on input features
    Expected JSON payload:
    {
        "ambient": float,
        "coolant": float,
        "u_d": float,
        "u_q": float,
        "motor_speed": float,
        "i_d": float,
        "i_q": float
    }
    """
    if not model or not scaler:
        return jsonify({
            'success': False,
            'error': 'Model not loaded',
            'message': 'ML model is not available. Please check server logs.'
        }), 500

    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['ambient', 'coolant', 'u_d', 'u_q', 'motor_speed', 'i_d', 'i_q']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            return jsonify({
                'success': False,
                'error': 'Missing required fields',
                'missing_fields': missing_fields
            }), 400

        # Extract features in the correct order
        features = [
            float(data['ambient']),
            float(data['coolant']),
            float(data['u_d']),
            float(data['u_q']),
            float(data['motor_speed']),
            float(data['i_d']),
            float(data['i_q'])
        ]
        
        # Reshape for model input
        features_array = np.array([features])
        
        # Transform features using the saved scaler
        features_scaled = scaler.transform(features_array)
        
        # Make prediction
        prediction = model.predict(features_scaled)
        predicted_temp = float(prediction[0])
        
        # Determine risk level
        risk_level = determine_risk_level(predicted_temp)
        
        # Prepare response
        response = {
            'success': True,
            'prediction': round(predicted_temp, 4),
            'risk_level': risk_level,
            'timestamp': datetime.now().isoformat(),
            'input_features': {
                'ambient': features[0],
                'coolant': features[1],
                'u_d': features[2],
                'u_q': features[3],
                'motor_speed': features[4],
                'i_d': features[5],
                'i_q': features[6]
            }
        }
        
        return jsonify(response), 200
        
    except ValueError as e:
        return jsonify({
            'success': False,
            'error': 'Invalid input values',
            'message': str(e)
        }), 400
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Prediction failed',
            'message': str(e)
        }), 500


@app.route('/batch-predict', methods=['POST'])
def batch_predict():
    """
    Batch prediction endpoint for multiple samples
    Expected JSON payload:
    {
        "samples": [
            {
                "ambient": float,
                "coolant": float,
                ...
            },
            ...
        ]
    }
    """
    if not model or not scaler:
        return jsonify({
            'success': False,
            'error': 'Model not loaded'
        }), 500

    try:
        data = request.get_json()
        samples = data.get('samples', [])
        
        if not samples:
            return jsonify({
                'success': False,
                'error': 'No samples provided'
            }), 400
        
        predictions = []
        required_fields = ['ambient', 'coolant', 'u_d', 'u_q', 'motor_speed', 'i_d', 'i_q']
        
        for idx, sample in enumerate(samples):
            # Validate fields
            missing_fields = [field for field in required_fields if field not in sample]
            if missing_fields:
                predictions.append({
                    'success': False,
                    'sample_index': idx,
                    'error': f'Missing fields: {missing_fields}'
                })
                continue
            
            # Extract and predict
            features = [
                float(sample['ambient']),
                float(sample['coolant']),
                float(sample['u_d']),
                float(sample['u_q']),
                float(sample['motor_speed']),
                float(sample['i_d']),
                float(sample['i_q'])
            ]
            
            features_scaled = scaler.transform([features])
            prediction = model.predict(features_scaled)
            predicted_temp = float(prediction[0])
            
            predictions.append({
                'success': True,
                'sample_index': idx,
                'prediction': round(predicted_temp, 4),
                'risk_level': determine_risk_level(predicted_temp)
            })
        
        return jsonify({
            'success': True,
            'total_samples': len(samples),
            'predictions': predictions,
            'timestamp': datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Batch prediction failed',
            'message': str(e)
        }), 500


@app.route('/model-info', methods=['GET'])
def model_info():
    """Get information about the loaded model"""
    if not model:
        return jsonify({
            'success': False,
            'error': 'Model not loaded'
        }), 500
    
    return jsonify({
        'success': True,
        'model_type': str(type(model).__name__),
        'features': [
            'ambient',
            'coolant',
            'u_d',
            'u_q',
            'motor_speed',
            'i_d',
            'i_q'
        ],
        'target': 'permanent_magnet_temperature',
        'performance': {
            'r2_score': 0.96,
            'rmse': 0.03
        }
    }), 200


if __name__ == '__main__':
    # Run the Flask app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
