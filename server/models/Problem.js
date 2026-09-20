import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    category: { type: String, required: true },
    acceptance: { type: String, default: '50.0%' },
    frequency: { type: String, default: '80%' },
    status: { type: String, default: 'Todo' },
    tags: [{ type: String }],
    companies: [{ type: String }],
    description: { type: String, required: true },
    examples: [
      {
        input: String,
        output: String,
        explanation: String
      }
    ],
    constraints: [{ type: String }],
    starterCode: {
      c: String,
      cpp: String,
      java: String,
      javascript: String,
      python: String
    },
    testCases: [
      {
        input: mongoose.Schema.Types.Mixed,
        expected: mongoose.Schema.Types.Mixed
      }
    ],
    hiddenTestCases: [
      {
        input: mongoose.Schema.Types.Mixed,
        expected: mongoose.Schema.Types.Mixed
      }
    ],
    timeLimit: { type: Number, default: 2.0 },
    memoryLimit: { type: Number, default: 128 },
    hints: [{ type: String }],
    solutionExplanation: String
  },
  { timestamps: true }
);

export default mongoose.models.Problem || mongoose.model('Problem', problemSchema);
