import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getAllOrders,
} from "../controllers/orderController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/", protect, admin, getAllOrders);
router.get("/mine", protect, getMyOrders);
router.get("/:id", protect, admin, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
