import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, Filter, ChevronDown, CheckCircle2, Circle, Clock,
  Bookmark, BookmarkCheck, ExternalLink, Zap, BarChart2, Code2,
  SlidersHorizontal, X, Star, Building2
} from 'lucide-react'
import { problems } from '../../data/problems'

const difficulties = ['Easy', 'Medium', 'Hard']
const allTags = ['Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Two Pointers', 'Binary Search', 'Tree', 'Graph', 'Stack', 'Queue', 'Linked List', 'Recursion', 'Greedy', 'BFS', 'DFS', 'Sliding Window', 'Heap', 'Trie']
const allCompanies = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Adobe', 'Uber', 'Netflix', 'Bloomberg', 'Goldman Sachs']

function DifficultyBadge({ level }) {
  const cls = { Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard' }
  return <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls[level]}`}>{level}</span>
}

function StatusDot({ status }) {
  if (status === 'solved') return <CheckCircle2 className="w-4 h-4 text-emerald-400" />
  if (status === 'attempted') return <Clock className="w-4 h-4 text-amber-400" />
  return <Circle className="w-4 h-4 text-slate-600" />
}

export default function ProblemsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [diffFilter, setDiffFilter] = useState([])
  const [tagFilter, setTagFilter] = useState([])
  const [companyFilter, setCompanyFilter] = useState([])
  const [statusFilter, setStatusFilter] = useState('all') // all | solved | unsolved
  const [sortBy, setSortBy] = useState('id') // id | difficulty | acceptance
  const [showFilters, setShowFilters] = useState(false)
  const [bookmarks, setBookmarks] = useState(new Set([1, 5, 10]))
  const [solvedSet] = useState(new Set([1, 2, 3, 6, 7]))

  const filtered = useMemo(() => {
    let list = problems.filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
      if (diffFilter.length && !diffFilter.includes(p.difficulty)) return false
      if (tagFilter.length && !tagFilter.some(t => p.tags.includes(t))) return false
      if (companyFilter.length && !companyFilter.some(c => p.companies.includes(c))) return false
      if (statusFilter === 'solved' && !solvedSet.has(p.id)) return false
      if (statusFilter === 'unsolved' && solvedSet.has(p.id)) return false
      return true
    })
    if (sortBy === 'acceptance') list = [...list].sort((a, b) => b.acceptance - a.acceptance)
    else if (sortBy === 'difficulty') {
      const order = { Easy: 0, Medium: 1, Hard: 2 }
      list = [...list].sort((a, b) => order[a.difficulty] - order[b.difficulty])
    }
    return list
  }, [search, diffFilter, tagFilter, companyFilter, statusFilter, sortBy, solvedSet])

  const toggleFilter = (arr, setArr, val) => {
    setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
  }

  const toggleBookmark = (id, e) => {
    e.stopPropagation()
    setBookmarks(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  const stats = useMemo(() => ({
    easy: problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard').length,
    solved: solvedSet.size,
  }), [solvedSet])

  const activeFilters = diffFilter.length + tagFilter.length + companyFilter.length

  return (
    <div className="min-h-screen bg-[#030712] pt-6 pb-20">
      <div className="section-container">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">
            Problem <span className="gradient-text">Explorer</span>
          </h1>
          <p className="text-slate-400">Curated coding challenges to sharpen your algorithmic thinking.</p>
        </motion.div>

        {/* Stats Row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: problems.length, color: 'text-white' },
            { label: 'Easy', value: stats.easy, color: 'text-emerald-400' },
            { label: 'Medium', value: stats.medium, color: 'text-amber-400' },
            { label: 'Hard', value: stats.hard, color: 'text-red-400' },
          ].map((s, i) => (
            <div key={i} className="glass border border-white/[0.08] rounded-xl p-4 text-center">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search problems..."
              className="input-field pl-10 w-full"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Difficulty quick filter */}
          <div className="flex gap-2">
            {difficulties.map(d => (
              <button key={d}
                onClick={() => toggleFilter(diffFilter, setDiffFilter, d)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  diffFilter.includes(d)
                    ? d === 'Easy' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                    : d === 'Medium' ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : 'bg-red-500/20 border-red-500/40 text-red-400'
                    : 'glass border-white/[0.10] text-slate-400 hover:text-white'
                }`}>
                {d}
              </button>
            ))}
          </div>

          {/* Sort + Filters */}
          <div className="flex gap-2">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="input-field w-auto pr-8 text-sm">
              <option value="id">Default</option>
              <option value="difficulty">Difficulty</option>
              <option value="acceptance">Acceptance</option>
            </select>
            <button onClick={() => setShowFilters(v => !v)}
              className={`btn-secondary flex-shrink-0 relative ${showFilters ? 'border-brand-500/40 text-brand-400' : ''}`}>
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilters > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }}
            className="glass border border-white/[0.10] rounded-2xl p-5 mb-6 overflow-hidden">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Tags */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-brand-400" /> Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button key={tag}
                      onClick={() => toggleFilter(tagFilter, setTagFilter, tag)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                        tagFilter.includes(tag)
                          ? 'bg-brand-600/30 border-brand-500/50 text-brand-300'
                          : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                      }`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Companies */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" /> Companies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {allCompanies.map(c => (
                    <button key={c}
                      onClick={() => toggleFilter(companyFilter, setCompanyFilter, c)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                        companyFilter.includes(c)
                          ? 'bg-cyan-600/30 border-cyan-500/50 text-cyan-300'
                          : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
                      }`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-emerald-400" /> Status
                </h4>
                <div className="space-y-2">
                  {[['all', 'All Problems'], ['solved', 'Solved'], ['unsolved', 'Unsolved']].map(([val, label]) => (
                    <button key={val} onClick={() => setStatusFilter(val)}
                      className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm border transition-all ${
                        statusFilter === val
                          ? 'bg-brand-600/20 border-brand-500/30 text-white'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                      }`}>
                      <div className={`w-2 h-2 rounded-full ${statusFilter === val ? 'bg-brand-400' : 'bg-slate-600'}`} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {activeFilters > 0 && (
              <div className="mt-4 pt-4 border-t border-white/[0.08]">
                <button onClick={() => { setDiffFilter([]); setTagFilter([]); setCompanyFilter([]); setStatusFilter('all') }}
                  className="btn-ghost text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  <X className="w-4 h-4" /> Clear all filters
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Results count */}
        <div className="text-slate-500 text-sm mb-4">
          Showing <span className="text-white font-medium">{filtered.length}</span> of {problems.length} problems
        </div>

        {/* Problem Table */}
        <div className="glass border border-white/[0.08] rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.08] text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">Acceptance</div>
            <div className="col-span-1 text-center">Companies</div>
            <div className="col-span-1 text-center">Save</div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Search className="w-10 h-10 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500">No problems found. Try different filters.</p>
            </div>
          ) : (
            filtered.map((problem, i) => (
              <motion.div key={problem.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                onClick={() => navigate(`/problems/${problem.slug}`)}
                className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/[0.04] hover:bg-white/[0.03] cursor-pointer transition-colors items-center group"
              >
                <div className="col-span-1 flex items-center justify-center">
                  <StatusDot status={solvedSet.has(problem.id) ? 'solved' : undefined} />
                </div>
                <div className="col-span-5">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm group-hover:text-brand-300 transition-colors">
                      {problem.id}. {problem.title}
                    </span>
                    {problem.isPremium && (
                      <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {problem.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-500 text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <DifficultyBadge level={problem.difficulty} />
                </div>
                <div className="col-span-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/[0.08] rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500/60 rounded-full" style={{ width: `${problem.acceptance}%` }} />
                    </div>
                    <span className="text-xs">{problem.acceptance}%</span>
                  </div>
                </div>
                <div className="col-span-1 flex justify-center">
                  {problem.companies.length > 0 && (
                    <div className="flex -space-x-1">
                      {problem.companies.slice(0, 3).map((c, ci) => (
                        <div key={ci} title={c}
                          className="w-5 h-5 rounded-full border border-[#030712] flex items-center justify-center text-[8px] font-bold text-white"
                          style={{ background: `hsl(${ci * 60 + 220}, 60%, 40%)` }}>
                          {c[0]}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-span-1 flex justify-center">
                  <button onClick={e => toggleBookmark(problem.id, e)}
                    className="text-slate-600 hover:text-brand-400 transition-colors">
                    {bookmarks.has(problem.id)
                      ? <BookmarkCheck className="w-4 h-4 text-brand-400" />
                      : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
