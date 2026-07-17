import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const DEMO_USER = {
  id: 'demo-001',
  name: 'Rahul Kumar',
  email: 'demo@algomind.ai',
  avatar: 'RK',
  rating: 1847,
  streak: 14,
  solved: 87,
  rank: 2341,
  badge: 'Expert',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('algomind_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) }
      catch { localStorage.removeItem('algomind_user') }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Demo login — accept demo credentials or any credentials
    await new Promise(r => setTimeout(r, 800))
    if (email && password.length >= 6) {
      const u = { ...DEMO_USER, email }
      localStorage.setItem('algomind_user', JSON.stringify(u))
      setUser(u)
      return u
    }
    throw new Error('Invalid credentials. Use demo@algomind.ai / demo123')
  }

  const signup = async (name, email, password) => {
    await new Promise(r => setTimeout(r, 1000))
    if (name && email && password.length >= 6) {
      const u = { ...DEMO_USER, name, email, avatar: name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() }
      localStorage.setItem('algomind_user', JSON.stringify(u))
      setUser(u)
      return u
    }
    throw new Error('Please fill all fields correctly.')
  }

  const logout = () => {
    localStorage.removeItem('algomind_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext
