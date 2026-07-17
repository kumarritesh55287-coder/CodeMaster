import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Brain, Zap, Target, Trophy, Flame, Code2, BarChart3, Star,
  ArrowRight, CheckCircle2, BookOpen, Clock, TrendingUp, Calendar,
  Play, Bot, Cpu, Layers
} from 'lucide-react'

// ── Inline mock data ──────────────────────────────────────────────────────────

const STATS = [
  {
    label: 'Day Streak',
    value: '14',
    sub: 'days',
    icon: Flame,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    glow: 'shadow-orange-500/20',
  },
  {
    label: 'Problems Solved',
    value: '87',
    sub: '/ 2800',
    icon: CheckCircle2,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    glow: 'shadow-violet-500/20',
  },
  {
    label: 'Contest Rating',
    value: '1847',
    sub: 'points',
    icon: Trophy,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'shadow-amber-500/20',
  },
  {
    label: 'Global Rank',
    value: '#2,341',
    sub: 'worldwide',
    icon: Target,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    glow: 'shadow-cyan-500/20',
  },
]

const WEEKLY = [
  { day: 'Mon', count: 3 },
  { day: 'Tue', count: 5 },
  { day: 'Wed', count: 1 },
  { day: 'Thu', count: 4 },
  { day: 'Fri', count: 2 },
  { day: 'Sat', count: 5 },
  { day: 'Sun', count: 0 },
]

const SKILLS = [
  { name: 'Arrays', pct: 85, color: 'bg-violet-500' },
  { name: 'Dynamic Programming', pct: 42, color: 'bg-cyan-500' },
  { name: 'Graphs', pct: 31, color: 'bg-pink-500' },
  { name: 'Trees', pct: 67, color: 'bg-amber-500' },
  { name: 'Strings', pct: 78, color: 'bg-emerald-500' },
  { name: 'Binary Search', pct: 55, color: 'bg-orange-500' },
]

const AI_RECS = [
  {
    title: 'Two Sum',
    difficulty: 'Easy',
    diffColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    reason: 'Great starting point for mastering hash map patterns',
    tag: '#hash-map',
  },
  {
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    diffColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    reason: "Kadane's algorithm — you're ready for this challenge!",
    tag: '#dynamic-programming',
  },
  {
    title: 'Binary Search',
    difficulty: 'Easy',
    diffColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    reason: 'Strengthen your search fundamentals before tackling harder problems',
    tag: '#binary-search',
  },
]

const RECENT = [
  { name: 'Climbing Stairs', diff: 'Easy', status: 'Accepted', lang: 'Python', ago: '2h ago', diffColor: 'text-emerald-400', statusColor: 'text-emerald-400' },
  { name: 'Merge Intervals', diff: 'Medium', status: 'Wrong Answer', lang: 'JavaScript', ago: '5h ago', diffColor: 'text-amber-400', statusColor: 'text-red-400' },
  { name: 'Valid Parentheses', diff: 'Easy', status: 'Accepted', lang: 'Python', ago: '1d ago', diffColor: 'text-emerald-400', statusColor: 'text-emerald-400' },
  { name: 'LRU Cache', diff: 'Medium', status: 'Accepted', lang: 'C++', ago: '2d ago', diffColor: 'text-amber-400', statusColor: 'text-emerald-400' },
  { name: 'Word Break', diff: 'Hard', status: 'Wrong Answer', lang: 'Python', ago: '3d ago', diffColor: 'text-red-400', statusColor: 'text-red-400' },
]

const ROADMAPS = [
  { title: 'DSA Fundamentals', pct: 45, icon: Layers, color: 'from-violet-600 to-purple-600', lessons: '18/40 lessons' },
  { title: 'Binary Search', pct: 20, icon: Zap, color: 'from-cyan-600 to-blue-600', lessons: '4/20 lessons' },
  { title: 'Dynamic Programming', pct: 5, icon: Brain, color: 'from-pink-600 to-rose-600', lessons: '1/25 lessons' },
]

// ── Heatmap data generator ────────────────────────────────────────────────────

function generateHeatmap() {
  const seed = [0, 1, 0, 2, 3, 0, 1, 0, 4, 2, 0, 3, 1, 0, 0, 2, 3, 1, 0, 4,
                2, 0, 1, 3, 0, 2, 1, 0, 3, 4, 0, 1, 0, 2, 3, 0, 1, 4, 2, 0,
                0, 3, 1, 0, 2, 4, 0, 1, 3, 2, 0, 1, 0, 3, 2, 4, 0, 1, 0, 2,
                3, 0, 4, 1, 2, 0, 3, 1, 0, 2, 4, 0, 1, 3, 0, 2, 1, 0, 4, 3,
                0, 1, 2, 0]
  return Array.from({ length: 84 }, (_, i) => seed[i % seed.length])
}

