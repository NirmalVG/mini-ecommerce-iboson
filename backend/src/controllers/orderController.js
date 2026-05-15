const OrderService = require("../services/OrderService")

const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body
    if (!items?.length) {
      const e = new Error("Cart is empty")
      e.status = 400
      throw e
    }
    const order = await OrderService.placeOrder(
      req.user._id,
      items,
      shippingAddress || {},
    )
    res.status(201).json({ success: true, data: order })
  } catch (err) {
    next(err)
  }
}

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getOrdersByUser(req.user._id)
    res.json({ success: true, data: orders })
  } catch (err) {
    next(err)
  }
}

module.exports = { createOrder, getMyOrders }
