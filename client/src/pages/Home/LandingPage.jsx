import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code2, Play, Bot, Swords, Trophy, Flame, ArrowRight, CheckCircle2, Zap, Shield, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#424933] text-[#eff1f6]">
      
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ffa116]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffa116]/10 border border-[#ffa116]/30 text-[#ffa116] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered LeetCode Platform 2.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Master Data Structures & Algorithms with <span className="gradient-text-amber">CodeMaster</span>
          </h1>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Practice real coding interview questions, run test cases in browser, receive instant AI debugging hints, and prepare for tech company interviews.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/problems"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#ffa116] hover:bg-[#ffb340] text-[#0a0a0a] font-black text-sm transition-all shadow-xl shadow-[#ffa116]/20 flex items-center justify-center gap-2"
            >
              <Code2 className="w-5 h-5" />
              <span>Explore Problems</span>
            </Link>

            <Link
              to="/problems/two-sum"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#282828] hover:bg-[#323232] border border-[#3e3e3e] text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-[#00b8a3] fill-[#00b8a3]" />
              <span>Try Problem Workspace</span>
            </Link>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-5xl mx-auto text-left">
            <div className="lc-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffa116]/10 border border-[#ffa116]/30 flex items-center justify-center text-[#ffa116]">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Browser Code IDE</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Multi-language support (JavaScript, Python, C++, Java, Go, Rust) with instant test case execution.
              </p>
            </div>

            <div className="lc-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00b8a3]/10 border border-[#00b8a3]/30 flex items-center justify-center text-[#00b8a3]">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">AI Coding Coach</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Get intelligent hints, bug explanations, and time/space complexity analysis without direct spoilers.
              </p>
            </div>

            <div className="lc-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#ff375f]/10 border border-[#ff375f]/30 flex items-center justify-center text-[#ff375f]">
                <Swords className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Weekly Contests</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Compete live in 90-minute timed contests, climb global leaderboards, and track your contest rating.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
