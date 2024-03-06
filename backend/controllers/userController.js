import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// Auth user and get token

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {});

const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("User profile");
});

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update profile");
});

const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

const getAllUsers = asyncHandler(async (req, res) => {
  res.send("get all users");
});

const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUser,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
};
