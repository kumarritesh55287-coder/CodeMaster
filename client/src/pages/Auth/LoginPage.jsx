import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Zap, CheckCircle2 } from 'lucide-react'
import { Github } from '../../components/common/BrandIcons'
import { useAuth } from '../../context/AuthContext'

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const benefits = ['500K+ developers trust AlgoMind', 'AI mentor available 24/7', 'Visual algorithm animations', '2800+ curated problems']

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#424933] flex flex-col lg:flex-row relative">
      {/* Top back button for mobile / general */}
      <div className="absolute top-5 left-5 z-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold cursor-pointer group"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </div>

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] flex-shrink-0 p-12 pt-20 bg-gradient-to-br from-brand-950 via-[#0a0520] to-[#030712] border-r border-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl" />

        <Link to="/" className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center shadow-glow">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black gradient-text">AlgoMind</span>
        </Link>

        <div className="relative space-y-8">
          <div>
            <h2 className="text-3xl font-black text-black mb-3">Welcome back,<br />coder.</h2>
            <p className="text-black font-medium leading-relaxed">Continue your journey to algorithmic mastery with your AI mentor.</p>
          </div>
          <div className="space-y-3">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span className="text-black font-medium text-sm">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="relative text-black font-semibold text-xs">© 2025 AlgoMind. Built for developers.</p>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black gradient-text">AlgoMind</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-black mb-2">Sign in</h1>
            <p className="text-black font-medium">Don't have an account?{' '}
              <Link to="/signup" className="text-black font-bold underline hover:opacity-80">Create one free</Link>
            </p>
          </div>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="btn-secondary justify-center gap-2 py-3">
              <GoogleIcon />
              Google
            </button>
            <button className="btn-secondary justify-center gap-2 py-3">
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </div>

          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-black/20" />
            <span className="text-black font-bold text-sm">or</span>
            <div className="flex-1 h-px bg-black/20" />
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 font-medium text-sm">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email" required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="input-field pl-10 text-black placeholder-slate-400"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-black">Password</label>
                <Link to="/forgot-password" className="text-xs text-black font-bold underline hover:opacity-80">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPw ? 'text' : 'password'} required
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10 text-black placeholder-slate-400"
                />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-3.5 mt-2 shadow-glow">
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-black font-medium text-xs">
            Demo: <span className="text-black font-bold">demo@algomind.ai</span> / <span className="text-black font-bold">demo123</span>
          </p>

          <p className="mt-4 text-center text-black font-medium text-xs">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-black font-bold underline hover:opacity-80">Terms</Link> and{' '}
            <Link to="/privacy" className="text-black font-bold underline hover:opacity-80">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
