import { useState, useMemo, useEffect } from 'react';
import { fetchProblems, searchProblems } from '../../services/api/problemsAPI.js';
import EditorPanel from '../../components/Editor/EditorPanel';

export default function Workspace() {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState('1');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems().then((data) => {
      setProblems(data);
      if (data.length > 0) {
        setActiveId(data[0].id);
      }
      setLoading(false);
    });
  }, []);

  const filteredProblems = useMemo(() => {
    if (!search.trim()) return [];
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
    <div className="workspace-page">
      <div className="workspace-header">
        <div className="workspace-search-container">
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onFocus={() => search && setShowSuggestions(true)}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            className="workspace-search-input"
          />

          {showSuggestions && search.trim() && filteredProblems.length > 0 && (
            <div className="workspace-suggestions">
              {filteredProblems.map((problem) => (
                <button
                  key={problem.id}
                  className="workspace-suggestion-item"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setActiveId(problem.id);
                    setSearch(problem.title);
                    setShowSuggestions(false);
                  }}
                  type="button"
                >
                  <div>
                    <strong>{problem.title}</strong>
                    <p>{problem.summary}</p>
                  </div>
                  <span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                </button>
              ))}
            </div>
          )}

          {showSuggestions && search.trim() && filteredProblems.length === 0 && (
            <div className="workspace-suggestions">
              <div style={{ padding: '12px 16px', color: 'var(--muted)' }}>
                No questions found
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="workspace-content">
        <div className="workspace-left">
          <div className="problem-details-card">
            <div className="problem-details-header">
              <div>
                <span className={`difficulty difficulty-${activeProblem.difficulty.toLowerCase()}`}>{activeProblem.difficulty}</span>
                <h2>{activeProblem.title}</h2>
              </div>
            </div>

            <div className="problem-details-section">
              <h3>Problem Statement</h3>
              <p>{activeProblem.description}</p>
            </div>

            <div className="problem-details-section">
              <h3>Examples</h3>
              <div className="example-item">
                <p><strong>Example 1:</strong> nums = [2,7,11,15], target = 9</p>
                <p><strong>Output:</strong> [0,1]</p>
              </div>
              <div className="example-item">
                <p><strong>Example 2:</strong> nums = [3,2,4], target = 6</p>
                <p><strong>Output:</strong> [1,2]</p>
              </div>
            </div>

            <div className="problem-details-section">
              <h3>Constraints</h3>
              <ul>
                <li>2 ≤ nums.length ≤ 10<sup>4</sup></li>
                <li>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></li>
                <li>-10<sup>9</sup> ≤ target ≤ 10<sup>9</sup></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="workspace-right">
          <EditorPanel problem={activeProblem} />
        </div>
      </div>
    </div>
  );
}
