import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import products from "./data/products.js";

const port = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;

  const product = products.find((product) => product._id === id);

  res.status(200).json(product);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
