import { useState } from "react"
import { Link, useNavigate, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Register() {
  const { register, user } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  if (user) return <Navigate to="/" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await register(name, email, password)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.")
    }
  }

  return (
    <div className="page-stack narrow">
      <h1>Create account</h1>
      <form className="stack-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />
        </label>
        {error ? <p className="page-error">{error}</p> : null}
        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
      <p className="page-muted">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  )
}
