"""
Unit tests for the Flask backend API
Run with: pytest test_app.py
"""

import pytest
import json
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app

@pytest.fixture
def client():
    """Create a test client"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    """Test the health check endpoint"""
    response = client.get('/health')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['status'] == 'healthy'
    assert 'model_loaded' in data
    assert 'timestamp' in data

def test_predict_valid_input(client):
    """Test prediction with valid input"""
    payload = {
        'ambient': 25.5,
        'coolant': 22.3,
        'u_d': 0.45,
        'u_q': 0.38,
        'motor_speed': 1500,
        'i_d': 12.5,
        'i_q': 15.2
    }
    
    response = client.post(
        '/predict',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['success'] is True
    assert 'prediction' in data
    assert 'risk_level' in data
    assert 'timestamp' in data
    assert isinstance(data['prediction'], float)
    assert data['risk_level'] in ['low', 'normal', 'warning', 'critical']

def test_predict_missing_fields(client):
    """Test prediction with missing fields"""
    payload = {
        'ambient': 25.5,
        'coolant': 22.3
        # Missing other required fields
    }
    
    response = client.post(
        '/predict',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    assert response.status_code == 400
    
    data = json.loads(response.data)
    assert data['success'] is False
    assert 'error' in data
    assert 'missing_fields' in data

def test_predict_invalid_values(client):
    """Test prediction with invalid values"""
    payload = {
        'ambient': 'invalid',
        'coolant': 22.3,
        'u_d': 0.45,
        'u_q': 0.38,
        'motor_speed': 1500,
        'i_d': 12.5,
        'i_q': 15.2
    }
    
    response = client.post(
        '/predict',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    assert response.status_code == 400

def test_batch_predict_valid_input(client):
    """Test batch prediction with valid input"""
    payload = {
        'samples': [
            {
                'ambient': 25.5,
                'coolant': 22.3,
                'u_d': 0.45,
                'u_q': 0.38,
                'motor_speed': 1500,
                'i_d': 12.5,
                'i_q': 15.2
            },
            {
                'ambient': 28.0,
                'coolant': 24.5,
                'u_d': 0.52,
                'u_q': 0.41,
                'motor_speed': 1800,
                'i_d': 14.2,
                'i_q': 17.8
            }
        ]
    }
    
    response = client.post(
        '/batch-predict',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['success'] is True
    assert data['total_samples'] == 2
    assert len(data['predictions']) == 2

def test_batch_predict_empty_samples(client):
    """Test batch prediction with empty samples"""
    payload = {
        'samples': []
    }
    
    response = client.post(
        '/batch-predict',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    assert response.status_code == 400

def test_model_info(client):
    """Test model info endpoint"""
    response = client.get('/model-info')
    
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['success'] is True
    assert 'model_type' in data
    assert 'features' in data
    assert 'target' in data
    assert 'performance' in data
    assert len(data['features']) == 7

def test_risk_level_determination():
    """Test risk level categorization"""
    from app import determine_risk_level
    
    assert determine_risk_level(0.2) == 'low'
    assert determine_risk_level(0.5) == 'normal'
    assert determine_risk_level(0.7) == 'warning'
    assert determine_risk_level(0.9) == 'critical'

def test_cors_headers(client):
    """Test CORS headers are present"""
    response = client.get('/health')
    assert 'Access-Control-Allow-Origin' in response.headers

def test_prediction_range(client):
    """Test that predictions are within expected range"""
    payload = {
        'ambient': 25.5,
        'coolant': 22.3,
        'u_d': 0.45,
        'u_q': 0.38,
        'motor_speed': 1500,
        'i_d': 12.5,
        'i_q': 15.2
    }
    
    response = client.post(
        '/predict',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    data = json.loads(response.data)
    prediction = data['prediction']
    
    # Prediction should be between 0 and 1 (normalized)
    assert 0 <= prediction <= 1

def test_prediction_consistency(client):
    """Test that same input produces same prediction"""
    payload = {
        'ambient': 25.5,
        'coolant': 22.3,
        'u_d': 0.45,
        'u_q': 0.38,
        'motor_speed': 1500,
        'i_d': 12.5,
        'i_q': 15.2
    }
    
    # Make two predictions with same input
    response1 = client.post(
        '/predict',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    response2 = client.post(
        '/predict',
        data=json.dumps(payload),
        content_type='application/json'
    )
    
    data1 = json.loads(response1.data)
    data2 = json.loads(response2.data)
    
    # Predictions should be identical
    assert abs(data1['prediction'] - data2['prediction']) < 1e-6

if __name__ == '__main__':
    pytest.main([__file__, '-v'])
