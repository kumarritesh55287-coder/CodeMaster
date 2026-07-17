import express from 'express';
import cors from 'cors';
import problemRoutes from './routes/problems.js';
import submissionRoutes from './routes/submissions.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date() });
});

// Routes
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✓ CodeMaster AI Server running at http://localhost:${PORT}`);
  console.log(`✓ API endpoints available at http://localhost:${PORT}/api`);
});
