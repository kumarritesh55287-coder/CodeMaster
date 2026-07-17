import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// Pages
import LandingPage from '../pages/Home/LandingPage'
import LoginPage from '../pages/Auth/LoginPage'
import SignupPage from '../pages/Auth/SignupPage'
import DashboardPage from '../pages/Dashboard/DashboardPage'
import ProblemsPage from '../pages/Problems/ProblemsPage'
import WorkspacePage from '../pages/Workspace/WorkspacePage'
import AITutorPage from '../pages/AITutor/AITutorPage'
import RoadmapPage from '../pages/Roadmap/RoadmapPage'
import LeaderboardPage from '../pages/Leaderboard/LeaderboardPage'
import ContestPage from '../pages/Contest/ContestPage'
import ProfilePage from '../pages/Profile/ProfilePage'
import NotFoundPage from '../pages/NotFound/NotFoundPage'

// Pages that should NOT show the standard navbar/footer
const FULLSCREEN_ROUTES = ['/login', '/signup', '/workspace', '/problems/']

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const pageTransition = { duration: 0.3, ease: 'easeOut' }

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppLayout() {
  const { pathname } = useLocation()
  const isFullscreen = FULLSCREEN_ROUTES.some(r => pathname.startsWith(r))
  const isWorkspace = pathname.startsWith('/problems/') && pathname !== '/problems'

  if (isFullscreen || isWorkspace) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key={pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/problems/:slug" element={<WorkspacePage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/problems" element={<ProblemsPage />} />
              <Route path="/ai-tutor" element={<AITutorPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/contest" element={<ContestPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  )
}
