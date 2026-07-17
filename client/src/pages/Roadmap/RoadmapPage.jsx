import { useState } from 'react'
import { motion } from 'framer-motion'
import { roadmaps } from '../../data/problems'
import { ArrowRight, CheckCircle2, Clock, BookOpen, Target, Zap, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

const levelColors = {
  Beginner: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  Intermediate: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  Advanced: 'bg-red-500/10 border-red-500/20 text-red-400',
}

export default function RoadmapPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-[#030712] pt-8 pb-20">
      <div className="section-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 text-brand-400 text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            Learning Paths
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
            AI-Curated <span className="gradient-text">Roadmaps</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Follow structured learning paths that adapt to your progress and take you from beginner to interview-ready.
          </p>
        </motion.div>

        {/* Roadmap Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {roadmaps.map((rm, i) => {
            const pct = Math.round((rm.completedProblems / rm.problems) * 100)
            return (
              <motion.div key={rm.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`glass border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-4 cursor-pointer hover:border-brand-500/30 hover:shadow-glow transition-all duration-300 group`}
                onClick={() => setSelected(selected === rm.id ? null : rm.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="text-3xl">{rm.icon}</div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${levelColors[rm.level]}`}>
                    {rm.level}
                  </span>
                </div>

                <div>
                  <h3 className="text-white font-bold text-base mb-1">{rm.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{rm.description}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    {rm.problems} problems
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {rm.duration}
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">{pct}% complete</span>
                    <span className="text-slate-500">{rm.completedProblems}/{rm.problems}</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {rm.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-slate-500 text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link to="/problems" className="btn-primary w-full justify-center py-2.5 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {rm.completedProblems > 0 ? 'Continue' : 'Start Path'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* DSA Visual Path */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-16 glass border border-white/[0.08] rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">
                Complete DSA <span className="gradient-text">Mastery Path</span>
              </h2>
              <p className="text-slate-400 text-sm">The comprehensive roadmap from zero to hero</p>
            </div>
            <Link to="/problems" className="btn-primary">
              <Zap className="w-4 h-4" />
              Start Now
            </Link>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-brand-500/50 via-cyan-500/30 to-transparent" />
            <div className="space-y-6">
              {[
                { title: 'Arrays & Strings', problems: 25, done: true, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
                { title: 'Hash Tables & Sets', problems: 15, done: true, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
                { title: 'Two Pointers & Sliding Window', problems: 20, done: false, active: true, color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/30' },
                { title: 'Stack & Queue', problems: 18, done: false, color: 'text-slate-500', bg: 'bg-white/[0.03] border-white/[0.06]' },
                { title: 'Binary Search', problems: 22, done: false, color: 'text-slate-500', bg: 'bg-white/[0.03] border-white/[0.06]' },
                { title: 'Linked List', problems: 14, done: false, color: 'text-slate-500', bg: 'bg-white/[0.03] border-white/[0.06]' },
                { title: 'Trees & BST', problems: 30, done: false, color: 'text-slate-500', bg: 'bg-white/[0.03] border-white/[0.06]', locked: true },
                { title: 'Graphs & BFS/DFS', problems: 25, done: false, color: 'text-slate-500', bg: 'bg-white/[0.03] border-white/[0.06]', locked: true },
                { title: 'Dynamic Programming', problems: 40, done: false, color: 'text-slate-500', bg: 'bg-white/[0.03] border-white/[0.06]', locked: true },
                { title: 'Advanced Topics', problems: 35, done: false, color: 'text-slate-500', bg: 'bg-white/[0.03] border-white/[0.06]', locked: true },
              ].map((step, i) => (
                <div key={i} className={`ml-16 flex items-center gap-4 p-4 rounded-xl border ${step.bg} transition-all hover:border-opacity-50`}>
                  <div className="absolute left-6 flex items-center justify-center">
                    {step.done ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 bg-[#030712] rounded-full" />
                    ) : step.active ? (
                      <div className="w-4 h-4 rounded-full bg-brand-600 border-2 border-brand-400 animate-pulse" />
                    ) : step.locked ? (
                      <Lock className="w-4 h-4 text-slate-600 bg-[#030712] p-0.5" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-600 bg-[#030712]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-sm ${step.color}`}>{step.title}</span>
                      {step.active && <span className="px-2 py-0.5 rounded-full bg-brand-600/20 text-brand-400 text-[10px] font-bold">IN PROGRESS</span>}
                    </div>
                    <p className="text-slate-600 text-xs">{step.problems} problems</p>
                  </div>
                  {!step.locked && (
                    <Link to="/problems" className="btn-ghost text-xs">
                      {step.done ? 'Review' : step.active ? 'Continue' : 'Start'} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
