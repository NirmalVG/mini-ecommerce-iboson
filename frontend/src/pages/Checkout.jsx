import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import api from "../lib/api"

export default function Checkout() {
  const { user } = useAuth()
  const { cart, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  if (!user) {
    return (
      <div className="page-stack">
        <h1>Checkout</h1>
        <p className="page-muted">Please log in to place an order.</p>
        <Link to="/login" className="btn-primary">
          Log in
        </Link>
      </div>
    )
  }

  if (!cart.length) {
    return (
      <div className="page-stack">
        <h1>Checkout</h1>
        <p className="page-muted">Your cart is empty.</p>
        <Link to="/">Browse products</Link>
      </div>
    )
  }

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      await api.post("/orders", {
        items: cart.map((c) => ({
          productId: c._id,
          quantity: c.quantity,
        })),
        shippingAddress: form,
      })
      clearCart()
      navigate("/orders")
    } catch (err) {
      setError(err.response?.data?.error || "Order failed.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-stack narrow">
      <h1>Checkout</h1>
      <p className="page-muted">Order total (before tax on server): ₹{total.toFixed(0)}</p>
      <form className="stack-form" onSubmit={handleSubmit}>
        <label>
          Street
          <input name="street" value={form.street} onChange={onChange} required />
        </label>
        <label>
          City
          <input name="city" value={form.city} onChange={onChange} required />
        </label>
        <label>
          State
          <input name="state" value={form.state} onChange={onChange} />
        </label>
        <label>
          Pincode
          <input name="pincode" value={form.pincode} onChange={onChange} />
        </label>
        <label>
          Country
          <input name="country" value={form.country} onChange={onChange} />
        </label>
        {error ? <p className="page-error">{error}</p> : null}
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Placing order…" : "Place order"}
        </button>
      </form>
    </div>
  )
}
