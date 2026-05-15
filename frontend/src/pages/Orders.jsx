import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../lib/api"

export default function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) return
    let cancelled = false
    ;(async () => {
      try {
        const { data } = await api.get("/orders/me")
        if (!cancelled) setOrders(data.data || [])
      } catch (e) {
        if (!cancelled)
          setError(e.response?.data?.error || "Could not load orders.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [user])

  if (!user) {
    return (
      <div className="page-stack">
        <h1>Orders</h1>
        <p className="page-muted">Log in to see your orders.</p>
        <Link to="/login" className="btn-primary">
          Log in
        </Link>
      </div>
    )
  }

  if (loading) return <p className="page-muted">Loading orders…</p>
  if (error) return <p className="page-error">{error}</p>

  if (!orders.length)
    return (
      <div className="page-stack">
        <h1>Orders</h1>
        <p className="page-muted">You have not placed any orders yet.</p>
        <Link to="/">Shop</Link>
      </div>
    )

  return (
    <div className="page-stack">
      <h1>Orders</h1>
      <ul className="order-list">
        {orders.map((o) => (
          <li key={o._id} className="order-card">
            <div className="order-head">
              <strong>{o.orderNumber}</strong>
              <span className="page-muted">
                {new Date(o.createdAt).toLocaleString()}
              </span>
            </div>
            <p>Total ₹{o.total}</p>
            <p className="page-muted">Status: {o.status}</p>
            <ul className="order-items">
              {o.items.map((line, i) => (
                <li key={i}>
                  {line.product?.name || "Product"} × {line.quantity} — ₹
                  {(line.priceAtPurchase * line.quantity).toFixed(0)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
