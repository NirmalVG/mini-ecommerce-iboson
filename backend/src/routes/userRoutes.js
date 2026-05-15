const router = require("express").Router();
const { protect } = require("../middlewares/auth");
const { getMe, updateMe } = require("../controllers/userControllers");
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
module.exports = router;
