import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, MessageCircle, Mail, ArrowRight, Zap } from 'lucide-react'
import { Github, Twitter, Linkedin } from '../common/BrandIcons'
import { motion } from 'framer-motion'

const footerLinks = [
  {
    heading: 'Platform',
    links: [
      { label: 'Problems', to: '/problems' },
      { label: 'AI Tutor', to: '/ai-tutor' },
      { label: 'Roadmap', to: '/roadmap' },
      { label: 'Contest', to: '/contest' },
      { label: 'Leaderboard', to: '/leaderboard' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Blog', to: '/blog' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press', to: '/press' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Documentation', to: '/docs' },
      { label: 'API', to: '/api' },
      { label: 'Status', to: '/status' },
      { label: 'Changelog', to: '/changelog' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
      { label: 'Cookies', to: '/cookies' },
      { label: 'Security', to: '/security' },
    ],
  },
]

const socialLinks = [
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com',
  },
  {
    label: 'Twitter / X',
    icon: Twitter,
    href: 'https://twitter.com',
  },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com',
  },
  {
    label: 'Discord',
    icon: MessageCircle,
    href: 'https://discord.com',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubscribed(true)
      setEmail('')
    }, 1200)
  }

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/[0.06] bg-[#030712]">
      {/* ── ambient background glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* left glow */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-[120px]" />
        {/* right glow */}
        <div className="absolute -bottom-20 -right-20 h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ══════════════════════════════════════════
            TOP SECTION — Logo + Nav Columns + Newsletter
        ══════════════════════════════════════════ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-12 pb-12 pt-16 lg:grid-cols-12"
        >
          {/* ── Brand block (col 1-4) ── */}
          <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-6">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-2.5 w-fit">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-violet-500/30 transition-all duration-300 group-hover:shadow-violet-500/50 group-hover:scale-105">
                <Brain className="h-5 w-5 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Algo<span className="text-violet-400">Mind</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Don't just solve problems.{' '}
              <span className="font-medium text-gray-300">Understand them.</span>
            </p>

            {/* Status badge */}
            <div className="flex items-center gap-2 w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-400">All systems operational</span>
            </div>

            {/* Powered-by line */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Zap className="h-3.5 w-3.5 text-violet-500" />
              <span>Powered by advanced AI models</span>
            </div>
          </motion.div>

          {/* ── Nav columns (col 5-9) ── */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerLinks.map((section) => (
              <motion.div key={section.heading} variants={itemVariants} className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {section.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ── Newsletter (col 10-12) ── */}
          <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col gap-5">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">
                Stay in the loop
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Get the latest problems, features, and tips — right in your inbox.
              </p>
            </div>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3"
              >
                <span className="text-lg">🎉</span>
                <div>
                  <p className="text-sm font-medium text-emerald-400">You're subscribed!</p>
                  <p className="text-xs text-gray-500">Watch your inbox for updates.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-violet-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-9 pr-4 text-sm text-gray-200 placeholder-gray-600 outline-none ring-0 transition-all duration-200 focus:border-violet-500/60 focus:bg-white/[0.07] focus:ring-1 focus:ring-violet-500/30"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Subscribing…</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </motion.button>
                <p className="text-[11px] text-gray-600">
                  No spam, ever. Unsubscribe at any time.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {/* ══════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-between gap-5 py-7 sm:flex-row"
        >
          {/* Copyright */}
          <p className="text-xs text-gray-600 order-2 sm:order-1">
            © 2025{' '}
            <Link to="/" className="text-gray-500 hover:text-violet-400 transition-colors duration-200">
              AlgoMind
            </Link>
            . All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-1 order-1 sm:order-2">
            {socialLinks.map(({ label, icon: Icon, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="group relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-gray-500 transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-400"
              >
                <Icon className="h-4 w-4" />
                {/* tooltip */}
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-[10px] text-gray-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  {label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Made with love */}
          <p className="flex items-center gap-1.5 text-xs text-gray-600 order-3">
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="text-rose-500"
            >
              ❤️
            </motion.span>{' '}
            for developers
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
