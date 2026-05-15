const router = require("express").Router()
const { protect } = require("../middlewares/auth")
const { createOrder, getMyOrders } = require("../controllers/orderController")

router.post("/", protect, createOrder)
router.get("/me", protect, getMyOrders)

module.exports = router
