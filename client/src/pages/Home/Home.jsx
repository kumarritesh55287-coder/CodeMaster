import { Link } from 'react-router-dom';
import { getMockProblems } from '../../services/problemAPI';
import ProblemCard from '../../components/ProblemCard/ProblemCard';

export default function Home() {
  const problems = getMockProblems();

  return (
    <div className="home-page">
      <section className="section-card hero-card">
        <div>
          <h1>Build a smarter coding platform with AI guidance.</h1>
          <p>
            Codemaster AI is a frontend-first problem solving environment with an editor and a live AI panel that points out errors,
            suggests optimizations, and helps coders improve faster.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/problem/1">
              Start solving
            </Link>
            <Link className="button button-secondary" to="/workspace">
              Start coding
            </Link>
          </div>
        </div>
        <div className="hero-stat-card">
          <div>
            <strong>AI-Supported Ideas</strong>
            <p>Receive real-time guidance while you type.</p>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-header">
          <h2>Featured practice problems</h2>
          <p>Try problems selected for fast learning and AI-assisted debugging.</p>
        </div>
        <div className="grid grid-3">
          {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </section>
    </div>
  );
}
