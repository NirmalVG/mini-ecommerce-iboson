const Product = require("../models/Product");

const getProducts = async ({
  page = 1,
  limit = 10,
  search,
  category,
  minPrice,
  maxPrice,
  sort,
  inStock,
}) => {
  const filter = { isActive: true };

  if (search) filter.$text = { $search: search };
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
  if (inStock === "true") filter.stock = { $gt: 0 };

  const sortOptions = {};
  if (sort === "price_asc") sortOptions.price = 1;
  else if (sort === "price_desc") sortOptions.price = -1;
  else sortOptions.createdAt = -1;

  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find(filter).sort(sortOptions).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

const getBySlug = async (slug) => {
  const product = await Product.findOne({ slug, isActive: true });
  if (!product) throw { status: 404, message: "Product not found" };
  return product;
};

const createProduct = async (data) => Product.create(data);

const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!product) throw { status: 404, message: "Product not found" };
  return product;
};

const softDelete = async (id) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  );
  if (!product) throw { status: 404, message: "Product not found" };
  return product;
};

module.exports = {
  getProducts,
  getBySlug,
  createProduct,
  updateProduct,
  softDelete,
};
