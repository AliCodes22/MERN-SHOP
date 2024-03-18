import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (product) {
    return res.status(200).json(product);
  }

  res.status(404).json({
    message: "Product not found",
  });
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json(products);
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();

  res.status(201).json(createProduct);
});

export { getProducts, getSingleProduct, createProduct };
