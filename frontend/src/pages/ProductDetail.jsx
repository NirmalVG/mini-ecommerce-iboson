import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

export default function ProductDetail() {
  const { slug } = useParams()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { data } = await api.get(`/products/${encodeURIComponent(slug)}`)
        if (!cancelled) setProduct(data.data)
      } catch (e) {
        if (!cancelled)
          setError(e.response?.data?.error || "Product not found.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) return <p className="page-muted">Loading…</p>
  if (error || !product)
    return (
      <div className="page-stack">
        <p className="page-error">{error || "Not found."}</p>
        <Link to="/">Back to shop</Link>
      </div>
    )

  const img =
    product.images?.[0] ||
    "https://placehold.co/560x360/e5e4e7/08060d?text=Product"
  const unit = product.discountPrice ?? product.price
  const inStock = product.stock > 0

  const handleAdd = () => {
    if (!user) {
      navigate("/login")
      return
    }
    addToCart(product)
  }

  return (
    <div className="detail-layout">
      <img className="detail-image" src={img} alt="" />
      <div className="detail-info">
        <p className="breadcrumb">
          <Link to="/">Shop</Link> / {product.category || "All"}
        </p>
        <h1>{product.name}</h1>
        <p className="detail-price">
          ₹{unit}
          {product.discountPrice ? (
            <span className="price-was"> ₹{product.price}</span>
          ) : null}
        </p>
        <p className="detail-desc">{product.description}</p>
        <p className="product-stock">
          {inStock ? `In stock (${product.stock})` : "Out of stock"}
        </p>
        <div className="detail-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={handleAdd}
            disabled={!inStock}
          >
            Add to cart
          </button>
          <Link to="/cart" className="btn-secondary">
            View cart
          </Link>
        </div>
      </div>
    </div>
  )
}
