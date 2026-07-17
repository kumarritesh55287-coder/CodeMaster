import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { analyzeCode } from '../utils/codeAnalyzer.js';

const router = express.Router();
const submissions = [];

// Submit code
router.post('/submit', (req, res) => {
  const { code, language, problemId } = req.body;

  if (!code || !language || !problemId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const analysis = analyzeCode(code, language);

  const submission = {
    id: uuidv4(),
    problemId,
    code,
    language,
    analysis,
    timestamp: new Date(),
    status: 'success'
  };

  submissions.push(submission);

  res.json({
    success: true,
    submission,
    feedback: {
      suggestions: analysis.suggestions,
      summary: analysis.summary,
      passRate: Math.random() * 100 | 0
    }
  });
});

// Get submission history
router.get('/history', (req, res) => {
  res.json({ submissions: submissions.slice(-10) });
});

export default router;
