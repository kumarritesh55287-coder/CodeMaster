import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Code2, Globe, MessageSquare, Mail, ArrowRight, Heart } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="w-full bg-[#141414] border-t border-[#282828] text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#ffa116] flex items-center justify-center text-[#0a0a0a] font-bold">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                Code<span className="text-[#ffa116]">Master</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-400">
              The premier platform for coding interview preparation, algorithmic challenges, and AI-assisted debugging.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#00b8a3]">
              <span className="w-2 h-2 rounded-full bg-[#00b8a3] animate-ping" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/problems" className="hover:text-white transition-colors">Problems Database</Link></li>
              <li><Link to="/contest" className="hover:text-white transition-colors">Weekly Contests</Link></li>
              <li><Link to="/roadmap" className="hover:text-white transition-colors">NeetCode 150 Roadmap</Link></li>
              <li><Link to="/leaderboard" className="hover:text-white transition-colors">Global Leaderboard</Link></li>
              <li><Link to="/ai-tutor" className="hover:text-white transition-colors">AI Code Coach</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">System Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">DS & Algo Cheat Sheets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Interview Preparation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-4">Daily Problem Digest</h4>
            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#00b8a3]/10 border border-[#00b8a3]/30 text-xs text-[#00b8a3]">
                ✓ Subscribed to daily interview questions!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-[#1a1a1a] border border-[#3e3e3e] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ffa116]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#ffa116] hover:bg-[#ffb340] text-[#0a0a0a] font-semibold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#282828] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} CodeMaster AI. Built with React, HTML, CSS & Tailwind CSS.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <a href="#" className="hover:text-white"><Globe className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white"><MessageSquare className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
