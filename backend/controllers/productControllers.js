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

export { getProducts, getSingleProduct };
