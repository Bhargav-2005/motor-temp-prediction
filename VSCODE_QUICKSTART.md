# 🚀 VSCode Quick Start Guide

## Complete Setup in VSCode - 5 Minutes!

### 📥 Step 1: Download and Extract (30 seconds)

1. Download `motor-temp-prediction.zip`
2. Extract to a folder (e.g., `C:\Projects\` or `~/Projects/`)
3. You should have: `motor-temp-prediction/` folder

---

### 💻 Step 2: Open in VSCode (10 seconds)

1. Open VSCode
2. Click: **File → Open Folder**
3. Select: `motor-temp-prediction` folder
4. Click: **Select Folder**

You should see this structure in VSCode Explorer:
```
motor-temp-prediction/
├── backend/
├── frontend/
├── STEP_BY_STEP_GUIDE.md
└── ...
```

---

### 🔧 Step 3: Install VSCode Extensions (1 minute)

**Recommended Extensions:**

1. **Python** (by Microsoft)
   - Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
   - Search: "Python"
   - Click: Install

2. **ES7+ React/Redux/React-Native snippets**
   - Search: "ES7 React"
   - Click: Install

3. **Prettier - Code formatter** (Optional)
   - Search: "Prettier"
   - Click: Install

---

### 🐍 Step 4: Setup Backend (2 minutes)

**Open Terminal in VSCode:**
- Press: `` Ctrl+` `` (backtick) or View → Terminal

**Run these commands:**

#### Windows:
```cmd
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python train_model.py
```

#### Mac/Linux:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python train_model.py
```

**Wait for "Training completed successfully!"**

You'll see:
```
✓ Linear Regression    | R²: 0.9632 | RMSE: 0.0365
Model saved as 'model.save'
```

---

### ⚛️ Step 5: Setup Frontend (2 minutes)

**Open a SECOND terminal in VSCode:**
- Click the `+` button in terminal panel
- Or press: `` Ctrl+Shift+` ``

**Run these commands:**
```bash
cd frontend
npm install
```

**Wait for installation** (this takes 2-3 minutes)

---

### 🎯 Step 6: Run the Application!

**You should now have 2 terminals open:**

**Terminal 1 (Backend):**
```bash
cd backend
# Virtual environment should still be active
python app.py
```

**Expected output:**
```
 * Running on http://0.0.0.0:5000
✓ Model and scaler loaded successfully
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

**Expected output:**
```
Compiled successfully!

Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

**Browser will automatically open to http://localhost:3000**

---

### 🎉 Step 7: Test the Application

1. In the browser, you'll see: **MOTOR TEMP PREDICTOR**
2. Click: **"Load Sample"** button
3. Click: **"Predict Temperature"** button
4. Watch the gauge animate! 🌡️

**Congratulations! Your app is running!** 🎊

---

## 📂 VSCode Workspace Layout

### Recommended Layout:

**Left Side:**
- Explorer (files)
- Search
- Source Control (Git)

**Center:**
- Code editor
- Multiple tabs for different files

**Bottom:**
- Terminal 1: Backend (running `python app.py`)
- Terminal 2: Frontend (running `npm start`)
- Terminal 3: For testing/commands

**Right Side (Optional):**
- Live Server / Browser Preview

---

## 🔥 Essential VSCode Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Open Terminal | `` Ctrl+` `` | `` Cmd+` `` |
| New Terminal | `` Ctrl+Shift+` `` | `` Cmd+Shift+` `` |
| Quick Open File | `Ctrl+P` | `Cmd+P` |
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Split Editor | `Ctrl+\` | `Cmd+\` |
| Toggle Sidebar | `Ctrl+B` | `Cmd+B` |
| Save All | `Ctrl+K S` | `Cmd+K S` |
| Format Document | `Shift+Alt+F` | `Shift+Option+F` |

---

## 📝 Useful VSCode Settings

### Create `.vscode/settings.json` in project root:

```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/backend/venv/bin/python",
  "python.terminal.activateEnvironment": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": false,
  "python.linting.flake8Enabled": true,
  "files.exclude": {
    "**/__pycache__": true,
    "**/.pytest_cache": true,
    "**/node_modules": true
  }
}
```

---

## 🐛 Debugging in VSCode

### Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Flask",
      "type": "python",
      "request": "launch",
      "module": "flask",
      "env": {
        "FLASK_APP": "app.py",
        "FLASK_ENV": "development"
      },
      "args": ["run", "--no-debugger", "--no-reload"],
      "jinja": true,
      "cwd": "${workspaceFolder}/backend"
    }
  ]
}
```

**To debug:**
1. Open `backend/app.py`
2. Set breakpoint (click left of line number)
3. Press `F5` or Run → Start Debugging

---

## 📋 Common Tasks in VSCode

### Run Backend Tests:
```bash
# Terminal 1
cd backend
source venv/bin/activate  # or venv\Scripts\activate
pytest test_app.py -v
```

