import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/db.js';
import problemRoutes from './routes/problems.js';
import submissionRoutes from './routes/submissions.js';
import codeRoutes from './routes/codeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize MongoDB & SQL Databases
connectMongoDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server running',
    databases: ['MongoDB', 'SQLite SQL'],
    timestamp: new Date()
  });
});

// RESTful CRUD API Routes
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/code', codeRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✓ CodeMaster AI Server running at http://localhost:${PORT}`);
  console.log(`✓ MongoDB & SQL Database CRUD endpoints initialized`);
});
