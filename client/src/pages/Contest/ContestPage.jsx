import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Clock, Users, Calendar, Play, Lock, Star, ArrowRight, Zap, Timer, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

const contests = [
  {
    id: 1,
    title: 'AlgoMind Weekly Contest #47',
    type: 'Weekly',
    status: 'live',
    startTime: 'Jul 17, 2025 · 8:00 PM IST',
    duration: '1.5 hours',
    participants: 12847,
    problems: 4,
    color: 'from-brand-600/20 to-purple-900/10',
    border: 'border-brand-500/30',
    badge: 'LIVE NOW',
    badgeColor: 'bg-red-500 text-white',
  },
  {
    id: 2,
    title: 'AlgoMind Monthly Championship',
    type: 'Monthly',
    status: 'upcoming',
    startTime: 'Jul 20, 2025 · 8:00 PM IST',
    duration: '3 hours',
    participants: 0,
    problems: 6,
    color: 'from-amber-600/10 to-orange-900/10',
    border: 'border-amber-500/20',
    badge: 'UPCOMING',
    badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/40',
  },
  {
    id: 3,
    title: 'FAANG Interview Special',
    type: 'Special',
    status: 'upcoming',
    startTime: 'Jul 25, 2025 · 7:00 PM IST',
    duration: '2 hours',
    participants: 0,
    problems: 4,
    color: 'from-cyan-600/10 to-blue-900/10',
    border: 'border-cyan-500/20',
    badge: 'PREMIUM',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40',
    premium: true,
  },
  {
    id: 4,
    title: 'AlgoMind Weekly Contest #46',
    type: 'Weekly',
    status: 'ended',
    startTime: 'Jul 10, 2025 · 8:00 PM IST',
    duration: '1.5 hours',
    participants: 10293,
    problems: 4,
    color: 'from-white/[0.02] to-transparent',
    border: 'border-white/[0.06]',
    badge: 'ENDED',
    badgeColor: 'bg-slate-700/50 text-slate-400',
    myRank: 234,
  },
  {
    id: 5,
    title: 'AlgoMind Weekly Contest #45',
    type: 'Weekly',
    status: 'ended',
    startTime: 'Jul 3, 2025 · 8:00 PM IST',
    duration: '1.5 hours',
    participants: 9847,
    problems: 4,
    color: 'from-white/[0.02] to-transparent',
    border: 'border-white/[0.06]',
    badge: 'ENDED',
    badgeColor: 'bg-slate-700/50 text-slate-400',
    myRank: 512,
  },
]

const leaderboardPreview = [
  { rank: 1, user: 'algo_ninja', rating: 3812, solved: 4, time: '45:23' },
  { rank: 2, user: 'codemaster_pro', rating: 3701, solved: 4, time: '52:17' },
  { rank: 3, user: 'dp_wizard', rating: 3654, solved: 4, time: '58:40' },
  { rank: 4, user: 'graph_guru', rating: 3590, solved: 3, time: '61:05' },
  { rank: 5, user: 'you', rating: 1847, solved: 2, time: '87:33', isYou: true },
]

