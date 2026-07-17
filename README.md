# CodeMaster AI - Complete Platform

A LeetCode-like coding practice platform with AI-assisted feedback using React (frontend) and Node.js Express (backend).

## Project Structure

```
codemasterAI/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   ├── services/    # API service calls
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/              # Node.js Express backend
│   ├── routes/          # API routes
│   ├── data/            # Mock problem data
│   ├── utils/           # Helper functions
│   ├── server.js        # Entry point
│   └── package.json
│
└── README.md
```

## Features

✅ **LeetCode-style Workspace**
- Search problems with dropdown suggestions
- Problem details panel with examples and constraints
- Code editor with language support (JavaScript, Python, C++)
- Real-time AI code analysis

✅ **Backend API**
- Fetch all problems
- Search problems by title/difficulty
- Submit code for AI analysis
- Store submission history

✅ **AI Assistant Panel**
- Detects code issues
- Suggests optimizations
- Provides performance tips
- Analyzes code patterns

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

**Backend:**
```bash
cd server
npm install
npm start
# Server runs on http://localhost:5000
```

**Frontend:**
```bash
cd client
npm install
npm run dev
# Frontend runs on http://localhost:5176
```

## API Endpoints

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get problem by ID
- `GET /api/problems/search/query?q=keyword` - Search problems

### Submissions
- `POST /api/submissions/submit` - Submit code for analysis
- `GET /api/submissions/history` - Get submission history

## Tech Stack

**Frontend:**
- React 18
- React Router
- Vite
- CSS3 (custom styling)

**Backend:**
- Express.js
- Node.js
- CORS enabled
- UUID for unique IDs

## Usage

1. Open `http://localhost:5176` in browser
2. Click "Code" to go to workspace
3. Search for a problem using the search bar
4. Select a problem from suggestions
5. Write or paste code in the editor
6. Click "Analyze with AI" to get feedback
7. View suggestions in the AI panel

## Example Code Analysis

The AI panel detects:
- Type coercion issues (==  vs ===)
- Debug statements (console.log)
- Performance issues (loop optimizations)
- Language-specific patterns

## Future Enhancements

- User authentication
- Database integration (MongoDB)
- Code execution and testing
- Leaderboards
- Problem submissions tracking
- Premium problems
- Discussion forums
- Advanced AI analysis
