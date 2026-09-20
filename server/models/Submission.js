import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    problemSlug: { type: String, required: true },
    userId: { type: String, default: 'guest' },
    language: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: String, enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded'], required: true },
    runtime: { type: String, default: 'N/A' },
    memory: { type: String, default: 'N/A' },
    testResults: [
      {
        caseNum: Number,
        input: String,
        expected: String,
        actual: String,
        passed: Boolean
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
