import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, Sparkles, Code2, Lightbulb, BarChart2, Zap, BookOpen, GitBranch, Play, X, Globe, Cpu, Brain, Terminal, ArrowRight, MessageSquare } from 'lucide-react'

const quickActions = [
  { icon: <Lightbulb className="w-4 h-4" />, label: 'Explain Algorithm', color: 'text-amber-400 border-amber-500/30 hover:bg-amber-500/10' },
  { icon: <GitBranch className="w-4 h-4" />, label: 'Recursion Tree', color: 'text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10' },
  { icon: <BarChart2 className="w-4 h-4" />, label: 'DP Table', color: 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10' },
  { icon: <Play className="w-4 h-4" />, label: 'Dry Run', color: 'text-brand-400 border-brand-500/30 hover:bg-brand-500/10' },
  { icon: <Code2 className="w-4 h-4" />, label: 'Find Bug', color: 'text-red-400 border-red-500/30 hover:bg-red-500/10' },
  { icon: <BookOpen className="w-4 h-4" />, label: 'Flashcards', color: 'text-violet-400 border-violet-500/30 hover:bg-violet-500/10' },
  { icon: <Terminal className="w-4 h-4" />, label: 'Pseudocode', color: 'text-pink-400 border-pink-500/30 hover:bg-pink-500/10' },
  { icon: <Globe className="w-4 h-4" />, label: 'Hindi Explain', color: 'text-orange-400 border-orange-500/30 hover:bg-orange-500/10' },
]

const topicCards = [
  { title: 'Dynamic Programming', desc: 'Master the art of breaking problems into subproblems', icon: '🧩', problems: 60, color: 'from-brand-600/20 to-purple-900/10', border: 'border-brand-500/20' },
  { title: 'Graph Algorithms', desc: 'BFS, DFS, Dijkstra, Union Find, and more', icon: '🕸️', problems: 40, color: 'from-cyan-600/10 to-blue-900/10', border: 'border-cyan-500/20' },
  { title: 'Trees & Binary Trees', desc: 'Traversals, BST, segment trees, Fenwick trees', icon: '🌲', problems: 35, color: 'from-emerald-600/10 to-green-900/10', border: 'border-emerald-500/20' },
  { title: 'Recursion & Backtracking', desc: 'Build intuition for recursive thinking', icon: '🔄', problems: 25, color: 'from-amber-600/10 to-orange-900/10', border: 'border-amber-500/20' },
  { title: 'Bit Manipulation', desc: 'Tricks, masks, and binary operations', icon: '⚡', problems: 20, color: 'from-pink-600/10 to-rose-900/10', border: 'border-pink-500/20' },
  { title: 'Heap & Priority Queue', desc: 'K-largest, merging arrays, scheduling', icon: '📊', problems: 18, color: 'from-violet-600/10 to-indigo-900/10', border: 'border-violet-500/20' },
]

const initMessages = [
  {
    role: 'ai',
    content: "👋 Hi! I'm your AlgoMind AI Mentor. I can help you understand algorithms, debug code, visualize data structures, and think through problems step by step.\n\n**What would you like to explore today?** You can:\n- Ask me to explain any algorithm or data structure\n- Paste your code for analysis\n- Request a dry run or visualization\n- Get interview tips for any company\n\nI explain in English, Hindi, or Hinglish — just ask! 🚀"
  }
]

const suggestions = [
  "Explain how Binary Search works",
  "What's the difference between BFS and DFS?",
  "Explain Dynamic Programming with an example",
  "How does Union Find work?",
  "Explain sliding window technique",
  "What is a monotonic stack?",
]

export default function AITutorPage() {
  const [messages, setMessages] = useState(initMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('english')

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)

    // Simulate AI response
    await new Promise(r => setTimeout(r, 1500))
    const aiResponse = generateResponse(msg)
    setMessages(prev => [...prev, { role: 'ai', content: aiResponse }])
    setLoading(false)
  }

  const generateResponse = (msg) => {
    const lower = msg.toLowerCase()
    if (lower.includes('binary search')) return "**Binary Search** is a divide-and-conquer algorithm! 🎯\n\n**Core Idea:** Every iteration, you eliminate half the search space.\n\n```python\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = left + (right - left) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1  # go right\n        else:\n            right = mid - 1  # go left\n    return -1\n```\n\n**Time:** O(log n) | **Space:** O(1)\n\n**Key insight:** Only works on **sorted arrays**. Think of it like finding a word in a dictionary — you never scan every page! 📖"
    if (lower.includes('bfs') || lower.includes('dfs')) return "Great question! Let me break down both:\n\n**BFS (Breadth-First Search)** 🌊\n- Uses a **Queue** (FIFO)\n- Explores level by level\n- Best for: shortest path, minimum steps\n\n**DFS (Depth-First Search)** 🔍\n- Uses **Stack** (or recursion)\n- Goes deep before backtracking\n- Best for: connectivity, cycle detection, topological sort\n\n**When to use which?**\n- Finding shortest path → **BFS**\n- Exploring all paths → **DFS**\n- Memory matters (graph is wide) → **DFS**\n- Memory matters (graph is deep) → **BFS**"
    if (lower.includes('dynamic programming') || lower.includes('dp')) return "**Dynamic Programming** = Recursion + Memoization 🧩\n\n**The 4-step approach:**\n1. **Define** what dp[i] represents\n2. **Find** the recurrence relation\n3. **Identify** base cases\n4. **Fill** the table bottom-up (or top-down with memo)\n\n**Classic example: Fibonacci**\n```python\n# Without DP: O(2^n)\ndef fib_naive(n): return fib(n-1) + fib(n-2)\n\n# With DP: O(n)\ndef fib_dp(n):\n    dp = [0, 1]\n    for i in range(2, n+1):\n        dp.append(dp[i-1] + dp[i-2])\n    return dp[n]\n```\n\n**Recognition pattern:** If you see overlapping subproblems + optimal substructure → Think DP! 🎯"
    return `Great question! Let me think through "${msg}" with you.\n\n🤔 **Socratic approach:** Before I explain, what do you already know about this topic? This helps me tailor my explanation to your level.\n\nHere's what I can do:\n- 📖 Explain the concept from scratch\n- 💻 Show you code examples  \n- 🎬 Walk through a dry run\n- 🌏 Explain in Hindi/Hinglish if you prefer\n\nWhat approach would you like?`
  }

  return (
    <div className="min-h-screen bg-[#030712]">
      <div className="section-container py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center shadow-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">AI <span className="gradient-text">Mentor</span></h1>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400 text-sm">Gemini-powered • Always available</span>
              </div>
            </div>
            <div className="ml-auto">
              <select value={language} onChange={e => setLanguage(e.target.value)}
                className="input-field w-auto text-sm">
                <option value="english">English</option>
                <option value="hindi">हिंदी</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Topics + Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="glass border border-white/[0.08] rounded-2xl p-5">
              <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-400" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((a, i) => (
                  <button key={i}
                    onClick={() => sendMessage(a.label)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${a.color}`}>
                    {a.icon}
                    {a.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Topic Library */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Explore Topics
              </h3>
              {topicCards.map((topic, i) => (
                <button key={i}
                  onClick={() => sendMessage(`Explain ${topic.title}`)}
                  className={`w-full glass bg-gradient-to-r ${topic.color} border ${topic.border} rounded-xl p-4 text-left hover:scale-[1.02] transition-transform`}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg">{topic.icon}</span>
                    <span className="text-white font-semibold text-sm">{topic.title}</span>
                    <span className="ml-auto text-slate-500 text-xs">{topic.problems} problems</span>
                  </div>
                  <p className="text-slate-400 text-xs">{topic.desc}</p>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Center: Chat */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="glass border border-white/[0.08] rounded-2xl flex flex-col" style={{ height: 'calc(100vh - 240px)', minHeight: '600px' }}>
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08]">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">AlgoMind AI</p>
                  <p className="text-slate-500 text-xs">Powered by Gemini • Never gives away answers directly</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs font-medium">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'ai' && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] p-4 text-sm leading-relaxed ${msg.role === 'user' ? 'chat-user' : 'chat-ai'}`}>
                      <div className="prose-dark whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`(.*?)`/g, '<code>$1</code>') }} />
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="chat-ai p-4">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map(i => (
                          <motion.div key={i}
                            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                            className="w-2 h-2 rounded-full bg-brand-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="px-5 pb-3">
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, i) => (
                      <button key={i} onClick={() => sendMessage(s)}
                        className="px-3 py-1.5 rounded-lg glass border border-white/[0.10] text-xs text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-all">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-white/[0.08]">
                <div className="flex gap-3 items-end">
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                    placeholder="Ask about any algorithm, data structure, or paste your code..."
                    rows={1}
                    className="input-field flex-1 resize-none min-h-[44px] max-h-32 py-3"
                    style={{ height: 'auto' }}
                  />
                  <button onClick={() => sendMessage()}
                    disabled={!input.trim() || loading}
                    className="btn-primary px-4 py-3 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-slate-600 text-xs mt-2">
                  Press <kbd className="px-1 py-0.5 rounded bg-white/[0.06] text-slate-500">Enter</kbd> to send, <kbd className="px-1 py-0.5 rounded bg-white/[0.06] text-slate-500">Shift+Enter</kbd> for new line
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
