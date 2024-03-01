import express from "express";
import {
  getProducts,
  getSingleProduct,
} from "../controllers/productControllers.js";
const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getSingleProduct);

export default router;