export default function ContestPage() {
  const [tab, setTab] = useState('upcoming')

  const liveContest = contests.find(c => c.status === 'live')

  return (
    <div className="min-h-screen bg-[#030712] pt-8 pb-20">
      <div className="section-container max-w-6xl">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white mb-2">
                <span className="gradient-text">Contests</span>
              </h1>
              <p className="text-slate-400">Compete, rank up, and sharpen your skills under pressure.</p>
            </div>
            <button className="btn-secondary">
              <Star className="w-4 h-4 text-amber-400" />
              Virtual Contest
            </button>
          </div>
        </motion.div>

        {/* LIVE CONTEST BANNER */}
        {liveContest && (
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            className="mb-8 relative glass border border-red-500/30 rounded-3xl p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-brand-900/10" />
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE NOW
            </div>
            <div className="relative flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <div className="flex-1">
                <h2 className="text-white font-black text-xl mb-2">{liveContest.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {liveContest.participants.toLocaleString()} participants
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {liveContest.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    {liveContest.problems} problems
                  </span>
                </div>

                {/* Countdown */}
                <div className="flex gap-3 mt-4">
                  {[['00', 'Hours'], ['43', 'Minutes'], ['27', 'Seconds']].map(([val, label]) => (
                    <div key={label} className="glass border border-white/[0.10] rounded-xl px-4 py-2 text-center">
                      <div className="text-2xl font-black text-white font-mono">{val}</div>
                      <div className="text-slate-500 text-xs">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button className="btn-primary text-base px-8 py-3 shadow-glow-lg">
                  <Play className="w-5 h-5" />
                  Join Contest
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="btn-secondary text-sm">
                  View Leaderboard
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contest List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Tabs */}
            <div className="flex gap-1 glass border border-white/[0.08] rounded-xl p-1 w-fit">
              {['upcoming', 'ended', 'virtual'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                    tab === t ? 'bg-brand-600/80 text-white' : 'text-slate-400 hover:text-white'
                  }`}>{t}</button>
              ))}
            </div>

            {contests.filter(c => tab === 'upcoming' ? c.status !== 'ended' : c.status === 'ended').map((contest, i) => (
              <motion.div key={contest.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`glass bg-gradient-to-r ${contest.color} border ${contest.border} rounded-2xl p-5`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-bold">{contest.title}</h3>
                      {contest.premium && <Lock className="w-4 h-4 text-amber-400" />}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{contest.startTime}</span>
                      <span className="flex items-center gap-1"><Timer className="w-3.5 h-3.5" />{contest.duration}</span>
                      {contest.participants > 0 && (
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{contest.participants.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${contest.badgeColor}`}>
                    {contest.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {[...Array(contest.problems)].map((_, i) => (
                      <div key={i} className="px-2.5 py-1 rounded-lg glass border border-white/[0.08] text-slate-400 text-xs font-mono">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {contest.status === 'ended' && contest.myRank && (
                      <span className="px-3 py-1.5 rounded-lg bg-brand-600/20 border border-brand-500/30 text-brand-400 text-xs font-medium">
                        Rank #{contest.myRank}
                      </span>
                    )}
                    {contest.status === 'upcoming' && (
                      <button className="btn-secondary text-sm py-1.5">Register</button>
                    )}
                    {contest.status === 'live' && (
                      <button className="btn-primary text-sm py-1.5">
                        <Play className="w-4 h-4" />
                        Join
                      </button>
                    )}
                    {contest.status === 'ended' && (
                      <button className="btn-ghost text-sm">View Problems</button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Rating chart */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="glass border border-white/[0.08] rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                Your Contest Rating
              </h3>
              <div className="text-3xl font-black gradient-text mb-1">1847</div>
              <p className="text-slate-500 text-xs mb-4">Expert level • +124 this month</p>
              <div className="space-y-2">
                {[
                  { label: 'Contests', value: '8' },
                  { label: 'Best Rank', value: '#145' },
                  { label: 'Top %', value: '12.3%' },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-500">{s.label}</span>
                    <span className="text-white font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mini leaderboard */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="glass border border-white/[0.08] rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Live Standings — Weekly #47
              </h3>
              <div className="space-y-2">
                {leaderboardPreview.map((u, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${u.isYou ? 'bg-brand-600/10 border border-brand-500/20' : ''}`}>
                    <span className={`text-sm font-mono w-5 text-center ${u.rank <= 3 ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
                      {u.rank}
                    </span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${u.isYou ? 'text-brand-400' : 'text-white'}`}>{u.user}</p>
                    </div>
                    <span className="text-xs text-slate-500">{u.solved}/4</span>
                    <span className="text-xs text-slate-600 font-mono">{u.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Private contest */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="glass border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-2">Host a Private Contest</h3>
              <p className="text-slate-400 text-xs mb-4">Challenge your friends, classmates or team to a custom contest.</p>
              <button className="btn-secondary w-full justify-center text-sm">
                <Zap className="w-4 h-4" />
                Create Contest
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
