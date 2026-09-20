import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swords, Trophy, Clock, Flame, Users, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ContestPage() {
  const [registered, setRegistered] = useState(false)

  return (
    <div className="min-h-screen bg-black text-[#eff1f6] pt-[#3.5rem] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>LeetCode Weekly Contests</span>
            <Swords className="w-6 h-6 text-[#ffa116]" />
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Compete live against global programmers, solve 4 problems in 90 minutes, and boost your rating!
          </p>
        </div>

        {/* Live / Upcoming Contest Card */}
        <div className="bg-gradient-to-r from-[#282828] via-[#242424] to-[#1a1a1a] border border-[#ffa116]/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffa116] text-[#0a0a0a] text-xs font-bold uppercase">UPCOMING</span>
                <span className="text-xs text-gray-400 font-mono">Sunday 08:00 AM IST</span>
              </div>
              <h2 className="text-2xl font-black text-white">Weekly Contest 435</h2>
              <p className="text-gray-400 text-xs max-w-xl">
                4 Problems • 1 Hour 30 Minutes • Rated for All Participants. Show your speed & accuracy to rank up!
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
              <div className="text-center md:text-right">
                <div className="text-xs text-gray-400 mb-1">Starts in</div>
                <div className="font-mono text-2xl font-black text-[#ffa116] tracking-wider">02d : 14h : 35m</div>
              </div>

              <button
                onClick={() => setRegistered(!registered)}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg ${
                  registered
                    ? 'bg-[#00b8a3] text-[#0a0a0a]'
                    : 'bg-[#ffa116] text-[#0a0a0a] hover:bg-[#ffb340] shadow-[#ffa116]/20'
                }`}
              >
                {registered ? '✓ Registered' : 'Register Now'}
              </button>
            </div>
          </div>
        </div>

        {/* Virtual Contests Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Past Virtual Contests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[434, 433, 432, 431].map(num => (
              <div key={num} className="lc-card p-5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white mb-1">Weekly Contest {num}</div>
                  <div className="text-xs text-gray-400 font-mono">4 Problems • 90 Mins</div>
                </div>
                <Link
                  to="/problems"
                  className="px-3 py-1.5 rounded-lg bg-[#383838] hover:bg-[#484848] text-xs font-semibold text-gray-200 transition-colors"
                >
                  Virtual Start →
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
