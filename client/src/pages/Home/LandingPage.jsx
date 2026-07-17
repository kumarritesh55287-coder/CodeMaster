import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Brain, Zap, Code2, Trophy, Users, Star, ChevronRight,
  CheckCircle2, ArrowRight, Sparkles, Bot, BarChart3,
  Target, Layers, Globe, Shield, Clock, TrendingUp,
  Play, ChevronDown, X, Terminal, GitBranch, Cpu
} from 'lucide-react'

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ─────────────────────────────────────────────
   TYPING EFFECT
───────────────────────────────────────────── */
const words = ['Think.', 'Debug.', 'Optimize.', 'Succeed.']
function TypingText() {
  const [index, setIndex] = useState(0)
  const [sub, setSub] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (sub < word.length) setSub(s => s + 1)
        else setTimeout(() => setDeleting(true), 1500)
      } else {
        if (sub > 0) setSub(s => s - 1)
        else { setDeleting(false); setIndex(i => (i + 1) % words.length) }
      }
    }, deleting ? 60 : 100)
    return () => clearTimeout(timeout)
  }, [sub, deleting, index])

  return (
    <span className="gradient-text">
      {words[index].slice(0, sub)}
      <span className="animate-pulse">|</span>
    </span>
  )
}

/* ─────────────────────────────────────────────
   FLOATING CODE CARD
───────────────────────────────────────────── */
function CodeCard({ delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className="glass border border-white/[0.10] rounded-2xl p-4 font-mono text-xs leading-relaxed shadow-card"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-slate-500 text-[10px]">solution.py</span>
      </div>
      <pre className="text-slate-300 overflow-hidden">
        <span className="text-brand-400">def</span>{' '}
        <span className="text-cyan-400">twoSum</span>
        <span className="text-slate-400">(nums, target):</span>
        {'\n'}
        {'  '}
        <span className="text-slate-500"># AI Mentor: Use HashMap!</span>
        {'\n'}
        {'  '}seen{' '}
        <span className="text-brand-400">=</span> {'{}'}
        {'\n'}
        {'  '}
        <span className="text-brand-400">for</span> i, n{' '}
        <span className="text-brand-400">in</span>{' '}
        <span className="text-cyan-400">enumerate</span>(nums):
        {'\n'}
        {'    '}complement{' '}
        <span className="text-brand-400">=</span> target{' '}
        <span className="text-brand-400">-</span> n{'\n'}
        {'    '}
        <span className="text-brand-400">if</span> complement{' '}
        <span className="text-brand-400">in</span> seen:
        {'\n'}
        {'      '}
        <span className="text-brand-400">return</span> [seen[complement], i]
        {'\n'}
        {'    '}seen[n]{' '}
        <span className="text-brand-400">=</span> i
      </pre>
      <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-3">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-emerald-400 text-[10px] font-medium">Accepted · O(n) · Runtime: 48ms</span>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   AI CHAT PREVIEW CARD
───────────────────────────────────────────── */
function AIChatCard({ delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.8 }}
      className="glass border border-brand-500/20 rounded-2xl p-4 shadow-glow"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-semibold text-brand-400">AlgoMind AI</span>
        <span className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-slate-500">online</span>
        </span>
      </div>
      <div className="space-y-2 text-xs">
        <div className="bg-white/[0.04] rounded-xl rounded-bl-sm p-2.5 text-slate-300 leading-relaxed">
          💡 Think about what data structure gives O(1) lookup. A <span className="text-cyan-400">HashMap</span> stores each number's index as you iterate — check if the complement exists before adding!
        </div>
        <div className="bg-brand-600/20 rounded-xl rounded-br-sm p-2.5 text-slate-300 ml-6 leading-relaxed">
          Oh! So I check <code className="text-brand-300">target - nums[i]</code> in the map first?
        </div>
        <div className="bg-white/[0.04] rounded-xl rounded-bl-sm p-2.5 text-slate-300 leading-relaxed">
          Exactly! 🎯 Time: O(n), Space: O(n). You've got it!
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   FEATURE CARD
───────────────────────────────────────────── */
const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: 'AI Coding Mentor',
    desc: 'Your personal AI that teaches you to think — not just solve. Get Socratic guidance, algorithm breakdowns, and step-by-step walkthroughs.',
    color: 'from-brand-600/20 to-purple-900/10',
    border: 'border-brand-500/20',
    iconBg: 'bg-brand-600/20 text-brand-400',
    highlight: 'CORE FEATURE',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Visual Algorithm Animations',
    desc: 'See algorithms come alive. BFS/DFS traversals, DP tables, recursion trees, linked list animations — generated on demand.',
    color: 'from-cyan-600/10 to-blue-900/10',
    border: 'border-cyan-500/20',
    iconBg: 'bg-cyan-600/20 text-cyan-400',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Smart Learning Paths',
    desc: 'AI-curated roadmaps that adapt to your progress. From DSA fundamentals to FAANG-level mastery, every step is personalized.',
    color: 'from-emerald-600/10 to-green-900/10',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-600/20 text-emerald-400',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Deep Analytics',
    desc: 'Track your weak spots, submission history, complexity analysis, and interview readiness with beautiful skill graphs.',
    color: 'from-amber-600/10 to-orange-900/10',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-600/20 text-amber-400',
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: 'Live Contests',
    desc: 'Weekly and monthly contests with real-time leaderboards, rating systems, and performance insights to keep you sharp.',
    color: 'from-pink-600/10 to-rose-900/10',
    border: 'border-pink-500/20',
    iconBg: 'bg-pink-600/20 text-pink-400',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Company Prep',
    desc: 'Curated problem sets for Google, Amazon, Meta, Microsoft and 10+ top companies. Know exactly what to practice.',
    color: 'from-violet-600/10 to-indigo-900/10',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-600/20 text-violet-400',
  },
]

