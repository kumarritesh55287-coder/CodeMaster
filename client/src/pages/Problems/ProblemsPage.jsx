import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, Filter, CheckCircle2, Circle, Clock, Shuffle,
  Code2, Star, Building2, Flame, ArrowRight, Tag
} from 'lucide-react'
import { MOCK_PROBLEMS } from '../../data/problemsData'

const CATEGORIES = [
  'All Topics',
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Linked List',
  'Trees & Graphs'
]

export default function ProblemsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All Topics')

  // Filter problems
  const filteredProblems = useMemo(() => {
    return MOCK_PROBLEMS.filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.category.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (selectedDifficulty !== 'All' && p.difficulty !== selectedDifficulty) {
        return false
      }
      if (selectedCategory !== 'All Topics' && p.category !== selectedCategory) {
        return false
      }
      return true
    })
  }, [search, selectedDifficulty, selectedCategory])

  // Pick Random Problem
  const handlePickRandom = () => {
    const randomProb = MOCK_PROBLEMS[Math.floor(Math.random() * MOCK_PROBLEMS.length)]
    navigate(`/problems/${randomProb.slug}`)
  }

  return (
    <div className="min-h-screen bg-[#424933] text-[#eff1f6] pt-[#3.5rem] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>LeetCode Problemset</span>
              <span className="text-[#ffa116]">⚡</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Practice data structures, algorithms, and real tech interview questions with instant code evaluation.
            </p>
          </div>

          <button
            onClick={handlePickRandom}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#282828] border border-[#3e3e3e] hover:border-[#ffa116] text-xs font-bold text-white transition-all shadow-md group"
          >
            <Shuffle className="w-4 h-4 text-[#ffa116] group-hover:rotate-180 transition-transform duration-300" />
            <span>Pick One (Random)</span>
          </button>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#ffa116] text-[#0a0a0a] shadow-md shadow-[#ffa116]/20'
                  : 'bg-[#282828] border border-[#3e3e3e] text-gray-300 hover:bg-[#323232]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Difficulty Filter Bar */}
        <div className="bg-[#282828] border border-[#3e3e3e] rounded-xl p-3 mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problems, topics, or companies..."
              className="w-full bg-[#1a1a1a] border border-[#3e3e3e] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ffa116]"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-semibold text-gray-400">Difficulty:</span>
            {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-[#383838] text-white border border-[#484848]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Problemset Table */}
        <div className="bg-[#282828] border border-[#3e3e3e] rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#202020] border-b border-[#383838] text-gray-400 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-12 text-center">Status</th>
                  <th className="py-3.5 px-4">Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Acceptance</th>
                  <th className="py-3.5 px-4">Difficulty</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#383838]">
                {filteredProblems.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => navigate(`/problems/${p.slug}`)}
                    className="hover:bg-[#323232] cursor-pointer transition-colors group"
                  >
                    <td className="py-4 px-4 text-center">
                      {p.status === 'Solved' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#00b8a3] mx-auto" />
                      ) : p.status === 'Attempted' ? (
                        <Clock className="w-4 h-4 text-[#ffc01e] mx-auto" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white group-hover:text-[#ffa116] transition-colors text-sm">
                        {p.title}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        {p.tags?.slice(0, 2).map(tag => (
                          <span key={tag} className="px-1.5 py-0.5 rounded bg-[#1a1a1a] text-[10px] text-gray-400 border border-[#383838]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300 font-medium">{p.category}</td>
                    <td className="py-4 px-4 text-gray-400 font-mono">{p.acceptance}</td>
                    <td className="py-4 px-4">
                      <span className={p.difficulty === 'Easy' ? 'badge-easy' : p.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}>
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to={`/problems/${p.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ffa116]/10 text-[#ffa116] hover:bg-[#ffa116] hover:text-[#0a0a0a] font-bold text-xs transition-all"
                      >
                        <span>Solve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
