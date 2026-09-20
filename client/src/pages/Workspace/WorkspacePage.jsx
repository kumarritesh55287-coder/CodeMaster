import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Editor from '@monaco-editor/react'
import {
  Code2, Play, Send, CheckCircle2, XCircle, Clock, RotateCcw,
  Lightbulb, Bot, Terminal, FileText, Zap, RefreshCw, ArrowLeft,
  AlertTriangle, Cpu, Layers, HelpCircle
} from 'lucide-react'
import { MOCK_PROBLEMS } from '../../data/problemsData'
import { SUPPORTED_LANGUAGES, LANGUAGE_OPTIONS } from '../../config/languages'
import { runCodeApi, submitCodeApi } from '../../services/codeService'

export default function WorkspacePage() {
  const { slug } = useParams()
  
  // Find current problem or fallback to first
  const problem = MOCK_PROBLEMS.find(p => p.slug === slug) || MOCK_PROBLEMS[0]
  
  const [selectedLang, setSelectedLang] = useState('javascript')
  const [code, setCode] = useState('')
  const [customInput, setCustomInput] = useState('')
  
  const [activeTab, setActiveTab] = useState('description') // description | editorial | submissions
  const [activeBottomTab, setActiveBottomTab] = useState('input') // input | output | errors | testresults
  
  // Test execution state
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [runResult, setRunResult] = useState(null)
  const [submitResult, setSubmitResult] = useState(null)
  
  // Custom testcase state
  const [activeTestCaseIdx, setActiveTestCaseIdx] = useState(0)
  
  // AI Tutor Assistant state
  const [aiOpen, setAiOpen] = useState(false)
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'ai',
      text: `Hello! I am your **CodeMaster AI Coach**. How can I help you solve **${problem.title}** today? I can explain the problem, suggest hints, or analyze complexity.`
    }
  ])
  const [aiInput, setAiInput] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  // Load code from LocalStorage or starterCode when problem or language changes
  useEffect(() => {
    const storageKey = `codemaster_${problem.slug}_${selectedLang}`
    const savedCode = localStorage.getItem(storageKey)

    if (savedCode) {
      setCode(savedCode)
    } else if (problem.starterCode?.[selectedLang]) {
      setCode(problem.starterCode[selectedLang])
    } else if (SUPPORTED_LANGUAGES[selectedLang]?.starterCode) {
      setCode(SUPPORTED_LANGUAGES[selectedLang].starterCode)
    } else {
      setCode('')
    }
  }, [selectedLang, problem])

  // Handle Code Change in Monaco Editor & persist to LocalStorage
  const handleCodeChange = (newCode) => {
    const val = newCode || ''
    setCode(val)
    const storageKey = `codemaster_${problem.slug}_${selectedLang}`
    localStorage.setItem(storageKey, val)
  }

  // Handle Language Switch
  const handleLangChange = (e) => {
    setSelectedLang(e.target.value)
  }

  // Reset Code to default starter template
  const handleResetCode = () => {
    const defaultCode = problem.starterCode?.[selectedLang] || SUPPORTED_LANGUAGES[selectedLang]?.starterCode || ''
    setCode(defaultCode)
    const storageKey = `codemaster_${problem.slug}_${selectedLang}`
    localStorage.removeItem(storageKey)
  }

  // Run code with custom input stdin via Judge0 API
  const handleRunCode = async () => {
    if (isRunning || isSubmitting) return
    setIsRunning(true)
    setRunResult(null)

    try {
      const data = await runCodeApi(selectedLang, code, customInput)
      setRunResult(data)

      if (data.stderr || data.compile_output) {
        setActiveBottomTab('errors')
      } else {
        setActiveBottomTab('output')
      }
    } catch (err) {
      setRunResult({
        stdout: '',
        stderr: err.message || 'Execution error occurred.',
        compile_output: '',
        status: 'Runtime Error',
        time: 'N/A',
        memory: 'N/A'
      })
      setActiveBottomTab('errors')
    } finally {
      setIsRunning(false)
    }
  }

  // Submit code for test case evaluation via Judge0 API
  const handleSubmitCode = async () => {
    if (isRunning || isSubmitting) return
    setIsSubmitting(true)
    setSubmitResult(null)
    setActiveBottomTab('testresults')

    try {
      const data = await submitCodeApi(problem.slug, selectedLang, code)
      setSubmitResult(data)
    } catch (err) {
      setSubmitResult({
        verdict: 'Runtime Error',
        status: 'Runtime Error',
        runtime: 'N/A',
        memory: 'N/A',
        passedCount: 0,
        totalCount: problem.testCases ? problem.testCases.length : 0,
        testResults: [
          {
            caseNum: 1,
            input: 'N/A',
            expected: 'N/A',
            actual: err.message || 'Submission evaluation failed.',
            passed: false
          }
        ]
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // AI Chat submission
  const handleAiSend = (e) => {
    e?.preventDefault()
    if (!aiInput.trim()) return

    const userText = aiInput
    setAiMessages(prev => [...prev, { role: 'user', text: userText }])
    setAiInput('')
    setAiLoading(true)

    setTimeout(() => {
      let reply = `For **${problem.title}**, consider using an optimal algorithmic pattern in ${SUPPORTED_LANGUAGES[selectedLang]?.name || 'JavaScript'}.`
      if (userText.toLowerCase().includes('hint')) {
        reply = `💡 **Hint:** ${problem.hints?.[0] || 'Try storing seen values in a Hash Map for O(1) lookup.'}`
      } else if (userText.toLowerCase().includes('bug') || userText.toLowerCase().includes('error')) {
        reply = `🐛 **Bug Check:** Check array bounds and zero index conditions.`
      } else if (userText.toLowerCase().includes('complexity')) {
        reply = `⚡ **Complexity Target:** Optimal Time: O(N), Optimal Space: O(N) or O(1).`
      }
      
      setAiMessages(prev => [...prev, { role: 'ai', text: reply }])
      setAiLoading(false)
    }, 600)
  }

  const currentMonacoLang = SUPPORTED_LANGUAGES[selectedLang]?.monacoLang || 'javascript'

  return (
    <div className="flex flex-col h-screen bg-white text-black overflow-hidden select-none">
      
      {/* ── TOP WORKSPACE TOOLBAR ────────────────────────────────────────────── */}
      <header className="h-12 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-4 z-20">
        
        {/* Left: Back & Problem Nav */}
        <div className="flex items-center gap-3">
          <Link
            to="/problems"
            className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-black px-2.5 py-1 rounded bg-white border border-slate-300 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Problem List</span>
          </Link>

          <span className="w-px h-4 bg-slate-300" />

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-black">{problem.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
              problem.difficulty === 'Easy' ? 'badge-easy' : problem.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* Center: Action Buttons (Run / Submit) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-xs font-bold text-black transition-colors border border-slate-300 disabled:opacity-50 shadow-sm"
          >
            {isRunning ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#ffa116]" />
            ) : (
              <Play className="w-3.5 h-3.5 text-[#00b8a3] fill-[#00b8a3]" />
            )}
            <span>{isRunning ? 'Executing...' : 'Run'}</span>
          </button>

          <button
            onClick={handleSubmitCode}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg bg-[#00b8a3] hover:bg-[#00a390] text-xs font-bold text-white transition-colors shadow-md shadow-[#00b8a3]/20 disabled:opacity-50"
          >
            {isSubmitting ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>{isSubmitting ? 'Evaluating...' : 'Submit'}</span>
          </button>
        </div>

        {/* Right: AI Coach */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAiOpen(!aiOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              aiOpen
                ? 'bg-[#ffa116] text-black shadow-sm'
                : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Coach</span>
          </button>
        </div>
      </header>

      {/* ── MAIN WORKSPACE CONTENT AREA (SPLIT SCREEN) ────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL: Problem Description, Editorial, Submissions */}
        <div className="w-1/2 flex flex-col bg-white border-r border-slate-200 text-black">
          
          {/* Navigation Tabs */}
          <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-2 gap-1 text-xs font-medium text-slate-700">
            <button
              onClick={() => setActiveTab('description')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded ${
                activeTab === 'description' ? 'bg-white text-black font-bold border-b-2 border-[#ffa116]' : 'hover:text-black'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#ffa116]" />
              <span>Description</span>
            </button>

            <button
              onClick={() => setActiveTab('editorial')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded ${
                activeTab === 'editorial' ? 'bg-white text-black font-bold border-b-2 border-[#ffa116]' : 'hover:text-black'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-yellow-600" />
              <span>Editorial</span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded ${
                activeTab === 'submissions' ? 'bg-white text-black font-bold border-b-2 border-[#ffa116]' : 'hover:text-black'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Submissions</span>
            </button>
          </div>

          {/* Left Panel Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-black text-sm bg-white">
            {activeTab === 'description' && (
              <div className="space-y-6">
                
                {/* Title & Metadata */}
                <div>
                  <h1 className="text-xl font-bold text-black mb-2">{problem.title}</h1>
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className={problem.difficulty === 'Easy' ? 'badge-easy' : 'badge-medium'}>
                      {problem.difficulty}
                    </span>
                    <span className="text-slate-700">Acceptance Rate: <strong className="text-black">{problem.acceptance}</strong></span>
                    <span className="text-slate-700">Category: <strong className="text-black">{problem.category}</strong></span>
                  </div>
                </div>

                {/* Company Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-slate-700 font-bold uppercase">Asked by:</span>
                  {problem.companies?.map(c => (
                    <span key={c} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs font-semibold text-black">
                      {c}
                    </span>
                  ))}
                </div>

                {/* Description Body */}
                <div className="max-w-none text-black leading-relaxed space-y-3 font-medium">
                  <p>{problem.description}</p>
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-black uppercase tracking-wider">Examples</h3>
                  {problem.examples?.map((ex, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-black">
                      <div className="font-bold text-xs text-black">Example {idx + 1}:</div>
                      <div className="font-mono text-xs bg-white p-2.5 rounded border border-slate-200 text-black">
                        <span className="text-slate-600">Input: </span>
                        <span className="text-black font-bold">{ex.input}</span>
                      </div>
                      <div className="font-mono text-xs bg-white p-2.5 rounded border border-slate-200 text-black">
                        <span className="text-slate-600">Output: </span>
                        <span className="text-black font-bold">{ex.output}</span>
                      </div>
                      {ex.explanation && (
                        <p className="text-xs text-slate-700 italic">Explanation: {ex.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-black uppercase tracking-wider">Constraints</h3>
                  <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-black font-medium">
                    {problem.constraints?.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'editorial' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-black">Solution Editorial</h2>
                <div className="bg-slate-50 border border-slate-200 text-black rounded-xl p-4 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                  {problem.solutionExplanation || 'No detailed editorial uploaded yet.'}
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="space-y-3">
                <h2 className="text-base font-bold text-black">Recent Submissions</h2>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00b8a3]" />
                    <span className="text-xs font-bold text-[#00b8a3]">Accepted</span>
                  </div>
                  <span className="text-xs font-mono text-slate-700 font-bold">Runtime: {submitResult?.runtime || '0.04 s'}</span>
                  <span className="text-xs text-slate-600">Just now</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Professional Monaco Code Editor & Console */}
        <div className="w-1/2 flex flex-col bg-white text-black">
          
          {/* Editor Header Bar (Language Selector & Tools) */}
          <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <select
                value={selectedLang}
                onChange={handleLangChange}
                className="bg-white border border-slate-300 text-xs text-black font-bold rounded px-2.5 py-1 focus:outline-none focus:border-[#ffa116] shadow-sm cursor-pointer"
              >
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                className="p-1 rounded text-slate-600 hover:text-black hover:bg-slate-200 transition-colors"
                title="Reset Code to Starter Template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* MONACO CODE EDITOR AREA */}
          <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden">
            <Editor
              height="100%"
              language={currentMonacoLang}
              value={code}
              onChange={handleCodeChange}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
                lineNumbers: 'on',
                minimap: { enabled: true },
                automaticLayout: true,
                autoIndent: 'full',
                bracketPairColorization: { enabled: true },
                colorDecorators: true,
                cursorBlinking: 'smooth',
                folding: true,
                formatOnType: true,
                formatOnPaste: true,
                scrollBeyondLastLine: false,
                tabSize: 2,
                wordWrap: 'on'
              }}
            />
          </div>

          {/* BOTTOM CONSOLE PANEL: Custom Input / Output / Errors / Test Results */}
          <div className="h-56 bg-white border-t border-slate-200 flex flex-col text-black">
            
            {/* Console Header Bar */}
            <div className="h-9 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveBottomTab('input')}
                  className={`text-xs font-bold px-3 py-1 rounded transition-colors ${
                    activeBottomTab === 'input' ? 'bg-white text-black shadow-sm' : 'text-slate-600 hover:text-black'
                  }`}
                >
                  Custom Input
                </button>
                <button
                  onClick={() => setActiveBottomTab('output')}
                  className={`text-xs font-bold px-3 py-1 rounded transition-colors ${
                    activeBottomTab === 'output' ? 'bg-white text-black shadow-sm' : 'text-slate-600 hover:text-black'
                  }`}
                >
                  Output
                </button>
                <button
                  onClick={() => setActiveBottomTab('errors')}
                  className={`text-xs font-bold px-3 py-1 rounded flex items-center gap-1 transition-colors ${
                    activeBottomTab === 'errors' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-600 hover:text-black'
                  }`}
                >
                  <span>Errors</span>
                  {runResult && (runResult.stderr || runResult.compile_output) && (
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  )}
                </button>
                <button
                  onClick={() => setActiveBottomTab('testresults')}
                  className={`text-xs font-bold px-3 py-1 rounded flex items-center gap-1 transition-colors ${
                    activeBottomTab === 'testresults' ? 'bg-white text-black shadow-sm' : 'text-slate-600 hover:text-black'
                  }`}
                >
                  <span>Test Results</span>
                  {submitResult && (
                    <span className={`w-2 h-2 rounded-full ${submitResult.verdict === 'Accepted' ? 'bg-[#00b8a3]' : 'bg-red-500'}`} />
                  )}
                </button>
              </div>

              {/* Execution Info Stats */}
              {(runResult || submitResult) && (
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-700">
                  <span>Runtime: <strong className="text-black">{runResult?.time || submitResult?.runtime || '0.04 s'}</strong></span>
                  <span>Memory: <strong className="text-black">{runResult?.memory || submitResult?.memory || '4.0 MB'}</strong></span>
                </div>
              )}
            </div>

            {/* Console Body */}
            <div className="flex-1 overflow-y-auto p-4 text-xs font-mono bg-white text-black">
              
              {/* TAB 1: CUSTOM INPUT STDIN */}
              {activeBottomTab === 'input' && (
                <div className="space-y-2 h-full flex flex-col">
                  <div className="text-slate-600 font-bold">Standard Input (stdin):</div>
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter custom input arguments for your code execution..."
                    className="w-full flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono text-black focus:outline-none focus:border-[#ffa116] resize-none"
                  />
                </div>
              )}

              {/* TAB 2: OUTPUT STDOUT */}
              {activeBottomTab === 'output' && (
                <div className="space-y-2">
                  <div className="text-slate-600 font-bold">Standard Output (stdout):</div>
                  {!runResult ? (
                    <div className="text-slate-400 italic">Click "Run" to view execution stdout output.</div>
                  ) : (
                    <pre className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-black font-mono whitespace-pre-wrap">
                      {runResult.stdout || 'Program output is empty.'}
                    </pre>
                  )}
                </div>
              )}

              {/* TAB 3: ERRORS STDERR / COMPILE OUTPUT */}
              {activeBottomTab === 'errors' && (
                <div className="space-y-2">
                  <div className="text-red-600 font-bold">Compiler / Runtime Errors:</div>
                  {!runResult || (!runResult.stderr && !runResult.compile_output) ? (
                    <div className="text-emerald-600 font-bold">✓ No compilation or runtime errors detected.</div>
                  ) : (
                    <pre className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs font-mono whitespace-pre-wrap">
                      {runResult.compile_output || runResult.stderr}
                    </pre>
                  )}
                </div>
              )}

              {/* TAB 4: TEST RESULTS VERDICT */}
              {activeBottomTab === 'testresults' && (
                <div>
                  {!submitResult ? (
                    <div className="flex items-center justify-center h-28 text-slate-500 font-bold">
                      Click "Submit" to run your solution against problem test cases.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      
                      {/* Verdict Header */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div className="flex items-center gap-2">
                          {submitResult.verdict === 'Accepted' ? (
                            <div className="flex items-center gap-1.5 text-[#00b8a3] font-extrabold text-sm">
                              <CheckCircle2 className="w-5 h-5" />
                              <span>Accepted</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-red-600 font-extrabold text-sm">
                              <XCircle className="w-5 h-5" />
                              <span>{submitResult.verdict}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-xs text-slate-700 font-bold">
                          Passed: <strong className="text-black">{submitResult.passedCount} / {submitResult.totalCount}</strong>
                        </div>
                      </div>

                      {/* Test Case Cards */}
                      <div className="space-y-2">
                        {submitResult.testResults?.map((tr, idx) => (
                          <div key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-200 flex items-center justify-between text-black">
                            <span className="text-black font-bold">Test Case {tr.caseNum}:</span>
                            <div className="flex items-center gap-4">
                              <span className="text-slate-600">Actual: <span className="text-black font-bold">{tr.actual}</span></span>
                              <span className="text-slate-600">Expected: <span className="text-black font-bold">{tr.expected}</span></span>
                              <span className={tr.passed ? 'text-[#00b8a3] font-extrabold' : 'text-red-600 font-extrabold'}>
                                {tr.passed ? '✓ PASS' : '✗ FAIL'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SLIDE-OUT AI TUTOR ASSISTANT DRAWER */}
        <AnimatePresence>
          {aiOpen && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-80 bg-white border-l border-slate-200 flex flex-col z-30 text-black shadow-xl"
            >
              {/* AI Drawer Header */}
              <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#ffa116]" />
                  <span className="text-xs font-bold text-black">CodeMaster AI Coach</span>
                </div>
                <button onClick={() => setAiOpen(false)} className="text-slate-500 hover:text-black">
                  <XCircle className="w-4 h-4" />
                </button>
              </div>

              {/* AI Messages Feed */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs bg-white">
                {aiMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg leading-relaxed font-medium ${
                      m.role === 'user'
                        ? 'bg-amber-100 text-black border border-amber-300 ml-4'
                        : 'bg-slate-100 text-black border border-slate-200 mr-4'
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
                {aiLoading && (
                  <div className="p-2 bg-slate-100 rounded text-slate-600 italic animate-pulse">
                    AI Coach is analyzing...
                  </div>
                )}
              </div>

              {/* AI Input Form */}
              <form onSubmit={handleAiSend} className="p-3 border-t border-slate-200 flex gap-2 bg-slate-50">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask for hints or bug fix..."
                  className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-black focus:outline-none focus:border-[#ffa116]"
                />
                <button
                  type="submit"
                  className="bg-[#ffa116] text-black font-bold px-3 py-1.5 rounded text-xs hover:bg-[#ffb340]"
                >
                  Ask
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
