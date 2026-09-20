import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Flame, Code2, Star, Globe, Edit2, CheckCircle2, Clock, TrendingUp, Calendar, Target, BarChart3, Zap } from 'lucide-react'
import { Github, Linkedin } from '../../components/common/BrandIcons'
import { useAuth } from '../../context/AuthContext'

// Generate heatmap data
const generateHeatmap = () => {
  const data = []
  for (let week = 0; week < 26; week++) {
    const days = []
    for (let day = 0; day < 7; day++) {
      const r = Math.random()
      days.push(r > 0.6 ? Math.floor(Math.random() * 5) + 1 : 0)
    }
    data.push(days)
  }
  return data
}

const heatmapData = generateHeatmap()

const skills = [
  { name: 'Arrays', level: 85, color: 'bg-brand-500' },
  { name: 'Dynamic Programming', level: 42, color: 'bg-amber-500' },
  { name: 'Graphs', level: 31, color: 'bg-cyan-500' },
  { name: 'Trees', level: 67, color: 'bg-emerald-500' },
  { name: 'Strings', level: 78, color: 'bg-pink-500' },
  { name: 'Binary Search', level: 55, color: 'bg-violet-500' },
  { name: 'Recursion', level: 48, color: 'bg-orange-500' },
  { name: 'Two Pointers', level: 72, color: 'bg-teal-500' },
]

const badges = [
  { name: '7-Day Streak', icon: '🔥', color: 'bg-orange-500/10 border-orange-500/20', desc: 'Solved for 7 days straight' },
  { name: 'First AC', icon: '✅', color: 'bg-emerald-500/10 border-emerald-500/20', desc: 'First accepted submission' },
  { name: 'Speed Demon', icon: '⚡', color: 'bg-amber-500/10 border-amber-500/20', desc: 'Solved in under 5 minutes' },
  { name: 'Problem Solver', icon: '🧩', color: 'bg-brand-500/10 border-brand-500/20', desc: 'Solved 50+ problems' },
  { name: 'Contest Ready', icon: '🏆', color: 'bg-cyan-500/10 border-cyan-500/20', desc: 'Participated in a contest' },
  { name: 'AI Explorer', icon: '🤖', color: 'bg-violet-500/10 border-violet-500/20', desc: 'Used AI mentor 20+ times' },
]

