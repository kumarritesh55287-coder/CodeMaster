import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMockProblems } from '../../services/problemAPI';

export default function Problems() {
  const problems = getMockProblems();
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState(problems[0]?.id || '1');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredProblems = useMemo(() => {
    const keyword = search.toLowerCase();
    return problems.filter((problem) => {
      return (
        problem.title.toLowerCase().includes(keyword) ||
        problem.summary.toLowerCase().includes(keyword) ||
        problem.difficulty.toLowerCase().includes(keyword)
      );
    });
  }, [search, problems]);

  const activeProblem = problems.find((problem) => problem.id === activeId) || problems[0];

  return (
    <div className="problems-page">
      <section className="section-card">
        <div className="section-header">
          <div>
            <h1>Problems</h1>
            <p>Search questions, pick a problem, and start coding.</p>
          </div>
        </div>

        <div className="problems-layout">
          <aside className="problem-sidebar">
            <div className="problem-sidebar-header">
              <h3>All Questions</h3>
              <span>{problems.length} problems</span>
            </div>

            <div className="problem-search">
              <input
                type="text"
                placeholder="Search question"
                value={search}
                onFocus={() => setShowSuggestions(true)}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setShowSuggestions(true);
                }}
              />

              {showSuggestions && search && filteredProblems.length > 0 && (
                <div className="search-suggestions">
                  {filteredProblems.map((problem) => (
                    <button
                      key={problem.id}
                      className="suggestion-item"
                      onClick={() => {
                        setActiveId(problem.id);
                        setSearch(problem.title);
                        setShowSuggestions(false);
                      }}
                      type="button"
                    >
                      <span>{problem.title}</span>
                      <span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="problem-list">
              {problems.map((problem) => (
                <button
                  key={problem.id}
                  className={`problem-list-item ${activeProblem?.id === problem.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveId(problem.id);
                    setSearch(problem.title);
                    setShowSuggestions(false);
                  }}
                  type="button"
                >
                  <span className="problem-list-title">{problem.title}</span>
                  <span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="problem-main">
            {activeProblem ? (
              <>
                <div className="problem-hero">
                  <div>
                    <span className={`difficulty difficulty-${activeProblem.difficulty.toLowerCase()}`}>{activeProblem.difficulty}</span>
                    <h2>{activeProblem.title}</h2>
                    <p>{activeProblem.summary}</p>
                  </div>
                  <div className="problem-actions">
                    <Link className="button button-primary" to={`/problem/${activeProblem.id}`}>
                      Open Editor
                    </Link>
                  </div>
                </div>

                <div className="problem-description">
                  <h3>Problem Statement</h3>
                  <p>{activeProblem.description}</p>
                </div>

                <div className="problem-panel">
                  <div className="problem-panel-section">
                    <h4>Examples</h4>
                    <div className="example-box">
                      <p><strong>Example 1:</strong> nums = [2,7,11,15], target = 9</p>
                      <p><strong>Output:</strong> [0,1]</p>
                    </div>
                    <div className="example-box">
                      <p><strong>Example 2:</strong> nums = [3,2,4], target = 6</p>
                      <p><strong>Output:</strong> [1,2]</p>
                    </div>
                  </div>

                  <div className="problem-panel-section">
                    <h4>Constraints</h4>
                    <ul>
                      <li>2 ≤ nums.length ≤ 10^4</li>
                      <li>-10^9 ≤ nums[i] ≤ 10^9</li>
                      <li>-10^9 ≤ target ≤ 10^9</li>
                    </ul>
                  </div>
                </div>

                <div className="problem-meta">
                  <div className="meta-card">
                    <strong>Topic</strong>
                    <span>Array / Hashing</span>
                  </div>
                  <div className="meta-card">
                    <strong>Level</strong>
                    <span>{activeProblem.difficulty}</span>
                  </div>
                  <div className="meta-card">
                    <strong>Mode</strong>
                    <span>Practice</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="problem-empty">No problem found. Try another search.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
