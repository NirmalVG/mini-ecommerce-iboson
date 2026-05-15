const router = require("express").Router();
const { protect, adminOnly } = require("../middlewares/auth");
const ctrl = require("../controllers/productController");

router.get("/", ctrl.getProducts);
router.get("/:slug", ctrl.getProductBySlug); // slug not id!
router.post("/", protect, adminOnly, ctrl.createProduct);
router.put("/:id", protect, adminOnly, ctrl.updateProduct);
router.delete("/:id", protect, adminOnly, ctrl.deleteProduct);

module.exports = router;
