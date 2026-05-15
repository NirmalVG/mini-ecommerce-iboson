import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart()

  if (!cart.length) {
    return (
      <div className="page-stack">
        <h1>Cart</h1>
        <p className="page-muted">Your cart is empty.</p>
        <Link to="/" className="btn-primary">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="page-stack">
      <h1>Cart</h1>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item._id} className="cart-row">
            <img src={item.image} alt="" className="cart-thumb" />
            <div className="cart-main">
              <Link to={`/products/${item.slug}`}>{item.name}</Link>
              <p className="page-muted">₹{item.price} each</p>
            </div>
            <label className="cart-qty">
              Qty
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQty(item._id, e.target.value)}
              />
            </label>
            <p className="cart-line-total">
              ₹{(item.price * item.quantity).toFixed(0)}
            </p>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>
          <strong>Subtotal</strong> ₹{total.toFixed(0)}
        </p>
        <Link to="/checkout" className="btn-primary">
          Checkout
        </Link>
      </div>
    </div>
  )
}
