import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Mail, Lock, Eye, EyeOff, User, ArrowRight, ArrowLeft, Zap, CheckCircle2 } from 'lucide-react'
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

const strengthLevels = [
  { min: 0, label: 'Too weak', color: 'bg-red-500' },
  { min: 25, label: 'Weak', color: 'bg-orange-500' },
  { min: 50, label: 'Fair', color: 'bg-amber-500' },
  { min: 75, label: 'Strong', color: 'bg-emerald-500' },
  { min: 90, label: 'Very strong', color: 'bg-cyan-500' },
]

function getStrength(pw) {
  let score = 0
  if (pw.length >= 8) score += 25
  if (/[A-Z]/.test(pw)) score += 25
  if (/[0-9]/.test(pw)) score += 25
  if (/[^A-Za-z0-9]/.test(pw)) score += 25
  return score
}

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()
  const strength = getStrength(form.password)
  const strengthInfo = [...strengthLevels].reverse().find(s => strength >= s.min) || strengthLevels[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup(form.name, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#424933] flex items-center justify-center p-6 pt-20 pb-12 relative">
      {/* Top Back Button */}
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
      <div className="w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black gradient-text">AlgoMind</span>
          </Link>

          <div className="glass gradient-border rounded-3xl p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-black text-black mb-2">Create your account</h1>
              <p className="text-black font-medium text-sm">Already have one?{' '}
                <Link to="/login" className="text-black font-bold underline hover:opacity-80">Sign in</Link>
              </p>
            </div>

            {/* OAuth */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button className="btn-secondary justify-center gap-2 py-2.5 text-sm">
                <GoogleIcon />
                Google
              </button>
              <button className="btn-secondary justify-center gap-2 py-2.5 text-sm">
                <Github className="w-5 h-5" />
                GitHub
              </button>
            </div>
            <div className="relative flex items-center gap-4 mb-5">
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
                <label className="block text-sm font-bold text-black mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="text" required value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Rahul Sharma"
                    className="input-field pl-10 text-black placeholder-slate-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="email" required value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="input-field pl-10 text-black placeholder-slate-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-black mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type={showPw ? 'text' : 'password'} required value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="Min. 8 characters"
                    className="input-field pl-10 pr-10 text-black placeholder-slate-400" />
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[25, 50, 75, 100].map(level => (
                        <div key={level} className={`flex-1 h-1 rounded-full transition-all ${strength >= level ? strengthInfo.color : 'bg-black/20'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-black font-bold">{strengthInfo.label}</p>
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full justify-center py-3.5 mt-2 shadow-glow">
                {loading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Create Account — It's Free
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 flex items-start gap-2 text-xs text-black font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
              No credit card required. Free forever on the Free plan.
            </div>

            <p className="mt-3 text-black font-medium text-xs">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-black font-bold underline hover:opacity-80">Terms</Link> and{' '}
              <Link to="/privacy" className="text-black font-bold underline hover:opacity-80">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
