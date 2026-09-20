import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Home, ArrowLeft, Code2 } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#424933] flex flex-col items-center justify-center text-center px-4 bg-mesh">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg"
      >
        <div className="text-9xl font-black gradient-text mb-4 leading-none select-none">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-slate-400 mb-8">
          Hmm, even our AI can't find this page. Maybe it's a hidden test case? Let's get you back on track.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link to="/problems" className="btn-secondary">
            <Code2 className="w-5 h-5" />
            Browse Problems
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
