import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'

const STORAGE_USERS = 'apma_users_v1' // { buyers: [], sellers: [] }
const STORAGE_AUTH = 'apma_auth_v1'   // { role: 'buyer'|'seller', userId }

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_USERS)
      return raw ? JSON.parse(raw) : { buyers: [], sellers: [] }
    } catch {
      return { buyers: [], sellers: [] }
    }
  })
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_AUTH)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_USERS, JSON.stringify(users)) } catch {}
  }, [users])
  useEffect(() => {
    try {
      if (auth) localStorage.setItem(STORAGE_AUTH, JSON.stringify(auth))
      else localStorage.removeItem(STORAGE_AUTH)
    } catch {}
  }, [auth])

  function signup(role, { name, email, password }) {
    if (!['buyer', 'seller'].includes(role)) throw new Error('Invalid role')
    const listKey = role === 'buyer' ? 'buyers' : 'sellers'
    const exists = users[listKey].some(u => u.email.toLowerCase() === (email||'').toLowerCase())
    if (exists) throw new Error('Email already registered')
    const user = { id: Date.now().toString(), name: name?.trim() || 'User', email: email.trim(), password: password }
    setUsers(prev => ({ ...prev, [listKey]: [...prev[listKey], user] }))
    setAuth({ role, userId: user.id })
    return user
  }

  function login(role, { email, password }) {
    const listKey = role === 'buyer' ? 'buyers' : 'sellers'
    const user = users[listKey].find(u => u.email.toLowerCase() === (email||'').toLowerCase() && u.password === password)
    if (!user) throw new Error('Invalid credentials')
    setAuth({ role, userId: user.id })
    return user
  }

  function logout() { setAuth(null) }

  function currentUser() {
    if (!auth) return null
    const listKey = auth.role === 'buyer' ? 'buyers' : 'sellers'
    return users[listKey].find(u => u.id === auth.userId) || null
  }

  const value = useMemo(() => ({ users, auth, signup, login, logout, currentUser }), [users, auth])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function RequireAuth({ role, children }) {
  const { auth } = useAuth()
  if (!auth) return <Navigate to={role === 'seller' ? '/login-seller' : '/login-buyer'} replace />
  if (role && auth.role !== role) return <Navigate to={auth.role === 'seller' ? '/seller' : '/buyer'} replace />
  return children
}
