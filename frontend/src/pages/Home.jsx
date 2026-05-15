import { useEffect, useState } from "react"
import api from "../lib/api"
import ProductCard from "../components/ProductCard/ProductCard"

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data } = await api.get("/products", { params: { limit: 24 } })
        if (!cancelled) setProducts(data.products || [])
      } catch (e) {
        if (!cancelled)
          setError(e.response?.data?.error || "Could not load products.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <p className="page-muted">Loading products…</p>
  if (error) return <p className="page-error">{error}</p>
  if (!products.length)
    return (
      <div className="page-stack">
        <h1>Shop</h1>
        <p className="page-muted">
          No products yet. Run{" "}
          <code>npm run seed</code> in the backend folder (with MongoDB
          configured), then refresh.
        </p>
      </div>
    )

  return (
    <div className="page-stack">
      <h1>Shop</h1>
      <p className="page-lead">A minimal catalog wired to your API.</p>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  )
}
