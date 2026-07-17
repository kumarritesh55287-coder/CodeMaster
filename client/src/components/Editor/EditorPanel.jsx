import { useState } from 'react';
import { submitCode } from '../../services/api/submissionsAPI.js';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Button from '../Button/Button';
import AIPanel from '../AIPanel/AIPanel';
import Loader from '../Loader/Loader';

const starterCode = {
  javascript: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}
`,
  python: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
`,
  cpp: `#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    for (int i = 0; i < nums.size(); i++) {
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[i] + nums[j] == target) {
                return {i, j};
            }
        }
    }
    return {};
}
`
};

export default function EditorPanel({ problem }) {
  const [code, setCode] = useState(starterCode.javascript);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('Write your solution to see AI suggestions.');
  const [notes, setNotes] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  function handleLanguageChange(selected) {
    setLanguage(selected);
    setCode(starterCode[selected] || '');
    setOutput('Language switched. Code template loaded.');
    setNotes([]);
  }

  async function handleRun() {
    setIsAnalyzing(true);
    setOutput('Sending code to AI analysis...');
    
    const result = await submitCode(code, language, problem?.id || '1');
    
    if (result.success && result.feedback) {
      setNotes(result.feedback.suggestions);
      setOutput(`✓ Analysis complete. ${result.feedback.summary}`);
    } else {
      setOutput('Error analyzing code. Please try again.');
    }
    
    setIsAnalyzing(false);
  }

  return (
    <section className="section-card code-section" id="ai-panel">
      <div className="section-header">
        <div>
          <h2>{problem.title}</h2>
          <p>{problem.short}</p>
        </div>
        <LanguageSelector value={language} onChange={handleLanguageChange} />
      </div>

      <div className="editor-grid">
        <div className="editor-pane">
          <div className="editor-toolbar">
            <span>Code editor</span>
            <Button onClick={handleRun}>Analyze with AI</Button>
          </div>
          <textarea
            className="code-input"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            rows={18}
          />
          <div className="output-box">
            <strong>Output</strong>
            <div>{output}</div>
          </div>
          {isAnalyzing && <Loader />}
        </div>

        <AIPanel suggestions={notes} language={language} />
      </div>
    </section>
  );
}