/* ─────────────────────────────────────────────
   STATS
───────────────────────────────────────────── */
const stats = [
  { label: 'Problems', value: 2800, suffix: '+' },
  { label: 'Learners', value: 500000, suffix: '+' },
  { label: 'AI Explanations', value: 10000000, suffix: '+' },
  { label: 'Countries', value: 120, suffix: '+' },
]

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer @ Google',
    avatar: 'PS',
    rating: 5,
    text: "AlgoMind's AI mentor changed how I approach problems. Instead of just memorizing solutions, I finally understand the 'why' behind every algorithm. Got my Google offer after 3 months!",
    color: 'from-brand-500 to-purple-600',
  },
  {
    name: 'Rahul Verma',
    role: 'CS Student, IIT Delhi',
    avatar: 'RV',
    rating: 5,
    text: "The visual animations for DP and graphs are mind-blowing. Concepts I struggled with for years clicked in minutes. The AI explains in Hinglish too which is perfect for me!",
    color: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Ananya Patel',
    role: 'Backend Dev @ Amazon',
    avatar: 'AP',
    rating: 5,
    text: "The AI-generated dry runs and recursion trees are genuinely better than any YouTube tutorial. AlgoMind feels like having a senior engineer guiding you 24/7.",
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Karan Mehta',
    role: 'Competitive Programmer',
    avatar: 'KM',
    rating: 5,
    text: "The contest system and rating algorithm are excellent. Real-time leaderboards, detailed post-contest analysis — this is the platform competitive programmers needed.",
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Sneha Reddy',
    role: 'Fresher → SDE @ Microsoft',
    avatar: 'SR',
    rating: 5,
    text: "From zero DSA knowledge to Microsoft offer in 6 months. The structured roadmap and AI mentor kept me on track every single day. Best investment of my career.",
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Dev Kapoor',
    role: 'Senior SDE @ Meta',
    avatar: 'DK',
    rating: 5,
    text: "Even as an experienced engineer, the complexity analysis and advanced topic explanations are top-notch. The bit manipulation and graph algorithm breakdowns are exceptional.",
    color: 'from-violet-500 to-indigo-600',
  },
]

