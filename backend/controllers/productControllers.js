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
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Product.countDocuments();

  const products = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
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

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const createReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
  }

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((total, review) => {
      return total + review.rating;
    }, 0) / product.reviews.length;

  await product.save();

  res.status(201).json({
    message: "review added",
  });
});

export {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createReview,
};
