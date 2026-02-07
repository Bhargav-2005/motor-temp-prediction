# API Documentation

## Base URL

```
http://localhost:5000
```

## Endpoints

### 1. Health Check

Check if the API and model are loaded and ready.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true,
  "timestamp": "2026-01-30T10:30:00.000000"
}
```

**Example:**
```bash
curl http://localhost:5000/health
```

---

### 2. Single Prediction

Predict motor temperature based on input parameters.

**Endpoint:** `POST /predict`

**Request Headers:**
```
Content-Type: application/json
```

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

**Parameters:**

| Parameter | Type | Range | Description |
|-----------|------|-------|-------------|
| ambient | float | 0-50 | Ambient temperature (°C) |
| coolant | float | 0-50 | Coolant temperature (°C) |
| u_d | float | -100-100 | Voltage d-component (V) |
| u_q | float | -100-100 | Voltage q-component (V) |
| motor_speed | float | 0-5000 | Motor speed (RPM) |
| i_d | float | -100-100 | Current d-component (A) |
| i_q | float | -100-100 | Current q-component (A) |

**Success Response (200):**
```json
{
  "success": true,
  "prediction": 0.6842,
  "risk_level": "normal",
  "timestamp": "2026-01-30T10:30:00.000000",
  "input_features": {
    "ambient": 25.5,
    "coolant": 22.3,
    "u_d": 0.45,
    "u_q": 0.38,
    "motor_speed": 1500,
    "i_d": 12.5,
    "i_q": 15.2
  }
}
```

**Risk Levels:**
- `low` - Temperature below 30% threshold
- `normal` - Temperature between 30-60%
- `warning` - Temperature between 60-80%
- `critical` - Temperature above 80%

**Error Response (400):**
```json
{
  "success": false,
  "error": "Missing required fields",
  "missing_fields": ["ambient", "coolant"]
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Model not loaded",
  "message": "ML model is not available. Please check server logs."
}
```

**Example:**
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

**JavaScript Example:**
```javascript
const predictTemperature = async (data) => {
  const response = await fetch('http://localhost:5000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  return result;
};

// Usage
const inputData = {
  ambient: 25.5,
  coolant: 22.3,
  u_d: 0.45,
  u_q: 0.38,
  motor_speed: 1500,
  i_d: 12.5,
  i_q: 15.2
};

predictTemperature(inputData)
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

**Python Example:**
```python
import requests

url = "http://localhost:5000/predict"
data = {
    "ambient": 25.5,
    "coolant": 22.3,
    "u_d": 0.45,
    "u_q": 0.38,
    "motor_speed": 1500,
    "i_d": 12.5,
    "i_q": 15.2
}

response = requests.post(url, json=data)
result = response.json()
print(result)
```

---

### 3. Batch Prediction

Predict temperature for multiple samples at once.

**Endpoint:** `POST /batch-predict`

**Request Body:**
```json
{
  "samples": [
    {
      "ambient": 25.5,
      "coolant": 22.3,
      "u_d": 0.45,
      "u_q": 0.38,
      "motor_speed": 1500,
      "i_d": 12.5,
      "i_q": 15.2
    },
    {
      "ambient": 28.0,
      "coolant": 24.5,
      "u_d": 0.52,
      "u_q": 0.41,
      "motor_speed": 1800,
      "i_d": 14.2,
      "i_q": 17.8
    }
  ]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "total_samples": 2,
  "predictions": [
    {
      "success": true,
      "sample_index": 0,
      "prediction": 0.6842,
      "risk_level": "normal"
    },
    {
      "success": true,
      "sample_index": 1,
      "prediction": 0.7521,
      "risk_level": "warning"
    }
  ],
  "timestamp": "2026-01-30T10:30:00.000000"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/batch-predict \
  -H "Content-Type: application/json" \
  -d '{
    "samples": [
      {
        "ambient": 25.5,
        "coolant": 22.3,
        "u_d": 0.45,
        "u_q": 0.38,
        "motor_speed": 1500,
        "i_d": 12.5,
        "i_q": 15.2
      }
    ]
  }'
```

---

### 4. Model Information

Get information about the loaded ML model.

**Endpoint:** `GET /model-info`

**Response:**
```json
{
  "success": true,
  "model_type": "DecisionTreeRegressor",
  "features": [
    "ambient",
    "coolant",
    "u_d",
    "u_q",
    "motor_speed",
    "i_d",
    "i_q"
  ],
  "target": "permanent_magnet_temperature",
  "performance": {
    "r2_score": 0.96,
    "rmse": 0.03
  }
}
```

**Example:**
```bash
curl http://localhost:5000/model-info
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input or missing fields |
| 500 | Internal Server Error - Model not loaded or prediction failed |

---

## Rate Limiting

Currently, there are no rate limits imposed. For production deployment, consider implementing rate limiting to prevent abuse.

---

## CORS

CORS is enabled for all origins in development mode. For production, configure allowed origins in the Flask app.

---

## Notes

- All temperature values in responses are normalized (0.0 to 1.0 scale)
- To convert to Celsius: multiply by 100
- The model expects normalized input values
- Input validation is performed server-side
- All timestamps are in ISO 8601 format

---

## Testing with Postman

1. Import the endpoints into Postman
2. Set the base URL to `http://localhost:5000`
3. Use the examples above to test each endpoint

## Testing with curl

All examples provided use curl for easy command-line testing.
