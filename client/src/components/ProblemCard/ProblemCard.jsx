import { Link } from 'react-router-dom';

export default function ProblemCard({ problem }) {
  return (
    <article className="problem-card">
      <div className="problem-card-top">
        <span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
        <h3>{problem.title}</h3>
      </div>
      <p>{problem.summary}</p>
      <Link className="card-link" to={`/problem/${problem.id}`}>
        Solve problem
      </Link>
    </article>
  );
}