const HEATMAP = generateHeatmap()

const heatColor = (v) => {
  if (v === 0) return 'bg-white/5'
  if (v === 1) return 'bg-violet-600/30'
  if (v === 2) return 'bg-violet-600/50'
  if (v === 3) return 'bg-violet-600/70'
  return 'bg-violet-500'
}

// ── SVG Rating Chart ──────────────────────────────────────────────────────────

function RatingChart() {
  const points = [1200, 1350, 1280, 1500, 1620, 1590, 1720, 1690, 1800, 1847]
  const W = 280
  const H = 80
  const min = Math.min(...points) - 50
  const max = Math.max(...points) + 20
  const toX = (i) => (i / (points.length - 1)) * W
  const toY = (v) => H - ((v - min) / (max - min)) * H
  const pathD = points.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ')
  const areaD = `${pathD} L${W},${H} L0,${H} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#rg)" />
      <path d={pathD} fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={toX(points.length - 1)} cy={toY(points[points.length - 1])} r="4" fill="#7c3aed" />
    </svg>
  )
}

// ── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#030712] text-white relative overflow-x-hidden">
      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-purple-700/8 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* ── 1. WELCOME HEADER ─────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <motion.div variants={fadeUp}>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Welcome back, <span className="gradient-text">Rahul</span> 👋
            </h1>
            <p className="mt-1 text-white/50 text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              You're on a <span className="text-orange-400 font-semibold mx-1">14-day streak</span> — keep it going!
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-3">
            <Link
              to="/problems"
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2 rounded-xl"
            >
              <Play className="w-4 h-4" />
              Solve a Problem
            </Link>
            <Link
              to="/roadmaps"
              className="btn-secondary flex items-center gap-2 text-sm px-4 py-2 rounded-xl"
            >
              <BookOpen className="w-4 h-4" />
              Roadmaps
            </Link>
          </motion.div>
        </motion.div>

        {/* ── 2. STATS ROW ──────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {STATS.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -2 }}
                className={`glass rounded-2xl p-5 border ${s.border} shadow-xl ${s.glow} relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 ${s.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                <div className="relative z-10">
                  <div className={`inline-flex p-2.5 rounded-xl ${s.bg} ${s.border} border mb-3`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
                    <span className="text-white/40 text-xs">{s.sub}</span>
                  </div>
                  <p className="text-white/50 text-xs mt-1">{s.label}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── 3. PROGRESS SECTION ───────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Weekly Progress */}
          <motion.div variants={fadeUp} className="glass rounded-2xl p-6 border border-white/8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-white text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-violet-400" />
                  Weekly Progress
                </h2>
                <p className="text-white/40 text-xs mt-0.5">Problems solved per day</p>
              </div>
              <span className="text-violet-400 text-xs font-medium bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-full">
                This Week
              </span>
            </div>
            <div className="space-y-3">
              {WEEKLY.map((d, i) => (
                <div key={d.day} className="flex items-center gap-3">
                  <span className="text-white/40 text-xs w-8 shrink-0">{d.day}</span>
                  <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.count / 5) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-purple-500"
                    />
                  </div>
                  <span className="text-white/60 text-xs w-4 text-right">{d.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Overview */}
          <motion.div variants={fadeUp} className="glass rounded-2xl p-6 border border-white/8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-white text-base flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  Skills Overview
                </h2>
                <p className="text-white/40 text-xs mt-0.5">Your proficiency by topic</p>
              </div>
              <Link to="/skills" className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors flex items-center gap-1">
                Details <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3.5">
              {SKILLS.map((sk, i) => (
                <div key={sk.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/70 text-xs">{sk.name}</span>
                    <span className="text-white/50 text-xs">{sk.pct}%</span>
                  </div>
                  <div className="bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${sk.pct}%` }}
                      transition={{ delay: 0.4 + i * 0.07, duration: 0.7, ease: 'easeOut' }}
                      className={`h-full rounded-full ${sk.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── 4. ACTIVITY HEATMAP ───────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="glass rounded-2xl p-6 border border-white/8"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-white text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-violet-400" />
                Activity Heatmap
              </h2>
              <p className="text-white/40 text-xs mt-0.5">Last 3 months of coding activity</p>
            </div>
            <div className="flex items-center gap-2 text-white/30 text-xs">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((v) => (
                <div key={v} className={`w-3 h-3 rounded-sm ${heatColor(v)}`} />
              ))}
              <span>More</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-12 gap-1 min-w-[360px]">
              {Array.from({ length: 12 }).map((_, col) => (
                <div key={col} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, row) => {
                    const idx = col * 7 + row
                    const v = HEATMAP[idx] ?? 0
                    return (
                      <motion.div
                        key={row}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.01 * idx, duration: 0.2 }}
                        className={`w-3 h-3 rounded-sm ${heatColor(v)} hover:ring-1 hover:ring-violet-400/50 cursor-pointer transition-all`}
                        title={`${v} problems`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── 5. AI RECOMMENDATIONS ─────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-violet-600/15 border border-violet-500/20">
              <Bot className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-base">Recommended for you</h2>
              <p className="text-white/40 text-xs">Personalized by AlgoMind AI based on your progress</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AI_RECS.map((rec) => (
              <motion.div
                key={rec.title}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -3 }}
                className="glass rounded-2xl p-5 border border-white/8 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white text-sm leading-tight">{rec.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ml-2 ${rec.diffColor}`}>
                      {rec.difficulty}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mb-4 flex-1">
                    <Cpu className="w-3.5 h-3.5 text-violet-400 mt-0.5 shrink-0" />
                    <p className="text-white/50 text-xs leading-relaxed">{rec.reason}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-violet-400/60 text-xs">{rec.tag}</span>
                    <Link
                      to="/problems"
                      className="flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors group/btn"
                    >
                      Solve Now
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── 6 & 7. RECENT ACTIVITY + CONTINUE LEARNING ────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Recent Activity */}
          <motion.div variants={fadeUp} className="glass rounded-2xl p-6 border border-white/8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                Recent Activity
              </h2>
              <Link to="/submissions" className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors flex items-center gap-1">
                All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {RECENT.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-white/3 hover:bg-white/6 transition-colors cursor-pointer border border-white/5"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Code2 className="w-3.5 h-3.5 text-white/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-xs font-medium truncate">{r.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs ${r.diffColor} font-medium`}>{r.diff}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-white/30 text-xs">{r.lang}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xs font-medium ${r.statusColor}`}>{r.status}</p>
                    <p className="text-white/30 text-xs mt-0.5">{r.ago}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Continue Learning */}
          <motion.div variants={fadeUp} className="glass rounded-2xl p-6 border border-white/8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-violet-400" />
                Continue Learning
              </h2>
              <Link to="/roadmaps" className="text-violet-400 text-xs hover:text-violet-300 transition-colors flex items-center gap-1">
                All Roadmaps <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-4">
              {ROADMAPS.map((rm, i) => {
                const Icon = rm.icon
                return (
                  <motion.div
                    key={rm.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.09 }}
                    className="p-4 rounded-xl bg-white/3 border border-white/6 hover:border-violet-500/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${rm.color}`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white/85 text-sm font-medium">{rm.title}</p>
                          <p className="text-white/35 text-xs">{rm.lessons}</p>
                        </div>
                      </div>
                      <Link
                        to="/roadmaps"
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-violet-600/15 border border-violet-500/20 text-violet-400 hover:bg-violet-600/25 hover:text-violet-300 transition-all font-medium"
                      >
                        <Play className="w-3 h-3" />
                        Continue
                      </Link>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-white/40">Progress</span>
                        <span className="text-white/60 font-medium">{rm.pct}%</span>
                      </div>
                      <div className="bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${rm.pct}%` }}
                          transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${rm.color}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* ── 8. CONTEST RATING CHART ───────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.005 }}
          className="glass rounded-2xl p-6 border border-white/8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h2 className="font-semibold text-white text-base">Contest Rating</h2>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold gradient-text">1847</span>
                <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  +127
                </div>
              </div>
              <p className="text-white/40 text-xs">Rated in 8 contests · Top 15%</p>
              <div className="flex gap-2 pt-1">
                {['Pupil', 'Specialist', 'Expert'].map((badge, i) => (
                  <span
                    key={badge}
                    className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                      i === 2
                        ? 'border-violet-500/30 bg-violet-500/10 text-violet-400'
                        : 'border-white/10 bg-white/5 text-white/30'
                    }`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="sm:flex-1 sm:max-w-xs lg:max-w-sm">
              <div className="flex justify-between text-xs text-white/30 mb-1 px-1">
                <span>3 months ago</span>
                <span>Now</span>
              </div>
              <RatingChart />
              <div className="flex justify-between text-xs text-white/25 mt-2 px-1">
                {['Jan', 'Feb', 'Mar', 'Apr'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-5 pt-5 border-t border-white/6 flex flex-wrap gap-3">
            <Link
              to="/contests"
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2 rounded-xl"
            >
              <Star className="w-4 h-4" />
              Join Next Contest
            </Link>
            <Link
              to="/contests"
              className="btn-secondary flex items-center gap-2 text-sm px-4 py-2 rounded-xl"
            >
              <BarChart3 className="w-4 h-4" />
              Full History
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
