@echo off
REM Electric Motor Temperature Prediction - Quick Start Script (Windows)
REM This script sets up and runs the application

echo ==========================================
echo Motor Temperature Prediction - Quick Start
echo ==========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed
    echo Please install Python 3.8 or higher
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed
    echo Please install Node.js 16 or higher
    pause
    exit /b 1
)

echo [OK] Python found
echo [OK] Node.js found
echo.

REM Setup Backend
echo Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate

REM Install dependencies
echo Installing Python dependencies...
pip install -q -r requirements.txt

REM Train model if it doesn't exist
if not exist "model.save" (
    echo Training model ^(this may take a minute^)...
    python train_model.py
) else (
    echo [OK] Model already exists
)

cd ..
echo [OK] Backend setup complete
echo.

REM Setup Frontend
echo Setting up frontend...
cd frontend

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing Node.js dependencies...
    call npm install
) else (
    echo [OK] Dependencies already installed
)

cd ..
echo [OK] Frontend setup complete
echo.

REM Start Backend
echo ==========================================
echo Starting application...
echo ==========================================
echo.

echo Starting backend server...
cd backend
call venv\Scripts\activate
start /B python app.py
cd ..

REM Wait for backend
timeout /t 3 /nobreak >nul

echo [OK] Backend started on http://localhost:5000
echo.

REM Start Frontend
echo Starting frontend server...
cd frontend
start /B npm start
cd ..

echo [OK] Frontend starting on http://localhost:3000
echo.

echo ==========================================
echo Application is running!
echo ==========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop the application
echo.

REM Keep window open
pause
