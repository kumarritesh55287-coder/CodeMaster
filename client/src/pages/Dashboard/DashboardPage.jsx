import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Trophy, Flame, Target, CheckCircle2, Code2, ArrowRight,
  TrendingUp, Calendar, Zap, Bot, Star, Activity, Award
} from 'lucide-react'
import { MOCK_PROBLEMS } from '../../data/problemsData'

export default function DashboardPage() {
  const [heatmapYear] = useState('2026')

  // Generate 365 mock heat grid boxes
  const heatBoxes = Array.from({ length: 120 }, (_, i) => {
    const r = Math.random()
    if (r > 0.85) return 'bg-[#ffa116]'
    if (r > 0.6) return 'bg-[#ffa116]/60'
    if (r > 0.35) return 'bg-[#ffa116]/30'
    return 'bg-[#282828]'
  })

  return (
    <div className="min-h-screen bg-black text-[#eff1f6] pt-[#3.5rem] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* Top Welcome Banner */}
        <div className="bg-gradient-to-r from-[#282828] to-[#1f1f1f] border border-[#3e3e3e] rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#ffa116] font-bold text-xs uppercase tracking-wider">LeetCode Analytics</span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffa116]/10 text-[#ffa116] text-[10px] font-bold">PRO USER</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome back, Developer! 👋</h1>
              <p className="text-gray-400 text-sm mt-1">You are on a <strong>14-day coding streak</strong>. Keep solving problems daily!</p>
            </div>

            <Link
              to="/problems/two-sum"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ffa116] hover:bg-[#ffb340] text-[#0a0a0a] font-bold text-xs transition-all shadow-lg shadow-[#ffa116]/20"
            >
              <Zap className="w-4 h-4 fill-[#0a0a0a]" />
              <span>Solve Today's Challenge</span>
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lc-card p-5 space-y-2">
            <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
              <span>Day Streak</span>
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            </div>
            <div className="text-3xl font-black text-white">14 <span className="text-sm font-normal text-gray-400">days</span></div>
            <div className="text-[11px] text-[#00b8a3]">Top 5% consistent coders</div>
          </div>

          <div className="lc-card p-5 space-y-2">
            <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
              <span>Problems Solved</span>
              <CheckCircle2 className="w-4 h-4 text-[#00b8a3]" />
            </div>
            <div className="text-3xl font-black text-white">125 <span className="text-sm font-normal text-gray-400">/ 2900</span></div>
            <div className="text-[11px] text-gray-400">Easy: 54 | Med: 56 | Hard: 15</div>
          </div>

          <div className="lc-card p-5 space-y-2">
            <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
              <span>Contest Rating</span>
              <Trophy className="w-4 h-4 text-[#ffc01e]" />
            </div>
            <div className="text-3xl font-black text-white">1,847</div>
            <div className="text-[11px] text-[#ffc01e]">Knight Badge Rank</div>
          </div>

          <div className="lc-card p-5 space-y-2">
            <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
              <span>Global Rank</span>
              <Target className="w-4 h-4 text-[#ff375f]" />
            </div>
            <div className="text-3xl font-black text-white">#2,341</div>
            <div className="text-[11px] text-gray-400">Worldwide Percentile: 98.4%</div>
          </div>
        </div>

        {/* 365-Day Submission Heatmap */}
        <div className="lc-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#ffa116]" />
              <h2 className="text-base font-bold text-white">Submission Activity ({heatmapYear})</h2>
            </div>
            <div className="text-xs text-gray-400">184 submissions in total</div>
          </div>

          {/* Grid Box */}
          <div className="overflow-x-auto pb-2">
            <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
              {heatBoxes.map((bg, idx) => (
                <div key={idx} className={`w-3.5 h-3.5 rounded-sm ${bg}`} title={`Day ${idx + 1}: Submissions active`} />
              ))}
            </div>
          </div>
        </div>

        {/* Breakdown & Recent Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Difficulty Progress */}
          <div className="lc-card p-6 space-y-6">
            <h3 className="text-base font-bold text-white">Difficulty Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#00b8a3] font-semibold">Easy</span>
                  <span className="text-gray-400">54 / 800</span>
                </div>
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00b8a3] rounded-full w-[35%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#ffc01e] font-semibold">Medium</span>
                  <span className="text-gray-400">56 / 1500</span>
                </div>
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#ffc01e] rounded-full w-[25%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#ff375f] font-semibold">Hard</span>
                  <span className="text-gray-400">15 / 600</span>
                </div>
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#ff375f] rounded-full w-[12%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Submissions List */}
          <div className="lg:col-span-2 lc-card p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Recent Accepted Solutions</h3>
            <div className="space-y-3">
              {MOCK_PROBLEMS.map(p => (
                <div key={p.id} className="bg-[#1a1a1a] border border-[#3e3e3e] rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00b8a3]" />
                    <div>
                      <Link to={`/problems/${p.slug}`} className="text-sm font-bold text-white hover:text-[#ffa116]">
                        {p.title}
                      </Link>
                      <div className="text-xs text-gray-500 font-mono mt-0.5">{p.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-[#00b8a3]">Accepted</span>
                    <span className="text-gray-400">42 ms</span>
                    <Link to={`/problems/${p.slug}`} className="text-[#ffa116] hover:underline font-bold">View →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
