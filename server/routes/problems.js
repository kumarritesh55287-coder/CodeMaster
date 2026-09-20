import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { sqlDb } from '../config/db.js';
import ProblemModel from '../models/Problem.js';

const router = express.Router();

// ── 1. READ ALL PROBLEMS (GET /api/problems) ────────────────────────────────
router.get('/', async (req, res) => {
  try {
    // Try fetching from MongoDB first
    const mongoProblems = await ProblemModel.find().lean();
    if (mongoProblems && mongoProblems.length > 0) {
      return res.json({ success: true, db: 'MongoDB', count: mongoProblems.length, problems: mongoProblems });
    }

    // Fallback to SQL database
    sqlDb.all('SELECT * FROM problems ORDER BY createdAt DESC', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, db: 'SQLite SQL', count: rows.length, problems: rows });
    });
  } catch (error) {
    sqlDb.all('SELECT * FROM problems ORDER BY createdAt DESC', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, db: 'SQLite SQL', count: rows.length, problems: rows });
    });
  }
});

// ── 2. READ SINGLE PROBLEM BY SLUG (GET /api/problems/:slug) ────────────────
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    // MongoDB lookup
    const mongoProb = await ProblemModel.findOne({ slug });
    if (mongoProb) {
      return res.json({ success: true, db: 'MongoDB', problem: mongoProb });
    }

    // SQL lookup
    sqlDb.get('SELECT * FROM problems WHERE slug = ? OR id = ?', [slug, slug], (err, row) => {
      if (err || !row) {
        return res.status(404).json({ success: false, error: 'Problem not found' });
      }
      res.json({ success: true, db: 'SQLite SQL', problem: row });
    });
  } catch (error) {
    sqlDb.get('SELECT * FROM problems WHERE slug = ? OR id = ?', [slug, slug], (err, row) => {
      if (err || !row) {
        return res.status(404).json({ success: false, error: 'Problem not found' });
      }
      res.json({ success: true, db: 'SQLite SQL', problem: row });
    });
  }
});

// ── 3. CREATE PROBLEM (POST /api/problems) ──────────────────────────────────
router.post('/', async (req, res) => {
  const { title, slug, difficulty, category, description, acceptance, starterCode } = req.body;

  if (!title || !difficulty || !category || !description) {
    return res.status(400).json({ success: false, error: 'Title, difficulty, category, and description are required.' });
  }

  const probSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const probId = uuidv4();

  try {
    // Save to MongoDB
    const mongoDoc = await ProblemModel.create({
      slug: probSlug,
      title,
      difficulty,
      category,
      description,
      acceptance: acceptance || '50.0%',
      starterCode: starterCode || {}
    });

    // Also save to SQL Database for dual sync
    sqlDb.run(
      `INSERT OR REPLACE INTO problems (id, slug, title, difficulty, category, acceptance, description, starterCode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [probId, probSlug, title, difficulty, category, acceptance || '50.0%', description, JSON.stringify(starterCode || {})]
    );

    res.status(201).json({
      success: true,
      message: 'Problem created in MongoDB & SQL Database successfully!',
      problem: mongoDoc
    });
  } catch (err) {
    // Save to SQL Database directly if MongoDB offline
    sqlDb.run(
      `INSERT OR REPLACE INTO problems (id, slug, title, difficulty, category, acceptance, description, starterCode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [probId, probSlug, title, difficulty, category, acceptance || '50.0%', description, JSON.stringify(starterCode || {})]
    );

    res.status(201).json({
      success: true,
      message: 'Problem created in SQL Database successfully!',
      problem: { id: probId, slug: probSlug, title, difficulty, category, acceptance, description }
    });
  }
});

// ── 4. UPDATE PROBLEM (PUT /api/problems/:slug) ──────────────────────────────
router.put('/:slug', async (req, res) => {
  const { slug } = req.params;
  const updates = req.body;

  try {
    // Update MongoDB
    const updatedMongo = await ProblemModel.findOneAndUpdate({ slug }, updates, { new: true });

    // Update SQL
    sqlDb.run(
      `UPDATE problems SET title = ?, difficulty = ?, category = ?, description = ? WHERE slug = ?`,
      [updates.title, updates.difficulty, updates.category, updates.description, slug],
      function (err) {
        res.json({
          success: true,
          message: 'Problem updated in database',
          mongoUpdated: !!updatedMongo,
          sqlChanges: this?.changes || 0
        });
      }
    );
  } catch (err) {
    sqlDb.run(
      `UPDATE problems SET title = ?, difficulty = ?, category = ?, description = ? WHERE slug = ?`,
      [updates.title, updates.difficulty, updates.category, updates.description, slug],
      function (err) {
        res.json({ success: true, message: 'Problem updated in SQL database' });
      }
    );
  }
});

// ── 5. DELETE PROBLEM (DELETE /api/problems/:slug) ───────────────────────────
router.delete('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    // Delete from MongoDB
    await ProblemModel.findOneAndDelete({ slug });

    // Delete from SQL
    sqlDb.run(`DELETE FROM problems WHERE slug = ? OR id = ?`, [slug, slug], function (err) {
      res.json({ success: true, message: `Problem '${slug}' deleted from database.` });
    });
  } catch (err) {
    sqlDb.run(`DELETE FROM problems WHERE slug = ? OR id = ?`, [slug, slug], function (err) {
      res.json({ success: true, message: `Problem '${slug}' deleted from SQL database.` });
    });
  }
});

export default router;
