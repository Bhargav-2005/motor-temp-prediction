#!/bin/bash

# Electric Motor Temperature Prediction - Quick Start Script
# This script sets up and runs the application

set -e  # Exit on error

echo "=========================================="
echo "Motor Temperature Prediction - Quick Start"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: Python 3 is not installed${NC}"
    echo "Please install Python 3.8 or higher"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    echo "Please install Node.js 16 or higher"
    exit 1
fi

echo -e "${GREEN}✓ Python found: $(python3 --version)${NC}"
echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"
echo ""

# Function to setup backend
setup_backend() {
    echo -e "${YELLOW}Setting up backend...${NC}"
    cd backend
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        echo "Creating virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    echo "Installing Python dependencies..."
    pip install -q -r requirements.txt
    
    # Train model if it doesn't exist
    if [ ! -f "model.save" ]; then
        echo "Training model (this may take a minute)..."
        python train_model.py
    else
        echo -e "${GREEN}✓ Model already exists${NC}"
    fi
    
    cd ..
    echo -e "${GREEN}✓ Backend setup complete${NC}"
    echo ""
}

# Function to setup frontend
setup_frontend() {
    echo -e "${YELLOW}Setting up frontend...${NC}"
    cd frontend
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo "Installing Node.js dependencies..."
        npm install
    else
        echo -e "${GREEN}✓ Dependencies already installed${NC}"
    fi
    
    cd ..
    echo -e "${GREEN}✓ Frontend setup complete${NC}"
    echo ""
}

# Function to start backend
start_backend() {
    echo -e "${YELLOW}Starting backend server...${NC}"
    cd backend
    source venv/bin/activate
    python app.py &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    echo "Waiting for backend to start..."
    sleep 3
    
    # Check if backend is running
    if curl -s http://localhost:5000/health > /dev/null; then
        echo -e "${GREEN}✓ Backend started successfully on http://localhost:5000${NC}"
    else
        echo -e "${RED}✗ Backend failed to start${NC}"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
    echo ""
}

# Function to start frontend
start_frontend() {
    echo -e "${YELLOW}Starting frontend server...${NC}"
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    
    echo -e "${GREEN}✓ Frontend starting on http://localhost:3000${NC}"
    echo ""
}

# Cleanup function
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down servers...${NC}"
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo -e "${GREEN}✓ Backend stopped${NC}"
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo -e "${GREEN}✓ Frontend stopped${NC}"
    fi
    
    # Kill any remaining processes on ports 5000 and 3000
    lsof -ti:5000 | xargs kill -9 2>/dev/null || true
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    
    echo ""
    echo "Goodbye!"
    exit 0
}

# Set up trap to catch Ctrl+C
trap cleanup SIGINT SIGTERM

# Main execution
main() {
    # Check if setup is needed
    if [ "$1" == "--setup-only" ]; then
        setup_backend
        setup_frontend
        echo -e "${GREEN}Setup complete! Run './quickstart.sh' to start the application.${NC}"
        exit 0
    fi
    
    # Full setup and run
    setup_backend
    setup_frontend
    
    echo "=========================================="
    echo -e "${GREEN}Starting application...${NC}"
    echo "=========================================="
    echo ""
    
    start_backend
    start_frontend
    
    echo "=========================================="
    echo -e "${GREEN}Application is running!${NC}"
    echo "=========================================="
    echo ""
    echo "Backend:  http://localhost:5000"
    echo "Frontend: http://localhost:3000"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop the application${NC}"
    echo ""
    
    # Keep script running
    wait
}

# Run main function
main "$@"
