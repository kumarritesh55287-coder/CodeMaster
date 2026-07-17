import express from 'express';
import problems from '../data/problems.js';

const router = express.Router();

// Get all problems
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: problems.length,
    problems
  });
});

// Get problem by ID
router.get('/:id', (req, res) => {
  const problem = problems.find((p) => p.id === req.params.id);

  if (!problem) {
    return res.status(404).json({ error: 'Problem not found' });
  }

  res.json({
    success: true,
    problem
  });
});

// Search problems
router.get('/search/query', (req, res) => {
  const keyword = req.query.q?.toLowerCase() || '';

  if (!keyword) {
    return res.json({ success: true, problems });
  }

  const filtered = problems.filter((problem) => {
    return (
      problem.title.toLowerCase().includes(keyword) ||
      problem.summary.toLowerCase().includes(keyword) ||
      problem.difficulty.toLowerCase().includes(keyword)
    );
  });

  res.json({
    success: true,
    count: filtered.length,
    problems: filtered
  });
});

export default router;