const recentSubmissions = [
  { problem: 'Two Sum', difficulty: 'Easy', status: 'Accepted', lang: 'Python', time: '2 hours ago' },
  { problem: 'Binary Search', difficulty: 'Easy', status: 'Accepted', lang: 'Java', time: '5 hours ago' },
  { problem: '3Sum', difficulty: 'Medium', status: 'Wrong Answer', lang: 'C++', time: '1 day ago' },
  { problem: 'Coin Change', difficulty: 'Medium', status: 'Accepted', lang: 'Python', time: '2 days ago' },
  { problem: 'Trapping Rain Water', difficulty: 'Hard', status: 'Time Limit', lang: 'JavaScript', time: '3 days ago' },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user } = useAuth()

  const profileUser = user || {
    name: 'Rahul Kumar',
    email: 'demo@algomind.ai',
    avatar: 'RK',
    rating: 1847,
    streak: 14,
    solved: 87,
    rank: 2341,
  }

  const handle = profileUser.email ? `@${profileUser.email.split('@')[0]}` : '@user'

  const tabs = ['overview', 'submissions', 'achievements', 'stats']

  const heatIntensity = (val) => {
    if (val === 0) return 'bg-white/[0.04]'
    if (val === 1) return 'bg-brand-800/60'
    if (val === 2) return 'bg-brand-700/70'
    if (val === 3) return 'bg-brand-600/80'
    return 'bg-brand-500'
  }

  return (
    <div className="min-h-screen bg-[#424933] pt-4 pb-20">
      <div className="section-container max-w-5xl">

        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass border border-white/[0.08] rounded-3xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh pointer-events-none opacity-50" />
          <div className="relative flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600 to-cyan-500 flex items-center justify-center text-white font-black text-2xl shadow-glow">
                {profileUser.avatar || 'U'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#030712] flex items-center justify-center">
                <span className="text-[8px]">✓</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-black text-white">{profileUser.name}</h1>
                  <p className="text-slate-400 text-sm">{handle} · Expert Level</p>
                  <p className="text-slate-500 text-sm mt-1">{profileUser.email} · Account Active 🚀</p>
                </div>
                <button className="btn-secondary text-sm">
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <a href="#" className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors">
                  <Github className="w-4 h-4" /> {profileUser.email ? profileUser.email.split('@')[0] : 'github'}
                </a>
                <a href="#" className="flex items-center gap-1.5 text-slate-400 hover:text-brand-400 text-sm transition-colors">
                  <Linkedin className="w-4 h-4" /> {profileUser.name}
                </a>
                <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Globe className="w-4 h-4" /> India
                </span>
              </div>
            </div>
          </div>

          {/* Stat pills */}
          <div className="relative mt-6 flex flex-wrap gap-4 pt-6 border-t border-white/[0.06]">
            {[
              { icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, label: 'Problems Solved', value: '87' },
              { icon: <Flame className="w-4 h-4 text-orange-400" />, label: 'Day Streak', value: '14' },
              { icon: <Trophy className="w-4 h-4 text-amber-400" />, label: 'Contest Rating', value: '1847' },
              { icon: <Target className="w-4 h-4 text-brand-400" />, label: 'Global Rank', value: '#2,341' },
              { icon: <Star className="w-4 h-4 text-cyan-400" />, label: 'Badges Earned', value: '6' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                {s.icon}
                <div>
                  <p className="text-white font-bold text-sm">{s.value}</p>
                  <p className="text-slate-500 text-xs">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 glass border border-white/[0.08] rounded-xl p-1 mb-6 w-fit">
          {tabs.map(tab => (
            <button key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab ? 'bg-brand-600/80 text-white' : 'text-slate-400 hover:text-white'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Heatmap */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="glass border border-white/[0.08] rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-400" />
                Activity Heatmap
                <span className="text-slate-500 font-normal text-sm">— Last 6 months</span>
              </h3>
              <div className="flex gap-1 overflow-x-auto pb-2">
                {heatmapData.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((val, di) => (
                      <div key={di} title={`${val} submissions`}
                        className={`heatmap-cell cursor-pointer ${heatIntensity(val)}`} />
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-slate-600 text-xs">Less</span>
                {[0, 1, 2, 3, 4].map(v => (
                  <div key={v} className={`w-3 h-3 rounded-sm ${heatIntensity(v)}`} />
                ))}
                <span className="text-slate-600 text-xs">More</span>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Skills */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="glass border border-white/[0.08] rounded-2xl p-6">
                <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  Skill Proficiency
                </h3>
                <div className="space-y-4">
                  {skills.map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-slate-300 text-sm">{s.name}</span>
                        <span className="text-slate-500 text-xs">{s.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.level}%` }}
                          transition={{ delay: 0.1 * i + 0.2, duration: 0.8 }}
                          className={`h-full ${s.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Difficulty breakdown */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="glass border border-white/[0.08] rounded-2xl p-6">
                <h3 className="text-white font-bold mb-5 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-400" />
                  Problem Stats
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Easy', solved: 45, total: 800, color: 'bg-emerald-500', text: 'text-emerald-400' },
                    { label: 'Medium', solved: 35, total: 1400, color: 'bg-amber-500', text: 'text-amber-400' },
                    { label: 'Hard', solved: 7, total: 600, color: 'bg-red-500', text: 'text-red-400' },
                  ].map((d, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1.5">
                        <span className={`text-sm font-medium ${d.text}`}>{d.label}</span>
                        <span className="text-slate-400 text-sm">{d.solved} / {d.total}</span>
                      </div>
                      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(d.solved / d.total) * 100}%` }}
                          transition={{ delay: 0.1 * i + 0.3, duration: 0.8 }}
                          className={`h-full ${d.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 mt-3 border-t border-white/[0.06]">
                    <div className="text-center">
                      <span className="text-4xl font-black gradient-text">87</span>
                      <p className="text-slate-500 text-sm">Total Solved</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass border border-white/[0.08] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.08]">
              <h3 className="text-white font-bold">Recent Submissions</h3>
            </div>
            {recentSubmissions.map((s, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.status === 'Accepted' ? 'bg-emerald-400' : s.status === 'Wrong Answer' ? 'bg-red-400' : 'bg-amber-400'}`} />
                <div className="flex-1">
                  <span className="text-white font-medium text-sm">{s.problem}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  s.difficulty === 'Easy' ? 'badge-easy' : s.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'
                }`}>{s.difficulty}</span>
                <span className={`text-sm font-medium ${s.status === 'Accepted' ? 'text-emerald-400' : s.status === 'Wrong Answer' ? 'text-red-400' : 'text-amber-400'}`}>
                  {s.status}
                </span>
                <span className="text-slate-600 text-xs font-mono">{s.lang}</span>
                <span className="text-slate-600 text-xs">{s.time}</span>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`border rounded-2xl p-5 text-center ${badge.color}`}>
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">{badge.name}</h3>
                <p className="text-slate-400 text-xs">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: 'Total Submissions', value: '234', icon: <Code2 className="w-5 h-5 text-brand-400" />, trend: '+12 this week' },
              { label: 'Acceptance Rate', value: '67.5%', icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />, trend: '+3.2% vs last month' },
              { label: 'Longest Streak', value: '21 days', icon: <Flame className="w-5 h-5 text-orange-400" />, trend: 'Current: 14 days' },
              { label: 'Contest Participated', value: '8', icon: <Trophy className="w-5 h-5 text-amber-400" />, trend: 'Best rank: #145' },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass border border-white/[0.08] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center">
                    {s.icon}
                  </div>
                  <p className="text-slate-400 text-sm">{s.label}</p>
                </div>
                <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                <p className="text-slate-500 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  {s.trend}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
