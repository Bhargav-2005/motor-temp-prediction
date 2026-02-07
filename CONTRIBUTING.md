# Contributing to Electric Motor Temperature Prediction

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Pull Request Process](#pull-request-process)
7. [Reporting Bugs](#reporting-bugs)
8. [Feature Requests](#feature-requests)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- Be respectful and considerate
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the project

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks
- Publishing others' private information

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- Git
- Basic knowledge of Flask and React

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/motor-temp-prediction.git
cd motor-temp-prediction
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/motor-temp-prediction.git
```

### Setup Development Environment

1. **Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Frontend:**
```bash
cd frontend
npm install
```

## Development Workflow

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### Creating a Feature Branch

```bash
git checkout develop
git pull upstream develop
git checkout -b feature/your-feature-name
```

### Making Changes

1. Make your changes in your feature branch
2. Write or update tests
3. Update documentation
4. Commit your changes with clear messages

### Commit Messages

Follow the conventional commits format:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(backend): add batch prediction endpoint

- Implement /batch-predict endpoint
- Add input validation for batch requests
- Update API documentation

Closes #123
```

```
fix(frontend): correct temperature gauge animation

The gauge was not animating smoothly on mobile devices.
Fixed by adjusting CSS animation timing.

Fixes #456
```

## Coding Standards

### Python (Backend)

**Style Guide:** PEP 8

```python
# Good
def predict_temperature(features):
    """
    Predict motor temperature based on input features.
    
    Args:
        features (dict): Motor operational parameters
        
    Returns:
        float: Predicted temperature
    """
    # Implementation
    pass

# Use type hints
def process_data(data: pd.DataFrame) -> pd.DataFrame:
    return data.dropna()
```

**Linting:**
```bash
pip install flake8 black
black backend/
flake8 backend/
```

### JavaScript/React (Frontend)

**Style Guide:** Airbnb JavaScript Style Guide

```javascript
// Good
const PredictionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
};

// Use PropTypes or TypeScript
PredictionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
```

**Linting:**
```bash
npm install --save-dev eslint prettier
npm run lint
npm run format
```

### General Guidelines

- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Follow DRY (Don't Repeat Yourself)
- Handle errors gracefully
- Validate all inputs

## Testing

### Backend Tests

```bash
cd backend
pytest test_app.py -v
```

**Writing Tests:**
```python
def test_predict_valid_input(client):
    """Test prediction with valid input"""
    payload = {
        'ambient': 25.5,
        # ... other fields
    }
    
    response = client.post('/predict', json=payload)
    
    assert response.status_code == 200
    assert 'prediction' in response.json
```

### Frontend Tests

```bash
cd frontend
npm test
```

**Writing Tests:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import PredictionForm from './PredictionForm';

test('submits form with valid data', () => {
  const handleSubmit = jest.fn();
  render(<PredictionForm onSubmit={handleSubmit} />);
  
  // Fill form
  fireEvent.change(screen.getByLabelText(/ambient/i), {
    target: { value: '25.5' }
  });
  
  // Submit
  fireEvent.click(screen.getByText(/predict/i));
  
  expect(handleSubmit).toHaveBeenCalled();
});
```

### Test Coverage

Aim for at least 80% code coverage:

```bash
# Backend
pytest --cov=backend --cov-report=html

# Frontend
npm test -- --coverage
```

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Commits are clean and atomic

### Submitting Pull Request

1. Push your branch to your fork:
```bash
git push origin feature/your-feature-name
```

2. Go to GitHub and create a Pull Request

3. Fill in the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
```

4. Request review from maintainers

### Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, PR will be merged

### After Merge

1. Update your local repository:
```bash
git checkout develop
git pull upstream develop
```

2. Delete your feature branch:
```bash
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

## Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported
2. Ensure you're using the latest version
3. Collect relevant information

### Bug Report Template

```markdown
**Description:**
Clear description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Screenshots:**
If applicable

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Python version: [e.g., 3.9]
- Node version: [e.g., 16.0]

**Additional Context:**
Any other relevant information
```

## Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Proposed Solution:**
How you think it should work

**Alternatives Considered:**
Other solutions you've thought about

**Additional Context:**
Screenshots, mockups, or examples
```

## Documentation

### When to Update Documentation

- Adding new features
- Changing APIs
- Modifying configuration
- Updating dependencies

### Documentation Files

- `README.md` - Project overview
- `SETUP.md` - Installation guide
- `API.md` - API reference
- `DEPLOYMENT.md` - Deployment guide
- Code comments and docstrings

## Community

### Getting Help

- Open a GitHub issue
- Check existing documentation
- Ask in discussions

### Stay Updated

- Watch the repository for updates
- Follow the project on social media
- Subscribe to release notifications

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation

Thank you for contributing! 🎉
