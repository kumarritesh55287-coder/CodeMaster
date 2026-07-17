export default function AIPanel({ suggestions, language }) {
  return (
    <aside className="ai-panel">
      <div className="panel-header">
        <h3>AI Assistant</h3>
        <p>Real-time hints and optimizations for {language} code.</p>
      </div>
      <div className="panel-body">
        {suggestions.length === 0 ? (
          <p>No problems detected yet. Type in the editor and press <strong>Analyze with AI</strong>.</p>
        ) : (
          suggestions.map((item, index) => (
            <div key={index} className="suggestion-card">
              <div className="suggestion-label">{item.type}</div>
              <p>{item.message}</p>
              {item.detail && <small>{item.detail}</small>}
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
