const User = require("../models/User")

const getMe = async (req, res, next) => {
  try {
    res.json({ success: true, data: req.user })
  } catch (error) {
    next(error)
  }
}
