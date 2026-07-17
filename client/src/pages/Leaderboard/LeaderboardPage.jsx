import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Flame, Star, TrendingUp, Globe, Filter, Search, Medal, Crown, Zap } from 'lucide-react'
import { users } from '../../data/problems'

const badgeColors = {
  Grandmaster: 'from-red-500 to-rose-600',
  Master: 'from-amber-500 to-orange-600',
  Expert: 'from-brand-500 to-violet-600',
  Knight: 'from-cyan-500 to-blue-600',
  Guardian: 'from-emerald-500 to-teal-600',
}

const badgeBg = {
  Grandmaster: 'bg-red-500/10 border-red-500/30 text-red-400',
  Master: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  Expert: 'bg-brand-500/10 border-brand-500/30 text-brand-400',
  Knight: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
  Guardian: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
}

function RankIcon({ rank }) {
  if (rank === 1) return <Crown className="w-5 h-5 text-amber-400" />
  if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />
  return <span className="text-slate-500 font-mono text-sm w-5 text-center">{rank}</span>
}

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState('global')
  const [search, setSearch] = useState('')

  const filtered = users.filter(u => u.username.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#030712] pt-8 pb-20">
      <div className="section-container max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber-500/30 text-amber-400 text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Global Rankings
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-slate-400">See where you stand among AlgoMind's top coders worldwide</p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex items-end justify-center gap-4 mb-10">
          {/* 2nd */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {users[1]?.avatar}
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-sm">{users[1]?.username}</p>
              <p className="text-slate-500 text-xs">{users[1]?.rating} rating</p>
            </div>
            <div className="w-24 h-20 rounded-t-xl bg-gradient-to-t from-slate-700/60 to-slate-600/40 border border-slate-500/30 flex items-center justify-center">
              <span className="text-2xl font-black text-slate-400">2</span>
            </div>
          </div>
          {/* 1st */}
          <div className="flex flex-col items-center gap-3">
            <Crown className="w-6 h-6 text-amber-400 animate-glow-pulse" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-glow">
              {users[0]?.avatar}
            </div>
            <div className="text-center">
              <p className="text-white font-semibold">{users[0]?.username}</p>
              <p className="text-amber-400 text-xs font-semibold">{users[0]?.rating} rating</p>
            </div>
            <div className="w-28 h-28 rounded-t-xl bg-gradient-to-t from-amber-700/40 to-amber-600/20 border border-amber-500/30 flex items-center justify-center">
              <span className="text-4xl font-black text-amber-400">1</span>
            </div>
          </div>
          {/* 3rd */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-800 to-amber-900 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {users[2]?.avatar}
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-sm">{users[2]?.username}</p>
              <p className="text-slate-500 text-xs">{users[2]?.rating} rating</p>
            </div>
            <div className="w-24 h-16 rounded-t-xl bg-gradient-to-t from-amber-900/60 to-amber-800/30 border border-amber-700/30 flex items-center justify-center">
              <span className="text-2xl font-black text-amber-700">3</span>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search user..." className="input-field pl-10 w-full" />
          </div>
          <div className="flex gap-2">
            {['global', 'weekly', 'monthly'].map(t => (
              <button key={t} onClick={() => setTimeframe(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border capitalize transition-all ${
                  timeframe === t ? 'bg-brand-600/30 border-brand-500/40 text-brand-300' : 'glass border-white/[0.10] text-slate-400'
                }`}>{t}</button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="glass border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.08] text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">User</div>
            <div className="col-span-2">Rating</div>
            <div className="col-span-2">Solved</div>
            <div className="col-span-1">Streak</div>
            <div className="col-span-2">Badge</div>
          </div>

          {filtered.map((user, i) => (
            <motion.div key={user.rank}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className={`grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.04] items-center hover:bg-white/[0.02] transition-colors ${user.rank <= 3 ? 'bg-white/[0.01]' : ''}`}
            >
              <div className="col-span-1 flex items-center">
                <RankIcon rank={user.rank} />
              </div>
              <div className="col-span-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${badgeColors[user.badge] || 'from-brand-500 to-violet-600'} flex items-center justify-center text-white font-bold text-sm`}>
                  {user.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{user.username}</p>
                  <p className="text-slate-500 text-xs flex items-center gap-1">
                    <Globe className="w-3 h-3" />{user.country}
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-400" />
                  <span className="text-white font-semibold">{user.rating}</span>
                </div>
              </div>
              <div className="col-span-2 text-slate-300 font-medium">{user.solved}</div>
              <div className="col-span-1 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-slate-300 text-sm">{user.streak}</span>
              </div>
              <div className="col-span-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeBg[user.badge]}`}>
                  {user.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Your rank card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-6 glass border border-brand-500/30 rounded-2xl p-5 flex items-center gap-4 shadow-glow">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center font-bold text-white">
            RK
          </div>
          <div>
            <p className="text-white font-semibold">You — @rahul_codes</p>
            <p className="text-slate-500 text-sm">Rating: 1847 • Rank: #2,341 worldwide</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="text-white font-bold">+124</p>
              <p className="text-emerald-400 text-xs">this week</p>
            </div>
            <button className="btn-primary px-4 py-2 text-sm">
              <Zap className="w-4 h-4" />
              Improve Rank
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
