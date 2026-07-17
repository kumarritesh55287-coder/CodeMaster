import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Code2, Trophy, Swords, BookOpen, Search, Bell, Menu, X, Zap } from 'lucide-react'

// ─── Nav Links Config ────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Problems',    href: '/problems',    icon: Code2 },
  { label: 'Roadmap',     href: '/roadmap',     icon: BookOpen },
  { label: 'Contest',     href: '/contest',     icon: Swords },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { label: 'AI Tutor',    href: '/ai-tutor',    icon: Brain },
]

// ─── Animation Variants ───────────────────────────────────────────────────────
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
}

const mobileItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.28, ease: 'easeOut' },
  }),
}

const logoVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.2, ease: 'easeOut' } },
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Close mobile menu on route change ────────────────────────────────────
  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  const isActive = (href) => location.pathname === href

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <motion.div
            variants={logoVariants}
            initial="rest"
            whileHover="hover"
            className="flex-shrink-0"
          >
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="AlgoMind home">
              {/* Icon cluster */}
              <div className="relative w-8 h-8">
                {/* Glow ring */}
                <span className="absolute inset-0 rounded-lg bg-brand-600/30 blur-[6px] group-hover:bg-brand-500/50 transition-colors duration-300" />
                <span className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-cyan-500 shadow-lg shadow-brand-600/30">
                  <Brain className="w-4.5 h-4.5 text-white" strokeWidth={2} />
                </span>
              </div>

              {/* Wordmark */}
              <span className="text-xl font-bold tracking-tight gradient-text">
                AlgoMind
              </span>

              {/* Beta pill */}
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                BETA
              </span>
            </Link>
          </motion.div>

          {/* ── Desktop Nav ──────────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href, icon: Icon }) => {
              const active = isActive(href)
              return (
                <Link
                  key={href}
                  to={href}
                  className={[
                    'relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium',
                    'transition-all duration-200 group',
                    active
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white',
                  ].join(' ')}
                  aria-current={active ? 'page' : undefined}
                >
                  {/* Active / hover background */}
                  <span
                    className={[
                      'absolute inset-0 rounded-lg transition-opacity duration-200',
                      active
                        ? 'opacity-100 bg-white/[0.07] border border-white/[0.08]'
                        : 'opacity-0 group-hover:opacity-100 bg-white/[0.04]',
                    ].join(' ')}
                  />

                  {/* Active indicator dot */}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}

                  <Icon
                    className={[
                      'relative w-3.5 h-3.5 transition-colors duration-200',
                      active ? 'text-brand-400' : 'text-gray-500 group-hover:text-gray-300',
                    ].join(' ')}
                    strokeWidth={2}
                  />
                  <span className="relative">{label}</span>
                </Link>
              )
            })}
          </nav>

          {/* ── Right Actions ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-2">

            {/* Search */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setSearchOpen((p) => !p)}
              className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" strokeWidth={2} />
            </motion.button>

            {/* Bell — desktop only */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="hidden sm:flex relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5" strokeWidth={2} />
              {/* Unread dot */}
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 ring-1 ring-[#030712]" />
            </motion.button>

            {/* Divider */}
            <span className="hidden sm:block w-px h-5 bg-white/10 mx-1" />

            {/* Sign In — ghost */}
            <Link
              to="/signin"
              className="hidden sm:inline-flex btn-secondary text-sm py-1.5 px-4"
            >
              Sign In
            </Link>

            {/* Start Free — primary */}
            <Link
              to="/signup"
              className="hidden sm:inline-flex btn-primary text-sm py-1.5 px-4 gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" strokeWidth={2.5} />
              Start Free
            </Link>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="w-5 h-5" strokeWidth={2} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="w-5 h-5" strokeWidth={2} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Search Bar (expandable) ───────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search-bar"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="border-t border-white/[0.06] bg-[#030712]/80 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" strokeWidth={2} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search problems, topics, contests…"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-500/60 focus:bg-white/[0.06] transition-all duration-200"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-gray-500 bg-white/[0.04] border border-white/[0.08] rounded-md">
                  ESC
                </kbd>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Menu ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#030712]/90 backdrop-blur-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">

              {/* Nav links */}
              {NAV_LINKS.map(({ label, href, icon: Icon }, i) => {
                const active = isActive(href)
                return (
                  <motion.div
                    key={href}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      to={href}
                      className={[
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                        active
                          ? 'bg-brand-600/20 text-white border border-brand-500/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.04]',
                      ].join(' ')}
                      aria-current={active ? 'page' : undefined}
                    >
                      <Icon
                        className={active ? 'w-4 h-4 text-brand-400' : 'w-4 h-4 text-gray-500'}
                        strokeWidth={2}
                      />
                      {label}
                      {active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />
                      )}
                    </Link>
                  </motion.div>
                )
              })}

              {/* Divider */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                className="my-2 border-t border-white/[0.06]"
              />

              {/* Mobile CTA buttons */}
              <motion.div
                custom={NAV_LINKS.length + 1}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-2 px-0 pb-2"
              >
                <Link
                  to="/signin"
                  className="btn-secondary text-sm py-2.5 text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-sm py-2.5 justify-center gap-2"
                >
                  <Zap className="w-4 h-4" strokeWidth={2.5} />
                  Start Free — It's Free!
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
