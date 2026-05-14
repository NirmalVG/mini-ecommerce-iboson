import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <Link to="/">ShopApp</Link>
      <div>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  )
}

export default Navbar
