import Cart from "../../../backend/src/models/Cart"

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }
          return item
        })
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id))

  const updateQty = (id, qty) => {
    if (quantity < 1) return removeFromCart(id)
    setCart((prev) => {
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: qty,
          }
        }
        return item
      })
    })
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