/* ─────────────────────────────────────────────
   PRICING
───────────────────────────────────────────── */
const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    desc: 'Perfect for getting started',
    color: 'border-white/[0.10]',
    features: [
      '50 free problems',
      'Basic AI explanations',
      'Community discussions',
      '3 AI mentor chats/day',
      'Progress tracking',
    ],
    cta: 'Get Started Free',
    ctaClass: 'btn-secondary w-full justify-center',
  },
  {
    name: 'Pro',
    price: 499,
    period: 'month',
    desc: 'For serious interview prep',
    color: 'border-brand-500/40',
    popular: true,
    features: [
      'All 2800+ problems',
      'Unlimited AI mentor',
      'Visual algorithm animations',
      'Company-specific paths',
      'Contest access & rating',
      'Detailed analytics',
      'Priority support',
      'Hindi/Hinglish explanations',
    ],
    cta: 'Start Pro Trial',
    ctaClass: 'btn-primary w-full justify-center',
  },
  {
    name: 'Team',
    price: 1999,
    period: 'month',
    desc: 'For bootcamps & colleges',
    color: 'border-cyan-500/20',
    features: [
      'Everything in Pro',
      'Up to 20 members',
      'Admin dashboard',
      'Custom problem sets',
      'Progress reports',
      'Bulk billing',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    ctaClass: 'btn-secondary w-full justify-center',
  },
]

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
const faqs = [
  {
    q: 'How is AlgoMind different from LeetCode?',
    a: "AlgoMind's core philosophy is teaching you HOW TO THINK, not just providing problems. Our AI mentor guides you Socratically, never giving away answers directly. We have visual animations, roadmaps, company prep paths, and multi-language explanations that LeetCode doesn't offer.",
  },
  {
    q: 'Is the AI mentor actually useful or just a gimmick?',
    a: 'Our AI mentor is deeply integrated. It can explain algorithms step-by-step, generate dry runs for your specific input, create recursion trees, visualize DP tables, analyze your code\'s time/space complexity, find bugs in your logic, and even explain concepts in Hindi or Hinglish.',
  },
  {
    q: 'What programming languages are supported?',
    a: 'We support C++, Java, Python, JavaScript, TypeScript, Go, Rust, C#, PHP, Kotlin, and Swift. Our code editor has syntax highlighting, autocomplete, and theme options.',
  },
  {
    q: 'Can beginners use AlgoMind effectively?',
    a: "Absolutely. Our DSA Fundamentals roadmap starts from scratch. The AI mentor adapts to your level — it won't overwhelm beginners with jargon. We also have curated beginner paths with easier problems and more detailed explanations.",
  },
  {
    q: 'Is the ₹499/month price worth it?',
    a: "Consider the ROI: a FAANG offer can be worth ₹50L+ annually. Our Pro plan gives you unlimited AI mentor access, all 2800+ problems, visual animations, and company-specific prep. Most users report getting interview-ready 3x faster vs. free alternatives.",
  },
  {
    q: 'Do you have a student discount?',
    a: "Yes! Students with a valid .edu email get 50% off the Pro plan. We also offer 30-day free trials so you can experience the full platform before committing.",
  },
]

/* ─────────────────────────────────────────────
   COMPANIES MARQUEE
───────────────────────────────────────────── */
const companies = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix', 'Uber', 'Adobe', 'Bloomberg', 'Goldman Sachs', 'Flipkart', 'Atlassian']

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
const steps = [
  {
    step: '01',
    title: 'Choose Your Path',
    desc: 'Pick from AI-curated roadmaps based on your goal — FAANG prep, competitive programming, or DSA mastery.',
    icon: <Target className="w-8 h-8" />,
    color: 'text-brand-400',
    bg: 'bg-brand-600/10 border-brand-500/20',
  },
  {
    step: '02',
    title: 'Solve with AI Guidance',
    desc: "Work through problems with your AI mentor. Get hints, not answers. Understand the algorithm, the complexity, the tradeoffs.",
    icon: <Bot className="w-8 h-8" />,
    color: 'text-cyan-400',
    bg: 'bg-cyan-600/10 border-cyan-500/20',
  },
  {
    step: '03',
    title: 'Visualize & Internalize',
    desc: 'Watch animations of your algorithm executing. See the recursion tree, the DP table, the graph traversal unfold.',
    icon: <Layers className="w-8 h-8" />,
    color: 'text-emerald-400',
    bg: 'bg-emerald-600/10 border-emerald-500/20',
  },
  {
    step: '04',
    title: 'Track & Level Up',
    desc: 'Monitor your progress with beautiful analytics. Compete in contests. Earn badges. Land your dream offer.',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'text-amber-400',
    bg: 'bg-amber-600/10 border-amber-500/20',
  },
]

