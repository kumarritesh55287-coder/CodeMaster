import { Link } from 'react-router-dom'
import { BookOpen, CheckCircle2, ArrowRight, Star, Sparkles } from 'lucide-react'

const SHEETS = [
  {
    title: 'NeetCode 150',
    count: '150 Problems',
    desc: 'The essential core curriculum to master coding interviews at top tech companies.',
    progress: '45%'
  },
  {
    title: 'Blind 75',
    count: '75 Problems',
    desc: 'Most frequently asked interview questions condensed into a high-yield study sheet.',
    progress: '70%'
  },
  {
    title: 'Striver SDE Sheet',
    count: '180 Problems',
    desc: 'Comprehensive step-by-step roadmap covering Data Structures & Algorithms from basics to advanced.',
    progress: '30%'
  }
]

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-[#424933] text-[#eff1f6] pt-[#3.5rem] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>Interview Study Roadmaps</span>
            <BookOpen className="w-6 h-6 text-[#ffa116]" />
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Curated problem tracks designed by FAANG engineers to take you from beginner to advanced.
          </p>
        </div>

        {/* Sheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SHEETS.map(sheet => (
            <div key={sheet.title} className="lc-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffa116]/10 text-[#ffa116] text-xs font-bold">
                    {sheet.count}
                  </span>
                  <span className="text-xs font-mono text-[#00b8a3] font-bold">{sheet.progress} Complete</span>
                </div>
                <h3 className="text-xl font-bold text-white">{sheet.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{sheet.desc}</p>
              </div>

              <Link
                to="/problems"
                className="w-full py-2.5 rounded-xl bg-[#ffa116] text-[#0a0a0a] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#ffb340] transition-colors"
              >
                <span>Start Practice</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
