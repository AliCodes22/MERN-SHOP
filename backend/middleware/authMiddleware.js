import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import User from "../models/userModel";

// Protect routes

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // read jwt from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch {}
  } else {
    res.status(401);
    throw new Error("Unauthorized user");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("not authorized as admin");
  }
};

export { protect, admin };
