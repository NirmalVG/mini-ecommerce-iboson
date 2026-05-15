const jwt = require("jsonwebtoken")
const User = require("../models/User")

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      const e = new Error("Name, email, and password are required")
      e.status = 400
      throw e
    }
    const exists = await User.findOne({ email: email.toLowerCase() })
    if (exists) {
      const e = new Error("Email already registered")
      e.status = 400
      throw e
    }
    const user = await User.create({ name, email, password })
    const token = signToken(user._id)
    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      const e = new Error("Email and password are required")
      e.status = 400
      throw e
    }
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user || !(await user.comparePassword(password))) {
      const e = new Error("Invalid email or password")
      e.status = 401
      throw e
    }
    const token = signToken(user._id)
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { register, login }
