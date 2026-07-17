import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot, Code2, Play, Send, ChevronLeft, ChevronRight, CheckCircle2,
  Clock, Cpu, RotateCcw, Maximize2, Share2, Bookmark, BookmarkCheck,
  Lightbulb, Eye, EyeOff, ChevronDown, MessageSquare, FileText,
  TestTube2, Zap, X, Terminal, BookOpen, Star, ArrowRight
} from 'lucide-react'

// ─── Mock Data ───────────────────────────────────────────────────────────────
const mockProblem = {
  id: 1,
  title: 'Two Sum',
  difficulty: 'Easy',
  tags: ['Array', 'Hash Table'],
  companies: ['Google', 'Amazon', 'Meta'],
  acceptance: 47.3,
  description:
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
    },
  ],
  constraints: [
    '2 <= nums.length <= 10^4',
    '-10^9 <= nums[i] <= 10^9',
    '-10^9 <= target <= 10^9',
    'Only one valid answer exists.',
  ],
  hints: [
    'A really brute force way would be to search for all possible pairs of numbers but that would be too slow.',
    'Try to use the fact that the complement of a number to the target gives us the answer.',
  ],
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
}

const DEFAULT_CODE = `def twoSum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i`

const LANGUAGES = ['Python', 'C++', 'Java', 'JavaScript', 'Go']

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'user',
    text: 'Help me understand the approach',
    time: '2:41 PM',
  },
  {
    id: 2,
    role: 'ai',
    text: "Great question! For Two Sum, think about what data structure gives O(1) lookup. What if instead of checking every pair (O(n\u00b2)), you could store each number as you iterate and check if its complement already exists? \uD83E\uDD14",
    time: '2:41 PM',
  },
  {
    id: 3,
    role: 'user',
    text: 'Should I use a hashmap?',
    time: '2:42 PM',
  },
  {
    id: 4,
    role: 'ai',
    text: 'Exactly! \uD83C\uDFAF As you iterate through nums, store each number \u2192 index in a HashMap. For each number, check if (target - num) is already in the map. If yes, return both indices. Time: O(n), Space: O(n)',
    time: '2:42 PM',
  },
]

const QUICK_ACTIONS = [
  { label: 'Explain Problem', icon: FileText },
  { label: 'Show Approach', icon: Lightbulb },
  { label: 'Analyze Complexity', icon: Zap },
  { label: 'Find Bug', icon: Terminal },
  { label: 'Dry Run', icon: Play },
  { label: 'Generate Hints', icon: Star },
]

const AI_RESPONSES = {
  'Explain Problem':
    '\uD83D\uDCCB **Two Sum** asks you to find two indices in an array whose values sum to a target. Classic problem testing your ability to trade space for time. The key insight is moving from O(n\u00b2) brute force to O(n) using a hash map for instant lookups.',
  'Show Approach':
    '\uD83D\uDDFA\uFE0F **Optimal Approach \u2014 Hash Map:**\n1. Create an empty seen = {} map\n2. Iterate with index i and value num\n3. Compute complement = target - num\n4. If complement is in seen \u2192 return [seen[complement], i]\n5. Otherwise, store seen[num] = i\n\nThis gives you **O(n) time** and **O(n) space**.',
  'Analyze Complexity':
    '\u26A1 **Complexity Analysis:**\n\n**Time Complexity:** O(n)\n- We traverse the list once\n- Each hash map lookup is O(1) average\n\n**Space Complexity:** O(n)\n- In the worst case, we store all n elements in the hash map before finding the answer.',
  'Find Bug':
    "\uD83D\uDD0D **Code Review:** Your current solution looks correct! I don\u2019t see any bugs. The hash map approach is properly implemented. The early return when the complement is found is efficient and avoids using the same element twice. \u2705",
  'Dry Run':
    '\uD83C\uDFC3 **Dry Run** with nums = [2,7,11,15], target = 9:\n\ni=0: num=2, complement=7, seen={} \u2192 store seen[2]=0\ni=1: num=7, complement=2, seen={2:0} \u2192 FOUND! return [0,1]\n\nResult: [0, 1] \u2705',
  'Generate Hints':
    '\uD83D\uDCA1 **Progressive Hints:**\n\n**Hint 1:** What if you could look up any number in O(1) time?\n\n**Hint 2:** A dictionary/hashmap stores key-value pairs with O(1) average access.\n\n**Hint 3:** For each number x, you need target - x. Can you check if it was already seen?',
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const DiffBadge = ({ level }) => {
  const cls =
    level === 'Easy' ? 'badge-easy' : level === 'Medium' ? 'badge-medium' : 'badge-hard'
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>{level}</span>
  )
}

