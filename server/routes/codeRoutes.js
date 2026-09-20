import express from 'express';
import { runCode, submitCode } from '../controllers/codeController.js';

const router = express.Router();

// POST /api/code/run — Custom Input Execution
router.post('/run', runCode);

// POST /api/code/submit — Test Case Submission Evaluation
router.post('/submit', submitCode);

export default router;
