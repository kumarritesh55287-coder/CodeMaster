import { useState } from 'react'
import { Bot, Send, Sparkles, Code2, Lightbulb, Zap, Terminal } from 'lucide-react'

export default function AITutorPage() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Hello! I am your **CodeMaster AI Mentor**. Ask me any question on Data Structures, Algorithms, System Design, or interview preparation.'
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = input
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setInput('')

    setTimeout(() => {
      let reply = `Here is how you can approach that problem: Break it down into subproblems, identify if dynamic programming or two-pointer technique applies, and optimize time complexity to O(N).`
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#424933] text-[#eff1f6] pt-[#3.5rem] pb-16 flex flex-col">
      <div className="max-w-4xl mx-auto px-4 w-full flex-1 flex flex-col pt-6 space-y-4">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ffa116]/10 border border-[#ffa116]/30 flex items-center justify-center text-[#ffa116]">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">AI Coding Mentor</h1>
            <p className="text-xs text-gray-400">Ask anything about algorithms, time complexities, or code optimization.</p>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 lc-card p-4 overflow-y-auto space-y-4 min-h-[400px]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-xl text-xs leading-relaxed max-w-[85%] ${
                m.role === 'user'
                  ? 'ml-auto bg-[#ffa116]/10 text-amber-200 border border-[#ffa116]/30'
                  : 'mr-auto bg-[#424933] text-gray-300 border border-[#3e3e3e]'
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question (e.g., 'Explain Kadane's Algorithm for Maximum Subarray')..."
            className="flex-1 bg-[#282828] border border-[#3e3e3e] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ffa116]"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-[#ffa116] text-[#0a0a0a] font-bold text-xs hover:bg-[#ffb340] flex items-center gap-1.5"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  )
}
