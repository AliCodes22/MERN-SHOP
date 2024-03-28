import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUser,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getAllUsers);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.get("/profile", protect, admin, getUserProfile);
router.put("/profile", protect, admin, updateUserProfile);
router.delete("/:id", protect, admin, deleteUser);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);

export default router;
