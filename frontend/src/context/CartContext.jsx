import { createContext, useContext, useEffect, useMemo, useState } from "react"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart")
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    const id = product._id
    setCart((prev) => {
      const exists = prev.find((item) => item._id === id)
      if (exists) {
        return prev.map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      const image =
        product.images?.[0] ||
        "https://placehold.co/300x200/e5e4e7/08060d?text=Product"
      const unitPrice = product.discountPrice ?? product.price
      return [
        ...prev,
        {
          _id: id,
          name: product.name,
          slug: product.slug,
          price: unitPrice,
          quantity: 1,
          image,
        },
      ]
    })
  }

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item._id !== id))

  const updateQty = (id, qty) => {
    const q = Number(qty)
    if (!Number.isFinite(q) || q < 1) {
      removeFromCart(id)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: q } : item,
      ),
    )
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0)

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      total,
      cartCount,
    }),
    [cart],
  )

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
