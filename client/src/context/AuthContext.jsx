import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const DEFAULT_USER = {
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
    await new Promise(r => setTimeout(r, 600))
    if (email && password) {
      const stored = localStorage.getItem(`user_${email}`)
      let u
      if (stored) {
        u = JSON.parse(stored)
      } else {
        const namePart = email.split('@')[0].replace(/[._]/g, ' ')
        const formattedName = namePart.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        const avatar = formattedName.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() || 'U'
        u = {
          ...DEFAULT_USER,
          id: `user-${Date.now()}`,
          name: formattedName,
          email: email,
          avatar: avatar,
        }
      }
      localStorage.setItem('algomind_user', JSON.stringify(u))
      setUser(u)
      return u
    }
    throw new Error('Please fill in valid credentials.')
  }

  const signup = async (name, email, password) => {
    await new Promise(r => setTimeout(r, 600))
    if (name && email && password.length >= 4) {
      const avatar = name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() || 'U'
      const u = {
        ...DEFAULT_USER,
        id: `user-${Date.now()}`,
        name,
        email,
        avatar,
      }
      localStorage.setItem(`user_${email}`, JSON.stringify(u))
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

