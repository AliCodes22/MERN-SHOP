import express from "express";
import {
  createProduct,
  getProducts,
  getSingleProduct,
} from "../controllers/productControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getSingleProduct);
router.post("/", protect, admin, createProduct);

export default router;
