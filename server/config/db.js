import mongoose from 'mongoose';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists for SQLite database file
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqlitePath = path.join(dataDir, 'codemaster.sqlite');

// Initialize SQLite SQL Database
export const sqlDb = new sqlite3.Database(sqlitePath, (err) => {
  if (err) {
    console.error('❌ SQL Database Connection Error:', err.message);
  } else {
    console.log(`✓ SQL Database (SQLite) connected: ${sqlitePath}`);
    initSqlTables();
  }
});

// Initialize SQL Tables
function initSqlTables() {
  sqlDb.serialize(() => {
    // Problems Table (SQL)
    sqlDb.run(`
      CREATE TABLE IF NOT EXISTS problems (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        category TEXT NOT NULL,
        acceptance TEXT,
        description TEXT NOT NULL,
        starterCode TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Submissions Table (SQL)
    sqlDb.run(`
      CREATE TABLE IF NOT EXISTS submissions (
        id TEXT PRIMARY KEY,
        problemSlug TEXT NOT NULL,
        language TEXT NOT NULL,
        code TEXT NOT NULL,
        status TEXT NOT NULL,
        runtime TEXT,
        memory TEXT,
        submittedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Users Table (SQL)
    sqlDb.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        streak INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✓ SQL Tables initialized (problems, submissions, users)');
  });
}

// Connect to MongoDB
export const connectMongoDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codemaster';
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`✓ MongoDB connected successfully to: ${mongoURI}`);
    return true;
  } catch (err) {
    console.log(`⚠️ MongoDB offline or unreachable (${err.message}). Defaulting to SQL Database.`);
    return false;
  }
};
