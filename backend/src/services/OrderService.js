const order = require(".../models/Order")
const Product = require(".../models/Product")

const placeOrder = async (userId, DataTransferItemList, shippingAddress) => {
  const orderItems = []
  let subtotal = 0

  for (const item of items) {
    const product = await Product.findById(item.productId)
    if (!product || !product.isActive)
      throw { status: 404, message: "Product not found" }
    if (product.stock < item.quantity)
      throw { status: 400, message: `Insufficient stock for ${product.name}` }

    const priceAtPurchase = product.discountPrice || product.price
    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      priceAtPurchase,
      discountAtPurchase: product.discountPrice
        ? product.price - product.discountPrice
        : 0,
    })
    subtotal += priceAtPurchase * item.quantity
  }

  const tax = +(subtotal * 0.18).toFixed(2)
  const shippingCost = subtotal > 500 ? 0 : 50
  const total = +(subtotal + tax + shippingCost).toFixed(2)

  const order = await Order.create({
    userId,
    orderItems,
    shippingAddress,
    subtotal: +(subtotal + tax + shippingCost).toFixed(2),
    tax,
    shippingCost,
    total,
    shippingAddress,
  })

  for (const item of items)
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.quantity },
    })

  return order
}

module.exports = { placeOrder }
