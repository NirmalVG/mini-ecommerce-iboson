const User = require("../models/User");

const getMe = async (req, res, next) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (err) {
    next(err);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const { name, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, address },
      { new: true },
    ).select("-password");
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMe, updateMe };
