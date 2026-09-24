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

const FULLSCREEN_ROUTES = ['/login', '/signin', '/signup']

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const pageTransition = { duration: 0.2, ease: 'easeOut' }

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppLayout() {
  const { pathname } = useLocation()
  const isWorkspace = (pathname.startsWith('/problems/') && pathname !== '/problems') || pathname.startsWith('/workspace') || pathname === '/code'
  const isAuth = FULLSCREEN_ROUTES.includes(pathname)

  if (isWorkspace) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key={pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition} className="h-screen overflow-hidden">
          <Routes>
            <Route path="/problems/:slug" element={<WorkspacePage />} />
            <Route path="/workspace/:slug" element={<WorkspacePage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/code" element={<WorkspacePage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (isAuth) {
    return (
      <AnimatePresence mode="wait">
        <motion.div key={pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#424933] text-[#eff1f6]">
      <Navbar />
      <main className="flex-1 pt-14">
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
