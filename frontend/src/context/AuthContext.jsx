import { createContext, useContext, useState } from "react"
import api from "../lib/api"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user")
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const persist = (nextUser, token) => {
    if (token) localStorage.setItem("token", token)
    else localStorage.removeItem("token")
    if (nextUser) localStorage.setItem("user", JSON.stringify(nextUser))
    else localStorage.removeItem("user")
    setUser(nextUser)
  }

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password })
    persist(data.user, data.token)
    return data
  }

  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password })
    persist(data.user, data.token)
    return data
  }

  const logout = () => persist(null, null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
