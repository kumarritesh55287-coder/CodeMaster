import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { sqlDb } from '../config/db.js';
import SubmissionModel from '../models/Submission.js';

const router = express.Router();

// ── GET SUBMISSIONS ──────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const mongoSubmissions = await SubmissionModel.find().sort({ createdAt: -1 }).lean();
    if (mongoSubmissions && mongoSubmissions.length > 0) {
      return res.json({ success: true, db: 'MongoDB', submissions: mongoSubmissions });
    }
    
    sqlDb.all('SELECT * FROM submissions ORDER BY submittedAt DESC', [], (err, rows) => {
      res.json({ success: true, db: 'SQLite SQL', submissions: rows || [] });
    });
  } catch (err) {
    sqlDb.all('SELECT * FROM submissions ORDER BY submittedAt DESC', [], (err, rows) => {
      res.json({ success: true, db: 'SQLite SQL', submissions: rows || [] });
    });
  }
});

// ── CREATE SUBMISSION (POST /api/submissions) ────────────────────────────────
router.post('/', async (req, res) => {
  const { problemSlug, language, code, status, runtime, memory } = req.body;

  if (!problemSlug || !language || !code) {
    return res.status(400).json({ success: false, error: 'problemSlug, language, and code are required.' });
  }

  const id = uuidv4();
  const verdictStatus = status || 'Accepted';
  const execRuntime = runtime || '42 ms';
  const execMemory = memory || '38.5 MB';

  try {
    const mongoSub = await SubmissionModel.create({
      problemSlug,
      language,
      code,
      status: verdictStatus,
      runtime: execRuntime,
      memory: execMemory
    });

    sqlDb.run(
      `INSERT INTO submissions (id, problemSlug, language, code, status, runtime, memory)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, problemSlug, language, code, verdictStatus, execRuntime, execMemory]
    );

    res.status(201).json({
      success: true,
      message: 'Submission saved in MongoDB & SQL Database!',
      submission: mongoSub
    });
  } catch (err) {
    sqlDb.run(
      `INSERT INTO submissions (id, problemSlug, language, code, status, runtime, memory)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, problemSlug, language, code, verdictStatus, execRuntime, execMemory]
    );

    res.status(201).json({
      success: true,
      message: 'Submission saved in SQL Database!',
      submission: { id, problemSlug, language, status: verdictStatus, runtime: execRuntime, memory: execMemory }
    });
  }
});

// ── DELETE SUBMISSION (DELETE /api/submissions/:id) ──────────────────────────
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await SubmissionModel.findByIdAndDelete(id);
    sqlDb.run('DELETE FROM submissions WHERE id = ?', [id], function () {
      res.json({ success: true, message: 'Submission deleted.' });
    });
  } catch (err) {
    sqlDb.run('DELETE FROM submissions WHERE id = ?', [id], function () {
      res.json({ success: true, message: 'Submission deleted from SQL.' });
    });
  }
});

export default router;