const CompanyPill = ({ name }) => (
  <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.10] text-slate-400 font-medium">
    {name}
  </span>
)

const TagPill = ({ label }) => (
  <span className="text-xs px-2.5 py-1 rounded-full bg-brand-600/15 border border-brand-500/25 text-brand-300 font-medium">
    {label}
  </span>
)

const CodeBlock = ({ children }) => (
  <pre className="bg-[#0d0d1a] border border-white/[0.08] rounded-xl p-4 font-mono text-sm text-slate-300 overflow-x-auto leading-relaxed">
    <code>{children}</code>
  </pre>
)

const ChatBubble = ({ msg, index }) => {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
          <Bot size={13} className="text-white" />
        </div>
      )}
      <div className="max-w-[85%]">
        <div
          className={`px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser ? 'chat-user' : 'chat-ai'
          }`}
        >
          {msg.text}
        </div>
        <p
          className={`text-[10px] text-slate-600 mt-1 ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {msg.time}
        </p>
      </div>
    </motion.div>
  )
}

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 8 }}
    className="flex items-center gap-2 mb-3"
  >
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
      <Bot size={13} className="text-white" />
    </div>
    <div className="chat-ai px-3.5 py-3 flex gap-1.5 items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          className="w-1.5 h-1.5 rounded-full bg-brand-400 block"
        />
      ))}
    </div>
  </motion.div>
)

const CodeEditor = ({ code, onChange }) => {
  const lines = code.split('\n')
  const textareaRef = useRef(null)
  const lineNumRef = useRef(null)

  const syncScroll = () => {
    if (lineNumRef.current && textareaRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  return (
    <div className="flex flex-1 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d0d1a]">
      <div
        ref={lineNumRef}
        className="select-none px-3 py-4 text-right text-slate-600 font-mono text-sm leading-relaxed overflow-hidden flex-shrink-0 bg-[#0a0a16] border-r border-white/[0.06]"
        style={{ minWidth: '3rem' }}
      >
        {lines.map((_, i) => (
          <div key={i} className="leading-[1.625rem]">
            {i + 1}
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        spellCheck={false}
        className="flex-1 bg-transparent text-slate-300 font-mono text-sm leading-[1.625rem] p-4 resize-none focus:outline-none caret-brand-400"
        style={{ tabSize: 4 }}
      />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WorkspacePage() {
  const { id } = useParams()
  const problem = mockProblem

  // Left panel state
  const [leftTab, setLeftTab] = useState('description')
  const [revealedHints, setRevealedHints] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)

  // Middle panel state
  const [language, setLanguage] = useState('Python')
  const [code, setCode] = useState(DEFAULT_CODE)
  const [langOpen, setLangOpen] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [runResult, setRunResult] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Right panel state
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [chatInput, setChatInput] = useState('')
  const [isAiThinking, setIsAiThinking] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isAiThinking])

  // Close lang dropdown on outside click
  useEffect(() => {
    if (!langOpen) return
    const handler = () => setLangOpen(false)
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [langOpen])

  const handleRun = () => {
    setIsRunning(true)
    setRunResult(null)
    setTimeout(() => {
      setIsRunning(false)
      setRunResult({ success: true })
    }, 1800)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccessModal(true)
    }, 2200)
  }

  const handleSendMessage = (overrideText) => {
    const trimmed = (overrideText || chatInput).trim()
    if (!trimmed || isAiThinking) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', text: trimmed, time: now },
    ])
    setChatInput('')
    setIsAiThinking(true)
    setTimeout(() => {
      const response =
        AI_RESPONSES[trimmed] ||
        "That's a great question! Let me think through the Two Sum approach with you. The key insight is using a hash map to achieve O(n) time complexity instead of the O(n\u00b2) brute force. Would you like me to walk through a specific part? \uD83E\uDDE0"
      setIsAiThinking(false)
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', text: response, time: now },
      ])
    }, 1500 + Math.random() * 800)
  }

  const revealNextHint = () => {
    if (revealedHints < problem.hints.length) {
      setRevealedHints((n) => n + 1)
    }
  }

  // ─── Left Panel Content ───────────────────────────────────────────────────
  const renderLeftContent = () => {
    if (leftTab === 'description') {
      return (
        <div className="space-y-6">
          <p className="text-slate-300 text-sm leading-relaxed">{problem.description}</p>

          <div className="space-y-4">
            {problem.examples.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-sm p-4 space-y-2"
              >
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Example {i + 1}
                </p>
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <span className="text-slate-500 text-xs font-mono font-semibold w-16 flex-shrink-0">
                      Input:
                    </span>
                    <code className="text-cyan-300 text-xs font-mono">{ex.input}</code>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 text-xs font-mono font-semibold w-16 flex-shrink-0">
                      Output:
                    </span>
                    <code className="text-emerald-300 text-xs font-mono">{ex.output}</code>
                  </div>
                  {ex.explanation && (
                    <div className="flex gap-2 mt-1">
                      <span className="text-slate-500 text-xs font-semibold w-16 flex-shrink-0">
                        Explain:
                      </span>
                      <p className="text-slate-400 text-xs">{ex.explanation}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Constraints
            </h4>
            <ul className="space-y-1.5">
              {problem.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-400 font-mono">
                  <span className="text-brand-400 mt-0.5">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((t) => (
                <TagPill key={t} label={t} />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Asked By
            </h4>
            <div className="flex flex-wrap gap-2">
              {problem.companies.map((c) => (
                <CompanyPill key={c} name={c} />
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (leftTab === 'hints') {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Lightbulb size={14} className="text-amber-400 flex-shrink-0" />
            <p className="text-xs text-amber-300">
              Hints are revealed one at a time to preserve the challenge.
            </p>
          </div>

          <AnimatePresence>
            {problem.hints.slice(0, revealedHints).map((hint, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="glass-sm p-4 overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-amber-400">{i + 1}</span>
                  </div>
                  <span className="text-xs font-semibold text-amber-400">Hint {i + 1}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{hint}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {revealedHints < problem.hints.length ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={revealNextHint}
              className="w-full py-3 rounded-xl border border-dashed border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/10 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Eye size={14} />
              Reveal Hint {revealedHints + 1}
            </motion.button>
          ) : (
            <div className="text-center py-3 text-xs text-slate-500">
              All hints revealed ✨
            </div>
          )}
        </div>
      )
    }

    if (leftTab === 'solutions') {
      return (
        <div className="space-y-5">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-600/10 border border-brand-500/20">
            <BookOpen size={14} className="text-brand-400 flex-shrink-0" />
            <p className="text-xs text-brand-300">
              Official editorial — understand the intuition before looking at code.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-2">
              Approach: Hash Map (One Pass)
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Instead of iterating through all pairs, we maintain a hash map that stores each
              element we&apos;ve already seen. For every new element, we compute its complement and
              check if it exists in the map — giving us O(1) lookup per element.
            </p>
          </div>

          <CodeBlock>{DEFAULT_CODE}</CodeBlock>

          <div className="grid grid-cols-2 gap-3">
            <div className="glass-sm p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Clock size={13} className="text-cyan-400" />
                <span className="text-xs text-slate-500 font-medium">Time</span>
              </div>
              <span className="text-lg font-bold text-cyan-400">{problem.timeComplexity}</span>
            </div>
            <div className="glass-sm p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Cpu size={13} className="text-brand-400" />
                <span className="text-xs text-slate-500 font-medium">Space</span>
              </div>
              <span className="text-lg font-bold text-brand-400">{problem.spaceComplexity}</span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center h-40 gap-3 text-slate-500">
        <MessageSquare size={32} className="opacity-30" />
        <p className="text-sm">Community discussions coming soon</p>
      </div>
    )
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className="flex overflow-hidden bg-[#030712]"
      style={{ height: 'calc(100vh - 65px)' }}
    >
      {/* ══════ LEFT PANEL ══════ */}
      <div className="w-[480px] flex-shrink-0 flex flex-col border-r border-white/[0.07] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/[0.07] flex-shrink-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs text-slate-600 font-mono">#{problem.id}</span>
                <DiffBadge level={problem.difficulty} />
              </div>
              <h1 className="text-lg font-bold text-white truncate">{problem.title}</h1>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0 mt-1">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setBookmarked((b) => !b)}
                className="btn-icon"
              >
                <AnimatePresence mode="wait">
                  {bookmarked ? (
                    <motion.div key="bk" initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                      <BookmarkCheck size={16} className="text-brand-400" />
                    </motion.div>
                  ) : (
                    <motion.div key="bu" initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                      <Bookmark size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              <button className="btn-icon">
                <Share2 size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={11} className="text-emerald-500" />
              {problem.acceptance}% Acceptance
            </span>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-white/[0.07] flex-shrink-0 overflow-x-auto no-scrollbar">
          {[
            { key: 'description', label: 'Description', icon: FileText },
            { key: 'hints', label: 'Hints', icon: Lightbulb },
            { key: 'solutions', label: 'Solutions', icon: BookOpen },
            { key: 'discuss', label: 'Discuss', icon: MessageSquare },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setLeftTab(key)}
              className={`relative flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors duration-150 flex-shrink-0 ${
                leftTab === key ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon size={13} />
              {label}
              {leftTab === key && (
                <motion.div
                  layoutId="leftTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={leftTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {renderLeftContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ══════ MIDDLE PANEL ══════ */}
      <div className="flex-1 flex flex-col overflow-hidden border-r border-white/[0.07] min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] flex-shrink-0 gap-3">
          {/* Language selector */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.10] text-sm text-white hover:bg-white/[0.08] transition-all duration-150"
            >
              <Code2 size={13} className="text-brand-400" />
              {language}
              <ChevronDown
                size={12}
                className={`text-slate-500 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-1.5 left-0 glass-sm py-1 z-20 min-w-[130px] shadow-2xl"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setLangOpen(false) }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors duration-100 flex items-center justify-between ${
                        lang === language
                          ? 'text-brand-300 bg-brand-600/15'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {lang}
                      {lang === language && <CheckCircle2 size={11} className="text-brand-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button onClick={() => setCode(DEFAULT_CODE)} className="btn-icon" title="Reset code">
              <RotateCcw size={15} />
            </button>
            <button className="btn-icon" title="Fullscreen">
              <Maximize2 size={15} />
            </button>
            <button className="btn-icon" title="Share">
              <Share2 size={15} />
            </button>
          </div>
        </div>

        {/* Editor + Results */}
        <div className="flex-1 flex flex-col overflow-hidden p-4 gap-3 min-h-0">
          <CodeEditor code={code} onChange={setCode} />

          {/* Test Cases / Run Results */}
          <div className="flex-shrink-0">
            <AnimatePresence mode="wait">
              {runResult ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="glass-sm p-4 space-y-3 overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal size={14} className="text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-400">Run Results</span>
                    </div>
                    <button
                      onClick={() => setRunResult(null)}
                      className="text-slate-600 hover:text-slate-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-5 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} className="text-cyan-400" />
                      Runtime: <strong className="text-cyan-300 ml-0.5">52ms</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Cpu size={11} className="text-brand-400" />
                      Memory: <strong className="text-brand-300 ml-0.5">17.2 MB</strong>
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[1, 2].map((n) => (
                      <motion.div
                        key={n}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: n * 0.12 }}
                        className="flex items-center gap-2 text-xs bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2"
                      >
                        <CheckCircle2 size={13} className="text-emerald-400" />
                        <span className="text-emerald-300 font-medium">
                          Test Case {n}: Passed
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="testcases"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-sm p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <TestTube2 size={14} className="text-slate-500" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Test Cases
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {problem.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="bg-[#0d0d1a] rounded-lg p-3 border border-white/[0.06] space-y-1"
                      >
                        <p className="text-[10px] text-slate-600 font-semibold uppercase">
                          Case {i + 1}
                        </p>
                        <p className="font-mono text-xs text-slate-400 truncate">{ex.input}</p>
                        <p className="font-mono text-xs text-emerald-400">→ {ex.output}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Zap size={11} className="text-brand-500" />
              Auto-saved
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/25 hover:border-cyan-500/50 transition-all duration-200 disabled:opacity-60"
              >
                {isRunning ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      className="inline-flex"
                    >
                      <RotateCcw size={13} />
                    </motion.span>
                    Running…
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    Run Code
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold hover:from-brand-500 hover:to-brand-400 transition-all duration-200 shadow-lg disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      className="inline-flex"
                    >
                      <RotateCcw size={13} />
                    </motion.span>
                    Submitting…
                  </>
                ) : (
                  <>
                    <Zap size={13} />
                    Submit
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ RIGHT PANEL — AI MENTOR ══════ */}
      <div className="w-[360px] flex-shrink-0 flex flex-col overflow-hidden">
        {/* AI Header */}
        <div className="px-4 py-4 border-b border-white/[0.07] flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 via-purple-600 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#030712] overflow-hidden">
                  <motion.span
                    animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-emerald-400"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI Mentor</p>
                <p className="text-[10px] text-emerald-400 font-medium">● Online</p>
              </div>
            </div>
            <button className="btn-icon">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-3 border-b border-white/[0.07] flex-shrink-0">
          <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider mb-2.5">
            Quick Actions
          </p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map(({ label, icon: Icon }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleSendMessage(label)}
                disabled={isAiThinking}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.10] text-[11px] text-slate-400 hover:text-white hover:bg-brand-600/15 hover:border-brand-500/30 transition-all duration-150 disabled:opacity-50"
              >
                <Icon size={10} />
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.map((msg, i) => (
            <ChatBubble key={msg.id} msg={msg} index={i} />
          ))}
          <AnimatePresence>{isAiThinking && <TypingIndicator />}</AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="px-4 py-3 border-t border-white/[0.07] flex-shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Ask the AI mentor…"
              rows={1}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.10] text-white placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/15 transition-all duration-200 leading-relaxed max-h-28 overflow-y-auto"
              style={{ scrollbarWidth: 'none' }}
            />
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleSendMessage()}
              disabled={!chatInput.trim() || isAiThinking}
              className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-lg hover:from-brand-500 hover:to-brand-400 transition-all duration-200 disabled:opacity-40"
            >
              <Send size={15} />
            </motion.button>
          </div>
          <p className="text-[10px] text-slate-700 mt-1.5 text-center">
            Shift+Enter for new line · Enter to send
          </p>
        </div>
      </div>

      {/* ══════ SUCCESS MODAL ══════ */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="glass gradient-border rounded-2xl p-8 max-w-md w-full mx-4 text-center relative overflow-hidden"
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-brand-600/5 pointer-events-none" />

              {/* Floating orbs */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [-20, -90 - i * 12],
                    x: [(i % 2 === 0 ? 1 : -1) * (i + 1) * 16],
                  }}
                  transition={{ duration: 1.6, delay: i * 0.08, ease: 'easeOut' }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full pointer-events-none"
                  style={{ background: i % 2 === 0 ? '#7c3aed' : '#06b6d4' }}
                />
              ))}

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
                className="text-6xl mb-5"
              >
                🎉
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-white mb-1"
              >
                Accepted!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-emerald-400 text-sm font-medium mb-6"
              >
                Your solution passed all test cases
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="grid grid-cols-2 gap-4 mb-6"
              >
                <div className="glass-sm p-4 rounded-xl">
                  <div className="flex items-center gap-1.5 justify-center mb-1">
                    <Clock size={13} className="text-cyan-400" />
                    <span className="text-xs text-slate-500">Runtime</span>
                  </div>
                  <p className="text-xl font-bold text-cyan-300">52ms</p>
                  <p className="text-xs text-slate-500 mt-0.5">beats 89%</p>
                </div>
                <div className="glass-sm p-4 rounded-xl">
                  <div className="flex items-center gap-1.5 justify-center mb-1">
                    <Cpu size={13} className="text-brand-400" />
                    <span className="text-xs text-slate-500">Memory</span>
                  </div>
                  <p className="text-xl font-bold text-brand-300">17.2 MB</p>
                  <p className="text-xs text-slate-500 mt-0.5">beats 76%</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-3"
              >
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/[0.10] text-slate-400 text-sm font-medium hover:bg-white/[0.05] transition-all duration-200"
                >
                  Back to Problem
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 btn-primary justify-center py-2.5 text-sm"
                >
                  Next Problem
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
