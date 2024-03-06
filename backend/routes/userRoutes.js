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

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
