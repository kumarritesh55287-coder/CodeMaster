import { useParams, Link } from 'react-router-dom';
import { getProblemById } from '../../services/problemAPI';
import EditorPanel from '../../components/Editor/EditorPanel';

export default function ProblemDetails() {
  const { problemId } = useParams();
  const problem = getProblemById(problemId);

  if (!problem) {
    return (
      <section className="section-card">
        <h2>Problem not found</h2>
        <p>The requested problem does not exist yet. Try another one from the home page.</p>
        <Link className="button button-primary" to="/">
          Back to home
        </Link>
      </section>
    );
  }

  return (
    <div className="problem-page">
      <section className="section-card">
        <div className="section-header">
          <div>
            <h1>{problem.title}</h1>
            <span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
          </div>
        </div>
        <p>{problem.description}</p>
      </section>

      <EditorPanel problem={problem} />
    </div>
  );
}
