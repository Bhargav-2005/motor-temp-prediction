# Deployment Guide

Complete guide for deploying the Electric Motor Temperature Prediction application to production.

## Table of Contents

1. [Docker Deployment](#docker-deployment)
2. [Cloud Deployment](#cloud-deployment)
3. [Environment Configuration](#environment-configuration)
4. [Production Checklist](#production-checklist)
5. [Monitoring & Maintenance](#monitoring--maintenance)

## Docker Deployment

### Local Docker Setup

1. **Build and run with Docker Compose:**

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Docker Hub Deployment

1. **Tag and push images:**

```bash
# Backend
docker build -t yourusername/motor-temp-backend:latest ./backend
docker push yourusername/motor-temp-backend:latest

# Frontend
docker build -t yourusername/motor-temp-frontend:latest ./frontend
docker push yourusername/motor-temp-frontend:latest
```

2. **Pull and run on production server:**

```bash
docker pull yourusername/motor-temp-backend:latest
docker pull yourusername/motor-temp-frontend:latest
docker-compose up -d
```

## Cloud Deployment

### Option 1: Heroku

#### Backend Deployment

1. **Install Heroku CLI:**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login and create app:**
```bash
heroku login
heroku create motor-temp-backend
```

3. **Add Procfile to backend directory:**
```
web: gunicorn app:app
```

4. **Update requirements.txt:**
```bash
echo "gunicorn==20.1.0" >> backend/requirements.txt
```

5. **Deploy:**
```bash
cd backend
git init
heroku git:remote -a motor-temp-backend
git add .
git commit -m "Initial commit"
git push heroku main
```

6. **Set environment variables:**
```bash
heroku config:set FLASK_ENV=production
```

#### Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
cd frontend
vercel
```

3. **Update API URL in production:**

Create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://motor-temp-backend.herokuapp.com
```

4. **Redeploy:**
```bash
vercel --prod
```

### Option 2: AWS

#### Backend on AWS Elastic Beanstalk

1. **Install EB CLI:**
```bash
pip install awsebcli
```

2. **Initialize:**
```bash
cd backend
eb init -p python-3.9 motor-temp-backend
```

3. **Create environment:**
```bash
eb create motor-temp-env
```

4. **Deploy:**
```bash
eb deploy
```

5. **Open application:**
```bash
eb open
```

#### Frontend on AWS S3 + CloudFront

1. **Build frontend:**
```bash
cd frontend
npm run build
```

2. **Create S3 bucket:**
```bash
aws s3 mb s3://motor-temp-frontend
```

3. **Upload build:**
```bash
aws s3 sync build/ s3://motor-temp-frontend
```

4. **Enable static website hosting:**
```bash
aws s3 website s3://motor-temp-frontend --index-document index.html
```

5. **Set up CloudFront distribution for HTTPS**

### Option 3: Google Cloud Platform

#### Backend on Cloud Run

1. **Build and push to Container Registry:**
```bash
cd backend
gcloud builds submit --tag gcr.io/PROJECT_ID/motor-temp-backend
```

2. **Deploy to Cloud Run:**
```bash
gcloud run deploy motor-temp-backend \
  --image gcr.io/PROJECT_ID/motor-temp-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Frontend on Firebase Hosting

1. **Install Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Initialize:**
```bash
cd frontend
firebase init hosting
```

3. **Build and deploy:**
```bash
npm run build
firebase deploy
```

### Option 4: DigitalOcean

#### Using App Platform

1. **Connect GitHub repository**
2. **Configure backend service:**
   - Type: Web Service
   - Build Command: `pip install -r requirements.txt`
   - Run Command: `gunicorn app:app`
   - Port: 5000

3. **Configure frontend service:**
   - Type: Static Site
   - Build Command: `npm run build`
   - Output Directory: `build`

## Environment Configuration

### Backend Environment Variables

```env
# Flask Configuration
FLASK_ENV=production
FLASK_DEBUG=0
SECRET_KEY=your-secret-key-here

# Server Configuration
HOST=0.0.0.0
PORT=5000

# Model Configuration
MODEL_PATH=model.save
SCALER_PATH=transform.save

# CORS Configuration
ALLOWED_ORIGINS=https://your-frontend-domain.com

# Logging
LOG_LEVEL=INFO
```

### Frontend Environment Variables

```env
# API Configuration
REACT_APP_API_URL=https://your-backend-domain.com

# Environment
REACT_APP_ENV=production

# Analytics (optional)
REACT_APP_GA_TRACKING_ID=UA-XXXXX-X
```

### Security Configuration

1. **Update CORS in backend/app.py:**
```python
from flask_cors import CORS

CORS(app, resources={
    r"/api/*": {
        "origins": ["https://your-frontend-domain.com"]
    }
})
```

2. **Add rate limiting:**
```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/predict', methods=['POST'])
@limiter.limit("10 per minute")
def predict():
    # ... existing code
```

## Production Checklist

### Pre-Deployment

- [ ] Train model with production dataset
- [ ] Run all tests
- [ ] Update environment variables
- [ ] Configure CORS for production domain
- [ ] Enable rate limiting
- [ ] Set up error logging
- [ ] Configure HTTPS/SSL
- [ ] Review security settings

### Backend

- [ ] Set `FLASK_ENV=production`
- [ ] Set `FLASK_DEBUG=0`
- [ ] Use production WSGI server (Gunicorn)
- [ ] Configure proper error handling
- [ ] Set up logging to file/service
- [ ] Enable compression
- [ ] Configure database backups (if using DB)
- [ ] Set up health check endpoint

### Frontend

- [ ] Create production build
- [ ] Update API endpoints
- [ ] Enable build optimization
- [ ] Configure CDN for static assets
- [ ] Set up analytics (optional)
- [ ] Test all features in production build
- [ ] Configure caching headers
- [ ] Enable gzip compression

### Infrastructure

- [ ] Set up SSL/TLS certificates
- [ ] Configure firewall rules
- [ ] Set up domain and DNS
- [ ] Configure load balancer (if needed)
- [ ] Set up auto-scaling (if needed)
- [ ] Configure backup strategy
- [ ] Set up monitoring and alerts

## Monitoring & Maintenance

### Application Monitoring

1. **Backend monitoring with Sentry:**

```python
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[FlaskIntegration()],
    traces_sample_rate=1.0
)
```

2. **Frontend monitoring with Sentry:**

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring

1. **Backend response time:**
```python
import time
from functools import wraps

def timing_decorator(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = f(*args, **kwargs)
        end = time.time()
        print(f"{f.__name__} took {end - start:.2f} seconds")
        return result
    return wrapper
```

2. **Frontend performance:**
```javascript
// Use React Profiler
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
```

### Health Checks

1. **Backend health endpoint:**
```python
@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'model_loaded': model is not None,
        'uptime': get_uptime()
    })
```

2. **Set up uptime monitoring:**
   - UptimeRobot
   - Pingdom
   - StatusCake

### Logging

1. **Configure structured logging:**

```python
import logging
from logging.handlers import RotatingFileHandler

handler = RotatingFileHandler(
    'app.log',
    maxBytes=10000000,
    backupCount=3
)
handler.setLevel(logging.INFO)
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
handler.setFormatter(formatter)
app.logger.addHandler(handler)
```

### Backup Strategy

1. **Model files:**
   - Store in S3/Cloud Storage
   - Version control with Git LFS
   - Regular backups scheduled

2. **Database (if applicable):**
   - Daily automated backups
   - Test restore procedures
   - Offsite backup storage

### Update Procedure

1. **Backend updates:**
```bash
# Pull latest code
git pull origin main

# Install dependencies
pip install -r requirements.txt

# Run tests
pytest

# Restart service
sudo systemctl restart motor-temp-backend
```

2. **Frontend updates:**
```bash
# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Deploy
# (depends on hosting platform)
```

### Scaling Considerations

1. **Horizontal scaling:**
   - Use load balancer
   - Multiple backend instances
   - Shared model storage

2. **Vertical scaling:**
   - Increase server resources
   - Optimize model size
   - Cache predictions

3. **Database scaling (if needed):**
   - Read replicas
   - Connection pooling
   - Query optimization

## Troubleshooting Production Issues

### Common Issues

1. **CORS errors:**
   - Check allowed origins
   - Verify frontend URL
   - Check preflight requests

2. **Model loading failures:**
   - Verify file paths
   - Check permissions
   - Ensure model files exist

3. **High response times:**
   - Enable caching
   - Optimize model
   - Use CDN for static assets

4. **Memory issues:**
   - Monitor memory usage
   - Implement cleanup
   - Consider model optimization

### Emergency Procedures

1. **Rollback procedure:**
```bash
# Heroku
heroku rollback

# AWS
eb deploy --version previous-version

# Docker
docker-compose down
docker-compose up -d --force-recreate
```

2. **Quick fixes:**
```bash
# Restart services
docker-compose restart

# Clear cache
docker system prune

# View logs
docker-compose logs -f --tail=100
```

## Support & Resources

- **Documentation:** See README.md and API.md
- **Issues:** GitHub Issues
- **Monitoring:** Check dashboard at monitoring.yourdomain.com
- **Logs:** Access via cloud platform console

---

**Deployment Checklist Complete? Deploy with confidence! 🚀**
