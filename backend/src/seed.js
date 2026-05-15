require("dotenv").config()
const mongoose = require("mongoose")
const Product = require("./models/Product")

const samples = [
  {
    name: "Classic T-Shirt",
    slug: "classic-t-shirt",
    description: "Soft cotton everyday tee.",
    price: 499,
    stock: 25,
    category: "Apparel",
    images: ["https://placehold.co/400x300/e5e4e7/08060d?text=T-Shirt"],
  },
  {
    name: "Canvas Tote",
    slug: "canvas-tote",
    description: "Sturdy bag for daily carry.",
    price: 349,
    stock: 40,
    category: "Accessories",
    images: ["https://placehold.co/400x300/e5e4e7/08060d?text=Tote"],
  },
  {
    name: "Stainless Bottle",
    slug: "stainless-bottle",
    description: "Keeps drinks cold for hours.",
    price: 799,
    discountPrice: 649,
    stock: 15,
    category: "Lifestyle",
    images: ["https://placehold.co/400x300/e5e4e7/08060d?text=Bottle"],
  },
]

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("Set MONGO_URI in .env")
    process.exit(1)
  }
  await mongoose.connect(process.env.MONGO_URI)
  const count = await Product.countDocuments({ isActive: true })
  if (count > 0) {
    console.log("Products already exist; skipping seed.")
    await mongoose.disconnect()
    return
  }
  await Product.insertMany(samples)
  console.log("Seeded", samples.length, "products.")
  await mongoose.disconnect()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
