const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number },
    stock: { type: Number, default: 0, min: 0 },
    category: { type: String, trim: true },
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }
  next()
})

productSchema.index({ name: "text", category: "text" })

module.exports = mongoose.model("Product", productSchema)