/* ─────────────────────────────────────────────
   FADE IN SECTION WRAPPER
───────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MAIN LANDING PAGE
───────────────────────────────────────────── */
export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [billingAnnual, setBillingAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-[#030712] overflow-x-hidden">

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh bg-grid pt-24 pb-20">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 text-sm text-brand-400 font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Coding Education Platform
                <span className="px-2 py-0.5 rounded-full bg-brand-600/30 text-brand-300 text-xs">New</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6"
              >
                Learn to{' '}
                <TypingText />
                <br />
                <span className="text-white">with AI.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl"
              >
                Don't just solve problems.{' '}
                <span className="text-white font-medium">Understand them.</span>{' '}
                AlgoMind's AI mentor teaches you to think algorithmically — through visual breakdowns, guided hints, and Socratic reasoning.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Link to="/signup" className="btn-primary text-base px-8 py-4 rounded-xl shadow-glow-lg">
                  <Zap className="w-5 h-5" />
                  Start Learning Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/problems" className="btn-secondary text-base px-8 py-4 rounded-xl">
                  <Play className="w-5 h-5" />
                  Explore Problems
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="flex -space-x-2">
                  {['PS', 'RV', 'AP', 'KM', 'SR'].map((av, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#030712] flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: `hsl(${260 + i * 30}, 70%, 50%)` }}
                    >
                      {av}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    <span className="text-white font-semibold ml-1">4.9</span>
                  </div>
                  <p className="text-slate-500 text-xs">Trusted by 500K+ developers</p>
                </div>
              </motion.div>
            </div>

            {/* Right — Animated Cards */}
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="grid gap-4">
                  <CodeCard delay={0.4} />
                  <AIChatCard delay={0.6} />
                  {/* Stats mini card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="glass border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">87%</p>
                      <p className="text-slate-500 text-xs">Users improved their interview pass rate</p>
                    </div>
                    <div className="ml-auto px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                      +23% ↑
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -top-4 -right-4 glass border border-amber-500/30 rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-amber-400 font-semibold">#1 AI Platform</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute -bottom-4 -left-4 glass border border-cyan-500/30 rounded-xl px-3 py-2 flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-cyan-400 font-semibold">Gemini Powered</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          COMPANIES MARQUEE
      ══════════════════════════════════════ */}
      <section className="py-12 border-y border-white/[0.06] bg-white/[0.01] overflow-hidden">
        <div className="mb-4 text-center text-slate-600 text-sm tracking-wider uppercase font-medium">
          Practice for top companies
        </div>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...companies, ...companies].map((c, i) => (
            <div key={i} className="flex items-center gap-2 mx-8 text-slate-500 font-semibold text-lg">
              <div className="w-2 h-2 rounded-full bg-brand-600/50" />
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS SECTION
      ══════════════════════════════════════ */}
      <section className="py-24 section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass gradient-border rounded-2xl p-6 text-center group hover:bg-white/[0.06] transition-all duration-300">
                <div className="text-4xl lg:text-5xl font-black gradient-text mb-2">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-slate-500 text-sm font-medium">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES SECTION
      ══════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#030712] via-[#0a0a1a] to-[#030712]">
        <div className="section-container">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/[0.10] text-sm text-slate-400 font-medium mb-6">
              <Sparkles className="w-4 h-4 text-brand-400" />
              Platform Features
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Everything you need to{' '}
              <span className="gradient-text">crack interviews</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Built for serious learners who want to understand deeply, not just memorize solutions.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`relative group rounded-2xl p-6 bg-gradient-to-br ${f.color} border ${f.border} hover:border-opacity-50 transition-all duration-300 hover:shadow-card-hover cursor-default`}>
                  {f.highlight && (
                    <span className="absolute -top-2.5 left-4 px-3 py-0.5 rounded-full bg-brand-600 text-white text-[10px] font-bold tracking-wider uppercase">
                      {f.highlight}
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {f.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="py-24">
        <div className="section-container">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              How <span className="gradient-text">AlgoMind</span> works
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              A proven system that turns beginners into confident coders.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

            {steps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="relative flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl ${s.bg} border flex items-center justify-center mb-4 ${s.color} relative z-10`}>
                    {s.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-600 tracking-widest mb-2">{s.step}</span>
                  <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AI MENTOR SHOWCASE
      ══════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-r from-brand-950/50 via-[#0a0a1a] to-cyan-950/30">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 text-sm text-brand-400 font-medium mb-6">
                <Bot className="w-4 h-4" />
                AI Mentor — Core Feature
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                Your personal AI that{' '}
                <span className="gradient-text">teaches you to think</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                The AlgoMind AI doesn't just answer questions — it guides you through Socratic reasoning, asks clarifying questions, and helps you arrive at solutions independently.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <Terminal className="w-4 h-4" />, text: 'Explains algorithms step-by-step, never gives away the full solution' },
                  { icon: <GitBranch className="w-4 h-4" />, text: 'Generates recursion trees, DP tables, call stacks on demand' },
                  { icon: <Globe className="w-4 h-4" />, text: 'Explains in English, Hindi, or Hinglish — your choice' },
                  { icon: <Shield className="w-4 h-4" />, text: 'Context-aware — knows your solved problems and weak areas' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-600/20 border border-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/ai-tutor" className="btn-primary text-base px-8 py-4">
                  <Bot className="w-5 h-5" />
                  Try AI Mentor Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              {/* Large AI chat demo */}
              <div className="glass gradient-border rounded-3xl p-6 shadow-glow">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">AlgoMind AI Mentor</p>
                    <p className="text-slate-500 text-xs">Gemini-powered • Context-aware</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs">Active</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="chat-ai p-4 text-sm text-slate-300 leading-relaxed">
                    I see you're working on <span className="text-brand-300 font-medium">"Longest Palindromic Substring"</span>. Before I help, let me ask — what does a palindrome mean to you? What property must it satisfy? 🤔
                  </div>
                  <div className="chat-user p-4 text-sm text-slate-300 leading-relaxed ml-8">
                    It reads the same forward and backward. Like "racecar" or "aba".
                  </div>
                  <div className="chat-ai p-4 text-sm text-slate-300 leading-relaxed">
                    Exactly! 🎯 Now, if you expand from a center character, what happens? Think about "aba" — can you <span className="text-cyan-400 font-medium">expand outward</span> while the characters match?
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      readOnly
                      value="Hmm, so I keep expanding as long as s[left] == s[right]?"
                      className="flex-1 input-field text-sm text-slate-400 cursor-not-allowed"
                    />
                    <button className="btn-primary px-3 py-2.5 rounded-lg flex-shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  {['Explain Algorithm', 'Show Dry Run', 'Analyze Complexity', 'Generate Hints'].map(action => (
                    <button key={action} className="px-3 py-1.5 rounded-lg glass border border-white/[0.10] text-xs text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-all">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="py-24">
        <div className="section-container">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Loved by <span className="gradient-text">developers</span>
            </h2>
            <p className="text-slate-400 text-lg">See what our community has to say</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass border border-white/[0.08] rounded-2xl p-6 hover:border-brand-500/20 transition-all duration-300 hover:shadow-card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-slate-500 text-xs">{t.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{t.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING
      ══════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-[#030712] to-[#0a0a1a]" id="pricing">
        <div className="section-container">
          <FadeIn className="text-center mb-4">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Simple, <span className="gradient-text">transparent</span> pricing
            </h2>
            <p className="text-slate-400 text-lg mb-8">Start free. Upgrade when you're ready.</p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 glass border border-white/[0.10] rounded-xl p-1">
              <button
                onClick={() => setBillingAnnual(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!billingAnnual ? 'bg-brand-600 text-white' : 'text-slate-400'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingAnnual(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${billingAnnual ? 'bg-brand-600 text-white' : 'text-slate-400'}`}
              >
                Annual
                <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-600/20 text-emerald-400 text-xs">-40%</span>
              </button>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {plans.map((plan, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`relative glass border ${plan.color} rounded-2xl p-6 flex flex-col gap-6 ${plan.popular ? 'shadow-glow' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white text-xs font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                    <p className="text-slate-500 text-sm">{plan.desc}</p>
                  </div>
                  <div>
                    {plan.price === 0 ? (
                      <div className="text-4xl font-black text-white">Free</div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-slate-500 text-lg">₹</span>
                        <span className="text-4xl font-black text-white">
                          {billingAnnual ? Math.floor(plan.price * 0.6) : plan.price}
                        </span>
                        <span className="text-slate-500">/{plan.period}</span>
                      </div>
                    )}
                  </div>
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup" className={plan.ctaClass}>
                    {plan.cta}
                    {plan.popular && <ArrowRight className="w-4 h-4" />}
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      <section className="py-24">
        <div className="section-container max-w-3xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="glass border border-white/[0.08] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-white font-medium">{faq.q}</span>
                    <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/[0.06] pt-4">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════ */}
      <section className="py-24">
        <div className="section-container">
          <FadeIn>
            <div className="relative rounded-3xl overflow-hidden p-12 lg:p-20 text-center glass gradient-border" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 100%)' }}>
              <div className="absolute inset-0 bg-mesh pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 text-sm text-brand-400 font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  Start your journey today
                </div>
                <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
                  Ready to think like a{' '}
                  <span className="gradient-text">10x engineer?</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                  Join 500,000+ developers who are learning smarter with AlgoMind's AI mentor. Free to start. No credit card needed.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/signup" className="btn-primary text-base px-10 py-4 shadow-glow-lg">
                    <Zap className="w-5 h-5" />
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link to="/problems" className="btn-secondary text-base px-10 py-4">
                    <Code2 className="w-5 h-5" />
                    Browse Problems
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
