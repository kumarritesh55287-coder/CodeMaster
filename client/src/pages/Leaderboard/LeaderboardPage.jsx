import { Trophy, Star, Award, Shield, Search } from 'lucide-react'

const TOP_RANKERS = [
  { rank: 1, name: 'tourist', rating: 3482, solved: 1420, country: '🇺🇸', badge: 'Guardian' },
  { rank: 2, name: 'benq', rating: 3340, solved: 1380, country: '🇨🇦', badge: 'Guardian' },
  { rank: 3, name: 'neal_wu', rating: 3210, solved: 1290, country: '🇬🇧', badge: 'Guardian' },
  { rank: 4, name: 'makoto', rating: 3105, solved: 1150, country: '🇯🇵', badge: 'Knight' },
  { rank: 5, name: 'alec_coder', rating: 2980, solved: 1040, country: '🇮🇳', badge: 'Knight' },
]

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#424933] text-[#eff1f6] pt-[#3.5rem] pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>Global LeetCode Rankings</span>
            <Trophy className="w-6 h-6 text-[#ffc01e]" />
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Top competitive coders ranked by contest rating and problem solution count worldwide.
          </p>
        </div>

        {/* Table */}
        <div className="lc-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#202020] border-b border-[#383838] text-gray-400 uppercase font-semibold">
                <th className="py-3.5 px-4 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Badge</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Solved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#383838]">
              {TOP_RANKERS.map((u) => (
                <tr key={u.rank} className="hover:bg-[#323232] transition-colors">
                  <td className="py-4 px-4 text-center font-bold text-sm">
                    {u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : u.rank === 3 ? '🥉' : `#${u.rank}`}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{u.country}</span>
                      <span>{u.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#ffa116]/10 text-[#ffa116] font-bold text-[10px]">
                      {u.badge}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-[#ffc01e]">{u.rating}</td>
                  <td className="py-4 px-4 font-mono text-gray-300">{u.solved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
