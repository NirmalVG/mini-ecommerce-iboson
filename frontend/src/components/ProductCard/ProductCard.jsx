import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

function priceLabel(p) {
  const unit = p.discountPrice ?? p.price
  if (p.discountPrice && p.discountPrice < p.price) {
    return (
      <p className="product-price">
        <span className="price-sale">₹{p.discountPrice}</span>{" "}
        <span className="price-was">₹{p.price}</span>
      </p>
    )
  }
  return <p className="product-price">₹{unit}</p>
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const img =
    product.images?.[0] ||
    "https://placehold.co/300x200/e5e4e7/08060d?text=Product"

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login")
      return
    }
    addToCart(product)
  }

  const inStock = product.stock > 0

  return (
    <article className="product-card">
      <Link to={`/products/${product.slug}`} className="product-card-media">
        <img src={img} alt="" />
      </Link>
      <div className="product-card-body">
        <h3>
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        {priceLabel(product)}
        <p className="product-stock">
          {inStock ? `In stock (${product.stock})` : "Out of stock"}
        </p>
        <div className="product-card-actions">
          <Link to={`/products/${product.slug}`} className="btn-secondary">
            View
          </Link>
          <button
            type="button"
            className="btn-primary"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}