### Explore Data in Jupyter:
```bash
# Terminal
cd backend
source venv/bin/activate
jupyter notebook
# Opens in browser, click exploration.ipynb
```

### Format Code:
- **Python:** `Shift+Alt+F` (install autopep8 or black)
- **JavaScript/React:** `Shift+Alt+F` (Prettier installed)

### Git Integration:
1. Click Source Control icon (left sidebar)
2. Stage changes
3. Write commit message
4. Click ✓ to commit

---

## 🎨 Customize VSCode Theme

### For this Project (Dark Theme):

1. Press: `Ctrl+K Ctrl+T`
2. Choose: **Dark+ (default dark)** or **One Dark Pro**
3. Install: **Material Icon Theme** for better file icons

### Recommended Color Theme:
- **One Dark Pro** - Matches the app's futuristic design
- **Dracula Official** - Great for dark mode coding
- **Night Owl** - Easy on eyes

---

## 📁 Important Files to Know

### Files You'll Edit Often:

**Backend:**
- `backend/app.py` - API endpoints
- `backend/train_model.py` - Model training

**Frontend:**
- `frontend/src/App.jsx` - Main UI
- `frontend/src/App.css` - Styles

**Documentation:**
- `STEP_BY_STEP_GUIDE.md` - Full guide
- `README.md` - Overview

### Files You Won't Edit:

- `backend/model.save` - Auto-generated
- `backend/transform.save` - Auto-generated
- `frontend/node_modules/` - Dependencies
- `backend/venv/` - Virtual environment

---

## 🔄 Development Workflow in VSCode

### Typical Day:

**Morning:**
```bash
# Terminal 1
cd backend
source venv/bin/activate
python app.py

# Terminal 2
cd frontend
npm start
```

**During Development:**
- Edit files in VSCode
- Save (`Ctrl+S`)
- **Frontend:** Changes auto-reload in browser
- **Backend:** Restart `python app.py` to see changes

**Testing:**
```bash
# Terminal 3
curl http://localhost:5000/health
```

**End of Day:**
- `Ctrl+C` in both terminals to stop servers
- Close VSCode or leave terminals running

---

## 🆘 Troubleshooting in VSCode

### Problem: Python not found

**Solution:**
1. Open Command Palette: `Ctrl+Shift+P`
2. Type: "Python: Select Interpreter"
3. Choose: `venv` from the list
4. Restart terminal

### Problem: npm not found

**Solution:**
1. Restart VSCode
2. Open new terminal
3. Run: `node --version` and `npm --version`
4. If still not found, reinstall Node.js

### Problem: Port already in use

**Solution:**
```bash
# In VSCode terminal
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Problem: Module not found

**Backend:**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 💡 VSCode Tips for This Project

### 1. Multi-File Editing

Open side-by-side:
- `App.jsx` (left) and `App.css` (right)
- `Ctrl+\` to split editor

### 2. Quick File Navigation

- `Ctrl+P` → Type filename
- Examples:
  - Type "app.py" → Jump to backend
  - Type "App.jsx" → Jump to frontend

### 3. Integrated Git

- Stage: Click `+` next to file
- Commit: Type message, click ✓
- Push: Click ⋯ → Push

### 4. Search Across Project

- `Ctrl+Shift+F`
- Search for: "predict"
- See all usages across files

### 5. Refactoring

- Right-click variable/function
- Choose: "Rename Symbol"
- Updates everywhere!

---

## 🎯 Quick Reference

### Start Application:
```bash
# Terminal 1 (Backend)
cd backend && source venv/bin/activate && python app.py

# Terminal 2 (Frontend)  
cd frontend && npm start
```

### Stop Application:
- `Ctrl+C` in both terminals

### Access Application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/health

### Common Commands:
```bash
# Install dependencies
pip install -r requirements.txt    # Backend
npm install                         # Frontend

# Train model
python train_model.py               # Backend

# Run tests
pytest test_app.py                  # Backend

# Build for production
npm run build                       # Frontend
```

---

## 📚 Next Steps

1. ✅ **You're running!** Make your first prediction
2. 📖 **Read:** `STEP_BY_STEP_GUIDE.md` for details
3. 🎨 **Customize:** Change colors in `App.css`
4. 🔧 **Experiment:** Modify features in `App.jsx`
5. 📊 **Explore:** Open Jupyter notebook
6. 🚀 **Deploy:** See `DEPLOYMENT.md`

---

## 🎊 You're All Set!

**Your VSCode workspace is ready for:**
- ✅ Backend development (Python/Flask)
- ✅ Frontend development (React)
- ✅ Machine Learning (Jupyter)
- ✅ Testing and debugging
- ✅ Git version control
- ✅ Production deployment

**Happy Coding!** 💻🚀

---

**Need Help?**
- Check `STEP_BY_STEP_GUIDE.md` for detailed instructions
- See `FAQ.md` for common questions
- Review `WORKFLOW_DIAGRAM.md` for visual guides
