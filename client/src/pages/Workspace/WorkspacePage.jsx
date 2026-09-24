import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Editor from '@monaco-editor/react'
import {
  Play, Send, CheckCircle2, XCircle, Clock, RotateCcw,
  Lightbulb, Bot, FileText, RefreshCw, ArrowLeft,
  AlertTriangle, Maximize2, Minimize2, Type, Copy, Check,
  ChevronDown, ChevronUp, Sparkles, Terminal, Sliders
} from 'lucide-react'
import { MOCK_PROBLEMS } from '../../data/problemsData'
import { SUPPORTED_LANGUAGES, LANGUAGE_OPTIONS } from '../../config/languages'
import { runCodeApi, submitCodeApi } from '../../services/codeService'

export default function WorkspacePage() {
  const { slug } = useParams()
  
  // Find target problem or default to Two Sum
  const problem = MOCK_PROBLEMS.find(p => p.slug === slug) || MOCK_PROBLEMS[0]
  
  // State variables
  const [selectedLang, setSelectedLang] = useState('cpp') // Default to C++ as requested
  const [code, setCode] = useState('')
  const [customInput, setCustomInput] = useState('10 20')
  const [fontSize, setFontSize] = useState(14)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Layout tabs
  const [activeTab, setActiveTab] = useState('description') // description | editorial | submissions
  const [activeBottomTab, setActiveBottomTab] = useState('input') // input | output | errors | testresults
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false)
  
  // Execution status states
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [runResult, setRunResult] = useState(null)
  const [submitResult, setSubmitResult] = useState(null)
  
  // Submissions log state
  const [submissionHistory, setSubmissionHistory] = useState([
    {
      id: 1,
      status: 'Accepted',
      language: 'C++',
      runtime: '0.01 s',
      memory: '4.2 MB',
      date: '2 hours ago',
      code: problem.starterCode?.cpp || ''
    }
  ])

  // AI Assistant drawer state
  const [aiOpen, setAiOpen] = useState(false)
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'ai',
      text: `Hey there! 👋 I'm your **CodeMaster AI Coach** inspired by Victoreke design patterns. How can I help you tackle **${problem.title}**? Ask me for hints, time complexity analysis, or debugging assistance!`
    }
  ])
  const [aiInput, setAiInput] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  // Monaco editor reference for dynamic markers/formatting
  const editorRef = useRef(null)

  // Load code from LocalStorage or language starterCode on change
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
      setCode(SUPPORTED_LANGUAGES.cpp.starterCode)
    }
  }, [selectedLang, problem])

  // Save Code on edit
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

  // Copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Handle Monaco Editor Mounting
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
  }

  // RUN CODE with actual Judge0 Engine
  const handleRunCode = async () => {
    if (isRunning || isSubmitting) return
    setIsRunning(true)
    setRunResult(null)
    setIsConsoleCollapsed(false)

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
        stderr: err.message || 'Code execution service is temporarily unavailable.',
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

  // SUBMIT CODE with actual Judge0 Engine against test cases
  const handleSubmitCode = async () => {
    if (isRunning || isSubmitting) return
    setIsSubmitting(true)
    setSubmitResult(null)
    setIsConsoleCollapsed(false)
    setActiveBottomTab('testresults')

    try {
      const data = await submitCodeApi(problem.slug, selectedLang, code)
      setSubmitResult(data)

      // Add to submission history
      setSubmissionHistory(prev => [
        {
          id: Date.now(),
          status: data.verdict || 'Accepted',
          language: SUPPORTED_LANGUAGES[selectedLang]?.name || selectedLang,
          runtime: data.runtime || '0.01 s',
          memory: data.memory || '4.0 MB',
          date: 'Just now',
          code: code
        },
        ...prev
      ])
    } catch (err) {
      setSubmitResult({
        verdict: 'Runtime Error',
        status: 'Runtime Error',
        runtime: 'N/A',
        memory: 'N/A',
        passedCount: 0,
        totalCount: 3,
        testResults: [
          {
            caseNum: 1,
            input: 'Default Test Case',
            expected: 'Expected Result',
            actual: err.message || 'Submission evaluation failed.',
            passed: false
          }
        ]
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // AI Chat submission handler
  const handleAiSend = (e) => {
    e?.preventDefault()
    if (!aiInput.trim()) return

    const userText = aiInput
    setAiMessages(prev => [...prev, { role: 'user', text: userText }])
    setAiInput('')
    setAiLoading(true)

    setTimeout(() => {
      let reply = `For **${problem.title}**, make sure to analyze edge cases like negative numbers and array bounds.`
      const query = userText.toLowerCase()

      if (query.includes('hint')) {
        reply = `💡 **Hint:** ${problem.hints?.[0] || 'Use a Hash Map to store values and their indices for O(1) lookup.'}`
      } else if (query.includes('complexity') || query.includes('big o')) {
        reply = `⚡ **Time Complexity Target:** O(N) single pass hash table.\n💾 **Space Complexity Target:** O(N) for storing elements.`
      } else if (query.includes('c++') || query.includes('cpp')) {
        reply = `💻 **C++ Tip:** Include \`<unordered_map>\` and use \`unordered_map<int, int> mp;\` for fast O(1) lookups!`
      } else if (query.includes('error') || query.includes('bug')) {
        reply = `🔍 **Debugging Check:** Ensure standard input parsing matches expected array format, and return indices 0-indexed.`
      }

      setAiMessages(prev => [...prev, { role: 'ai', text: reply }])
      setAiLoading(false)
    }, 500)
  }

  const currentMonacoLang = SUPPORTED_LANGUAGES[selectedLang]?.monacoLang || 'cpp'

  return (
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'} bg-[#09090b] text-zinc-100 font-sans overflow-hidden select-none`}>
      
      {/* ── TOP HEADER NAVBAR (VICTOREKE STYLE) ────────────────────────────────── */}
      <header className="h-14 bg-[#121215] border-b border-zinc-800/80 flex items-center justify-between px-4 z-20 shadow-md">
        
        {/* Left: Back Link & Problem Info */}
        <div className="flex items-center gap-3">
          <Link
            to="/problems"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700/60 hover:bg-zinc-700/60 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Problems</span>
          </Link>

          <span className="w-px h-5 bg-zinc-800" />

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-[320px]">{problem.title}</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold border ${
              problem.difficulty === 'Easy'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : problem.difficulty === 'Medium'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* Center: Action Buttons (Run / Submit) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-emerald-400 hover:text-emerald-300 border border-zinc-700 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            title="Run Code with Custom Input (Ctrl+Enter)"
          >
            {isRunning ? (
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            ) : (
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            )}
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          <button
            onClick={handleSubmitCode}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-all shadow-md shadow-emerald-950/40 active:scale-95 disabled:opacity-50"
            title="Submit Solution for Evaluation"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{isSubmitting ? 'Evaluating...' : 'Submit'}</span>
          </button>
        </div>

        {/* Right: AI Coach & Layout Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAiOpen(!aiOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              aiOpen
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10'
                : 'bg-zinc-800/60 text-zinc-300 border-zinc-700/60 hover:bg-zinc-700/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">AI Coach</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Editor"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── MAIN WORKSPACE CONTENT AREA (DESKTOP SPLIT / MOBILE STACKED) ────────────── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* ── LEFT PANEL: PROBLEM DESCRIPTION & EDITORIAL ──────────────────────── */}
        <div className="w-full md:w-[45%] flex flex-col bg-[#0d1117] border-r border-zinc-800/80 overflow-hidden">
          
          {/* Navigation Tabs */}
          <div className="h-10 bg-[#161b22] border-b border-zinc-800 flex items-center px-3 gap-1 text-xs font-medium text-zinc-400">
            <button
              onClick={() => setActiveTab('description')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-all ${
                activeTab === 'description'
                  ? 'bg-[#21262d] text-white font-bold border-b-2 border-emerald-400 shadow-sm'
                  : 'hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Description</span>
            </button>

            <button
              onClick={() => setActiveTab('editorial')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-all ${
                activeTab === 'editorial'
                  ? 'bg-[#21262d] text-white font-bold border-b-2 border-amber-400 shadow-sm'
                  : 'hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Editorial</span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-all ${
                activeTab === 'submissions'
                  ? 'bg-[#21262d] text-white font-bold border-b-2 border-blue-400 shadow-sm'
                  : 'hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Submissions ({submissionHistory.length})</span>
            </button>
          </div>

          {/* Tab Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-zinc-300 text-sm leading-relaxed custom-scrollbar">
            
            {/* TAB 1: PROBLEM DESCRIPTION */}
            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-extrabold text-white mb-2 tracking-tight">{problem.title}</h1>
                  <div className="flex items-center gap-3 flex-wrap text-xs">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold border ${
                      problem.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : problem.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-zinc-400">Acceptance Rate: <strong className="text-zinc-200">{problem.acceptance}</strong></span>
                    <span className="text-zinc-400">Category: <strong className="text-zinc-200">{problem.category}</strong></span>
                  </div>
                </div>

                {/* Company Pills */}
                {problem.companies && problem.companies.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Asked by:</span>
                    {problem.companies.map(c => (
                      <span key={c} className="px-2.5 py-0.5 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-[11px] font-semibold text-zinc-200">
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description Text */}
                <div className="text-zinc-300 leading-relaxed space-y-3 font-normal text-sm bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/60">
                  <p className="whitespace-pre-line">{problem.description}</p>
                </div>

                {/* Test Examples */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Examples</h3>
                  {problem.examples?.map((ex, idx) => (
                    <div key={idx} className="bg-[#161b22] border border-zinc-800 rounded-xl p-4 space-y-2.5 shadow-sm">
                      <div className="font-bold text-xs text-emerald-400">Example {idx + 1}:</div>
                      <div className="font-mono text-xs bg-[#0d1117] p-3 rounded-lg border border-zinc-800 text-zinc-200">
                        <span className="text-zinc-500">Input: </span>
                        <span className="text-white font-semibold">{ex.input}</span>
                      </div>
                      <div className="font-mono text-xs bg-[#0d1117] p-3 rounded-lg border border-zinc-800 text-zinc-200">
                        <span className="text-zinc-500">Output: </span>
                        <span className="text-emerald-400 font-semibold">{ex.output}</span>
                      </div>
                      {ex.explanation && (
                        <p className="text-xs text-zinc-400 italic pt-1">Explanation: {ex.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Constraints</h3>
                  <ul className="list-disc pl-5 space-y-1.5 font-mono text-xs text-zinc-300">
                    {problem.constraints?.map((c, i) => (
                      <li key={i} className="marker:text-emerald-400">{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: EDITORIAL */}
            {activeTab === 'editorial' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <span>Optimal Solution Editorial</span>
                </h2>
                <div className="bg-[#161b22] border border-zinc-800 text-zinc-200 rounded-xl p-5 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                  {problem.solutionExplanation || `To solve ${problem.title} in optimal O(N) time:\n\n1. Initialize a Hash Map to keep track of seen numbers and their array indices.\n2. Iterate through each element in the input array.\n3. Compute complement = target - current_number.\n4. Check if complement exists in Hash Map. If found, return [map[complement], current_index].\n5. Otherwise, insert current_number -> index into Hash Map.`}
                </div>
              </div>
            )}

            {/* TAB 3: SUBMISSIONS HISTORY */}
            {activeTab === 'submissions' && (
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Submission Records</h2>
                {submissionHistory.map((sub) => (
                  <div key={sub.id} className="bg-[#161b22] border border-zinc-800 rounded-xl p-4 space-y-2 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {sub.status === 'Accepted' ? (
                          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Accepted</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>{sub.status}</span>
                          </span>
                        )}
                        <span className="text-xs font-semibold text-zinc-400">{sub.language}</span>
                      </div>
                      <span className="text-xs text-zinc-500">{sub.date}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
                      <span>Runtime: <strong className="text-zinc-200">{sub.runtime}</strong></span>
                      <span>Memory: <strong className="text-zinc-200">{sub.memory}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL: MONACO EDITOR & CONSOLE ────────────────────────────── */}
        <div className="w-full md:w-[55%] flex flex-col bg-[#09090b] text-zinc-100 overflow-hidden">
          
          {/* Editor Control Toolbar */}
          <div className="h-10 bg-[#161b22] border-b border-zinc-800 flex items-center justify-between px-3 z-10">
            {/* Language Selector Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={selectedLang}
                onChange={handleLangChange}
                className="bg-[#21262d] border border-zinc-700/80 text-xs text-white font-bold rounded-lg px-3 py-1 focus:outline-none focus:border-emerald-400 cursor-pointer shadow-sm"
              >
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>

              {/* Font Size Selector */}
              <div className="flex items-center gap-1 bg-[#21262d] border border-zinc-700/80 rounded-lg px-2 py-0.5 text-xs text-zinc-300">
                <Type className="w-3 h-3 text-zinc-400" />
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="bg-transparent text-xs font-semibold text-zinc-200 focus:outline-none cursor-pointer"
                >
                  <option value={12} className="bg-[#21262d]">12px</option>
                  <option value={14} className="bg-[#21262d]">14px</option>
                  <option value={16} className="bg-[#21262d]">16px</option>
                  <option value={18} className="bg-[#21262d]">18px</option>
                </select>
              </div>
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Copy Code"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={handleResetCode}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Reset Starter Code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* MONACO EDITOR CONTAINER */}
          <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden">
            <Editor
              height="100%"
              language={currentMonacoLang}
              value={code}
              onChange={handleCodeChange}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                fontSize: fontSize,
                fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
                lineNumbers: 'on',
                minimap: { enabled: false },
                automaticLayout: true,
                autoIndent: 'full',
                bracketPairColorization: { enabled: true },
                cursorBlinking: 'smooth',
                folding: true,
                formatOnType: true,
                formatOnPaste: true,
                scrollBeyondLastLine: false,
                tabSize: 2,
                wordWrap: 'on',
                smoothScrolling: true
              }}
            />
          </div>

          {/* ── BOTTOM CONSOLE PANEL (INPUT / OUTPUT / ERRORS / TEST RESULTS) ─── */}
          <div className={`transition-all duration-200 border-t border-zinc-800 bg-[#0d1117] flex flex-col ${isConsoleCollapsed ? 'h-9' : 'h-60'}`}>
            
            {/* Console Tab Header Bar */}
            <div className="h-9 bg-[#161b22] border-b border-zinc-800 flex items-center justify-between px-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setActiveBottomTab('input'); setIsConsoleCollapsed(false); }}
                  className={`text-xs font-bold px-3 py-1 rounded-md transition-all ${
                    activeBottomTab === 'input' && !isConsoleCollapsed
                      ? 'bg-[#21262d] text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Custom Input (stdin)
                </button>

                <button
                  onClick={() => { setActiveBottomTab('output'); setIsConsoleCollapsed(false); }}
                  className={`text-xs font-bold px-3 py-1 rounded-md transition-all ${
                    activeBottomTab === 'output' && !isConsoleCollapsed
                      ? 'bg-[#21262d] text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Output
                </button>

                <button
                  onClick={() => { setActiveBottomTab('errors'); setIsConsoleCollapsed(false); }}
                  className={`text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
                    activeBottomTab === 'errors' && !isConsoleCollapsed
                      ? 'bg-[#21262d] text-rose-400 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>Errors</span>
                  {runResult && (runResult.stderr || runResult.compile_output) && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  )}
                </button>

                <button
                  onClick={() => { setActiveBottomTab('testresults'); setIsConsoleCollapsed(false); }}
                  className={`text-xs font-bold px-3 py-1 rounded-md flex items-center gap-1.5 transition-all ${
                    activeBottomTab === 'testresults' && !isConsoleCollapsed
                      ? 'bg-[#21262d] text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span>Test Results</span>
                  {submitResult && (
                    <span className={`w-2 h-2 rounded-full ${submitResult.verdict === 'Accepted' ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                  )}
                </button>
              </div>

              {/* Execution Metrics & Collapse Toggle */}
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                {(runResult || submitResult) && (
                  <div className="hidden sm:flex items-center gap-3">
                    <span>Time: <strong className="text-emerald-400">{runResult?.time || submitResult?.runtime || '0.01 s'}</strong></span>
                    <span>Memory: <strong className="text-emerald-400">{runResult?.memory || submitResult?.memory || '4.0 MB'}</strong></span>
                  </div>
                )}

                <button
                  onClick={() => setIsConsoleCollapsed(!isConsoleCollapsed)}
                  className="p-1 text-zinc-400 hover:text-white"
                  title={isConsoleCollapsed ? "Expand Console" : "Collapse Console"}
                >
                  {isConsoleCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Console Body Content Area */}
            {!isConsoleCollapsed && (
              <div className="flex-1 overflow-y-auto p-4 font-mono text-xs bg-[#0d1117] text-zinc-200 custom-scrollbar">
                
                {/* TAB 1: CUSTOM INPUT STDIN */}
                {activeBottomTab === 'input' && (
                  <div className="space-y-2 h-full flex flex-col">
                    <div className="text-zinc-400 text-[11px] font-bold uppercase tracking-wider">Standard Input (stdin):</div>
                    <textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Enter arguments/inputs for code execution..."
                      className="w-full flex-1 p-3 bg-[#161b22] border border-zinc-800 rounded-xl text-xs font-mono text-zinc-100 focus:outline-none focus:border-emerald-500/60 resize-none shadow-inner"
                    />
                  </div>
                )}

                {/* TAB 2: OUTPUT STDOUT */}
                {activeBottomTab === 'output' && (
                  <div className="space-y-2">
                    <div className="text-zinc-400 text-[11px] font-bold uppercase tracking-wider">Standard Output (stdout):</div>
                    {!runResult ? (
                      <div className="text-zinc-500 italic py-4">Click "Run" to execute your program with custom input.</div>
                    ) : (
                      <pre className="p-4 bg-[#161b22] border border-zinc-800 rounded-xl text-xs text-zinc-100 font-mono whitespace-pre-wrap leading-relaxed">
                        {runResult.stdout || (runResult.stderr ? 'Program produced errors. Check the Errors tab.' : 'Program output is empty.')}
                      </pre>
                    )}
                  </div>
                )}

                {/* TAB 3: ERRORS STDERR / COMPILE OUTPUT */}
                {activeBottomTab === 'errors' && (
                  <div className="space-y-2">
                    <div className="text-rose-400 text-[11px] font-bold uppercase tracking-wider">Compilation & Runtime Errors:</div>
                    {!runResult || (!runResult.stderr && !runResult.compile_output) ? (
                      <div className="text-emerald-400 font-bold flex items-center gap-2 py-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>No compilation or runtime errors detected.</span>
                      </div>
                    ) : (
                      <pre className="p-4 bg-rose-950/30 border border-rose-800/60 text-rose-300 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed">
                        {runResult.compile_output || runResult.stderr}
                      </pre>
                    )}
                  </div>
                )}

                {/* TAB 4: TEST RESULTS VERDICT */}
                {activeBottomTab === 'testresults' && (
                  <div>
                    {!submitResult ? (
                      <div className="flex items-center justify-center h-28 text-zinc-500 font-bold">
                        Click "Submit" to run your solution against predefined problem test cases.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        
                        {/* Verdict Summary Bar */}
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                          <div className="flex items-center gap-2">
                            {submitResult.verdict === 'Accepted' ? (
                              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Accepted</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm bg-rose-500/10 px-3 py-1 rounded-lg border border-rose-500/30">
                                <XCircle className="w-5 h-5" />
                                <span>{submitResult.verdict}</span>
                              </div>
                            )}
                          </div>

                          <div className="text-xs text-zinc-400 font-bold">
                            Passed: <strong className="text-white">{submitResult.passedCount} / {submitResult.totalCount}</strong>
                          </div>
                        </div>

                        {/* Test Cases Breakdown */}
                        <div className="space-y-2.5">
                          {submitResult.testResults?.map((tr, idx) => (
                            <div key={idx} className="bg-[#161b22] p-3 rounded-xl border border-zinc-800 flex items-center justify-between text-xs">
                              <span className="text-zinc-200 font-bold">Test Case {tr.caseNum}:</span>
                              <div className="flex items-center gap-4">
                                <span className="text-zinc-400">Actual: <span className="text-zinc-100 font-mono">{tr.actual}</span></span>
                                <span className="text-zinc-400">Expected: <span className="text-emerald-400 font-mono">{tr.expected}</span></span>
                                <span className={tr.passed ? 'text-emerald-400 font-extrabold' : 'text-rose-400 font-extrabold'}>
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
            )}
          </div>
        </div>

        {/* ── AI TUTOR COACH SLIDE-OUT DRAWER ───────────────────────────────────── */}
        <AnimatePresence>
          {aiOpen && (
            <motion.div
              initial={{ x: 340, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 340, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 md:w-96 bg-[#121215] border-l border-zinc-800 flex flex-col z-30 shadow-2xl"
            >
              {/* AI Header */}
              <div className="h-12 bg-[#161b22] border-b border-zinc-800 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-extrabold text-white">CodeMaster AI Coach</span>
                </div>
                <button
                  onClick={() => setAiOpen(false)}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-[#0d1117] custom-scrollbar">
                {aiMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl leading-relaxed font-normal ${
                      m.role === 'user'
                        ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30 ml-6'
                        : 'bg-[#161b22] text-zinc-200 border border-zinc-800 mr-6 shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
                {aiLoading && (
                  <div className="p-3 bg-[#161b22] rounded-xl text-zinc-400 italic animate-pulse border border-zinc-800">
                    AI Coach is generating advice...
                  </div>
                )}
              </div>

              {/* AI Input Box */}
              <form onSubmit={handleAiSend} className="p-3 border-t border-zinc-800 flex gap-2 bg-[#161b22]">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask for hints or debug code..."
                  className="flex-1 bg-[#0d1117] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-3 py-2 rounded-lg text-xs transition-colors shadow-sm"
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
