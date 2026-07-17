import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section-card notfound-card">
      <h1>404</h1>
      <p>Sorry, this page does not exist yet. Return to the coding hub and continue building.</p>
      <Link className="button button-primary" to="/">
        Back to Home
      </Link>
    </section>
  );
}
