# Frequently Asked Questions (FAQ)

## General Questions

### What is this project?

Electric Motor Temperature Prediction is a full-stack machine learning application that predicts electric motor rotor temperatures based on operational parameters. It helps prevent equipment failures through predictive maintenance.

### Who is this for?

- **Manufacturing facilities** monitoring motor health
- **Data scientists** learning ML deployment
- **Developers** studying full-stack ML applications
- **Students** working on ML projects
- **Industrial IoT** applications

### Is it production-ready?

Yes! The project includes:
- Robust error handling
- Comprehensive testing
- Docker deployment
- Security best practices
- Production deployment guides

However, for critical industrial use, we recommend:
- Training with real production data
- Extended testing and validation
- Professional security audit
- Custom tuning for your specific motors

---

## Installation & Setup

### Do I need to know machine learning?

No! The project is ready to use out of the box:
- Pre-configured model training
- Sample data generation
- Clear documentation
- One-command deployment

Basic understanding helps for customization.

### What are the system requirements?

**Minimum:**
- CPU: 2 cores
- RAM: 4GB
- Storage: 2GB free space
- OS: Windows 10, macOS 10.15+, or Linux

**Recommended:**
- CPU: 4+ cores
- RAM: 8GB+
- Storage: 5GB+ free space
- SSD for better performance

### Can I run this on a Raspberry Pi?

Yes! The application can run on Raspberry Pi 4 (4GB+ RAM recommended). You may need to:
- Use lighter dependencies
- Reduce model complexity
- Optimize React build size
- Consider headless deployment

### How long does setup take?

- **Automated setup:** 5-10 minutes
- **Manual setup:** 15-30 minutes
- **Docker setup:** 10-15 minutes

Time varies based on internet speed and system performance.

---

## Usage

### How do I make a prediction?

1. Start the application
2. Open http://localhost:3000
3. Click "Load Sample" for test data
4. Click "Predict Temperature"
5. View results in the gauge and details panel

### What do the input parameters mean?

| Parameter | Description | Typical Range |
|-----------|-------------|---------------|
| Ambient | Environmental temperature | 15-35°C |
| Coolant | Cooling system temperature | 10-30°C |
| u_d | Direct axis voltage component | -100 to 100V |
| u_q | Quadrature axis voltage component | -100 to 100V |
| Motor Speed | Rotational speed | 0-5000 RPM |
| i_d | Direct axis current | -100 to 100A |
| i_q | Quadrature axis current | -100 to 100A |

### What do risk levels mean?

- **Low** (Green): Temperature < 30% - Normal operation
- **Normal** (Blue): Temperature 30-60% - Expected range
- **Warning** (Orange): Temperature 60-80% - Increased monitoring
- **Critical** (Red): Temperature > 80% - Immediate attention needed

### Are the temperature values accurate?

The model predicts normalized temperatures (0-1 scale). For actual temperature values:
- Multiply by 100 for approximate °C
- Train with real data for precise readings
- Calibrate against actual sensor data

### Can I use my own data?

Yes! Replace the sample dataset:
1. Prepare CSV with required columns
2. Save as `backend/dataset.csv`
3. Run `python train_model.py`
4. Restart the backend

---

## Technical Questions

### Which ML algorithm is used?

The system trains and compares 4 algorithms:
- Linear Regression ✓ (Currently best: 96% R²)
- Decision Tree Regressor
- Random Forest Regressor
- Support Vector Regression (SVR)

The best model is automatically selected and saved.

### Why Linear Regression instead of Decision Tree?

With the current synthetic dataset, Linear Regression performs best (96% R²). With real-world data, this may change. The training script automatically selects the best model.

### Can I retrain the model?

Yes! Two ways:

**Method 1: With new data**
```bash
cd backend
# Add your dataset.csv
python train_model.py
```

**Method 2: With different parameters**
Edit `train_model.py` and adjust:
- Algorithm hyperparameters
- Train/test split ratio
- Feature selection
- Scaling methods

### How do I improve accuracy?

1. **Use real data**: Replace sample data with actual motor data
2. **More data**: Larger datasets generally improve performance
3. **Feature engineering**: Add relevant calculated features
4. **Hyperparameter tuning**: Optimize model parameters
5. **Ensemble methods**: Combine multiple models
6. **Cross-validation**: Use k-fold validation

### Can I add more features?

Yes! Update:
1. `train_model.py` - Add feature to dataset
2. `backend/app.py` - Add to API input validation
3. `frontend/src/components/PredictionForm.jsx` - Add input field

### How is the model stored?

- **Format**: Joblib serialization
- **Files**: 
  - `model.save` - Trained ML model
  - `transform.save` - Feature scaler
- **Location**: `backend/` directory
- **Size**: Typically < 1MB

---

## Deployment

### Can I deploy this to production?

Yes! See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guides on:
- Heroku
- AWS
- Google Cloud
- DigitalOcean
- Docker

### What's the best hosting option?

Depends on your needs:

**For learning/demos:**
- Heroku (easy, free tier)
- Vercel + Heroku (separate front/back)

**For production:**
- AWS (scalable, flexible)
- GCP (good ML tools)
- DigitalOcean (simple, cost-effective)

**For enterprise:**
- On-premise Docker
- Private cloud
- Kubernetes cluster

### How do I handle HTTPS?

