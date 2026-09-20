import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2, Swords, BookOpen, Trophy, Bot, Flame, Search, Bell,
  Menu, X, Sparkles, User, LogOut, ChevronRight
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV_LINKS = [
  { label: 'Explore', href: '/problems', icon: Code2 },
  { label: 'Contest', href: '/contest', icon: Swords },
  { label: 'Roadmap', href: '/roadmap', icon: BookOpen },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { label: 'AI Tutor', href: '/ai-tutor', icon: Bot },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  const isActive = (href) => location.pathname === href

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-[#282828] text-[#eff1f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#ffa116] to-[#ff7a00] flex items-center justify-center shadow-md shadow-[#ffa116]/20 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5 text-[#0a0a0a]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#ffa116] transition-colors">
                  Code<span className="text-[#ffa116]">Master</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href, icon: Icon }) => {
                const active = isActive(href)
                return (
                  <Link
                    key={href}
                    to={href}
                    className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? 'text-white bg-[#282828] border border-[#3e3e3e]'
                        : 'text-gray-400 hover:text-white hover:bg-[#282828]/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-[#ffa116]' : 'text-gray-400'}`} />
                    <span>{label}</span>
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffa116] rounded-full"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            
            {/* Daily Challenge Pill */}
            <Link
              to="/problems/two-sum"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffa116]/10 text-[#ffa116] border border-[#ffa116]/30 text-xs font-semibold hover:bg-[#ffa116]/20 transition-all"
            >
              <Flame className="w-3.5 h-3.5 fill-[#ffa116]" />
              <span>Daily Challenge</span>
              <ChevronRight className="w-3 h-3" />
            </Link>

            {/* Streak Counter */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#282828] border border-[#3e3e3e] text-xs font-semibold text-gray-300">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>14 Days</span>
            </div>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#282828] transition-colors"
              title="Search problems"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User Profile & Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#282828] border border-[#3e3e3e] hover:border-[#ffa116] transition-colors"
                >
                  <div className="w-6 h-6 rounded bg-[#ffa116] text-[#0a0a0a] text-xs font-bold flex items-center justify-center">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span className="text-xs font-medium text-white max-w-[90px] truncate">
                    {user?.name || 'User'}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-[#282828] transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/signin"
                  className="px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#ffa116] text-[#0a0a0a] hover:bg-[#ffb340] transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#282828]"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Search Drawer */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-b border-[#3e3e3e] bg-[#282828] px-4 py-3"
          >
            <div className="max-w-3xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search LeetCode problems, categories, tags..."
                className="w-full bg-[#1a1a1a] border border-[#3e3e3e] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#ffa116]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/problems?search=${e.target.value}`)
                    setSearchOpen(false)
                  }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[#3e3e3e] bg-[#1a1a1a] px-4 py-3 space-y-2"
          >
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-[#282828]"
              >
                <Icon className="w-4 h-4 text-[#ffa116]" />
                <span>{label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
