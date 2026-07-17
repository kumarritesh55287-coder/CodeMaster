import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/">Codemaster AI</Link>
      </div>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/workspace">Code</Link>
        <a href="#ai-panel">AI Panel</a>
      </nav>
    </header>
  );
}
