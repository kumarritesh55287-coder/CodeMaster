import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'

export function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 rounded-full border-2 border-brand-500/20 border-t-brand-500"
      />
      <p className="text-slate-500 text-sm">{text}</p>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#030712] flex flex-col items-center justify-center gap-6 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold gradient-text">AlgoMind</span>
      </motion.div>
      <motion.div
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-40 h-0.5 bg-gradient-to-r from-transparent via-brand-500 to-transparent"
      />
    </div>
  )
}

export default Loader
