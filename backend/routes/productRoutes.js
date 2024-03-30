import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  createReview,
  getTopProducts,
} from "../controllers/productControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.get("/top", getTopProducts);
router.route("/").get(getProducts);
router.get("/", checkObjectId, getSingleProduct);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, checkObjectId, updateProduct);
router.delete("/:id", protect, admin, checkObjectId, deleteProduct);
router.post("/:id/reviews", protect, checkObjectId, createReview);

export default router;