**Free options:**
- Let's Encrypt (self-hosted)
- Cloudflare (CDN + SSL)
- Platform-provided (Heroku, Vercel, etc.)

**Configuration:**
Update CORS settings and API URLs to use HTTPS.

### How do I scale the application?

**Vertical Scaling:**
- Increase server resources
- Optimize model size
- Add caching

**Horizontal Scaling:**
- Multiple backend instances
- Load balancer
- Distributed model serving
- Redis for session/cache

---

## Customization

### How do I change the UI design?

The frontend uses CSS for styling:
- **Colors**: Edit CSS variables in `index.css`
- **Fonts**: Change Google Fonts in `index.html`
- **Layout**: Modify component CSS files
- **Theme**: Update color scheme variables

### Can I change the API endpoints?

Yes! Update both:
1. Backend route definitions in `app.py`
2. Frontend API calls in components
3. API documentation in `API.md`

### How do I add authentication?

Add to backend:
```python
from flask_jwt_extended import JWTManager

jwt = JWTManager(app)

@app.route('/predict', methods=['POST'])
@jwt_required()
def predict():
    # ... existing code
```

Add to frontend:
```javascript
// Store token after login
localStorage.setItem('token', token);

// Include in API calls
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Can I add a database?

Yes! Common options:

**SQLite** (Simple):
```python
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///predictions.db'
db = SQLAlchemy(app)
```

**PostgreSQL** (Production):
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@host/db'
```

---

## Troubleshooting

### Backend won't start

**Check:**
1. Virtual environment activated?
2. Dependencies installed? `pip install -r requirements.txt`
3. Model files exist? Run `python train_model.py`
4. Port 5000 available? `lsof -ti:5000`

### Frontend won't load

**Check:**
1. Dependencies installed? `npm install`
2. Backend running? Check http://localhost:5000/health
3. CORS enabled? Check `app.py` CORS configuration
4. Port 3000 available?

### Predictions are always the same

**Possible causes:**
1. Model not properly trained
2. Scaler not applied correctly
3. Input values not varying
4. Cache issue (clear browser cache)

**Fix:**
```bash
cd backend
rm model.save transform.save
python train_model.py
```

### "CORS error" in browser console

**Solution:**
1. Verify backend is running
2. Check CORS configuration in `app.py`:
```python
from flask_cors import CORS
CORS(app)  # Enable for all origins (dev only)
```
3. For production, specify allowed origins

### Model accuracy is low

**Reasons:**
- Using synthetic sample data
- Need more training data
- Wrong model for data type
- Poor feature selection

**Solutions:**
- Use real motor data
- Increase dataset size
- Try different algorithms
- Add feature engineering

---

## Performance

### How fast is prediction?

- **API response**: < 100ms average
- **Model inference**: < 10ms
- **End-to-end**: < 200ms (including network)

### Can it handle many requests?

**Default setup:**
- ~100 requests/minute (single instance)
- Limited by Python GIL

**Scaled setup:**
- 1000+ requests/minute
- Multiple backend instances
- Load balancer
- Async processing

### How do I optimize performance?

1. **Caching**: Add Redis for repeated predictions
2. **Compression**: Enable gzip
3. **CDN**: Serve frontend from CDN
4. **Database**: Index prediction history
5. **Async**: Use async frameworks (FastAPI)

---

## Security

### Is the application secure?

Basic security included:
- Input validation
- Error sanitization
- CORS configuration
- No SQL injection risk (no database by default)

**For production, add:**
- HTTPS/SSL
- Authentication
- Rate limiting
- Security headers
- Regular updates

### Should I use environment variables?

Yes! Never hardcode:
- API keys
- Passwords
- Secret keys
- Database URLs

Use `.env` files (excluded from git).

### How do I protect the API?

Add rate limiting:
```python
from flask_limiter import Limiter

limiter = Limiter(app)

@app.route('/predict')
@limiter.limit("10 per minute")
def predict():
    # ... existing code
```

---

## Data & Privacy

### What data is collected?

By default:
- Input parameters (for prediction)
- Prediction results (temporary, in memory)

**NOT collected:**
- Personal information
- IP addresses
- Usage analytics

### Is data stored?

No, by default data is not persisted. To add storage:
- Implement database
- Add logging
- Configure analytics

### Can I use this commercially?

Yes! MIT License allows:
- Commercial use
- Modification
- Distribution
- Private use

**Requirements:**
- Include original license
- Include copyright notice

---

## Support

### Where can I get help?

1. **Documentation**: Check README, SETUP, API docs
2. **GitHub Issues**: Report bugs or ask questions
3. **Discussions**: Community Q&A
4. **Stack Overflow**: Tag with project name

### How do I report a bug?

1. Check if already reported
2. Use bug report template
3. Include:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Error messages/logs

### How can I contribute?

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code contributions
- Documentation improvements
- Bug reports
- Feature requests
- Testing

---

## Future Development

### What's planned for future versions?

See [CHANGELOG.md](CHANGELOG.md) for roadmap including:
- User authentication
- Advanced analytics
- Real-time monitoring
- Mobile app
- Multi-language support

### Can I request a feature?

Yes! Open a GitHub issue with:
- Clear description
- Use case
- Expected behavior
- Mockups/examples (if applicable)

---

## Still have questions?

- 📧 Email: support@example.com
- 💬 GitHub Discussions
- 🐛 GitHub Issues
- 📚 Documentation Wiki
