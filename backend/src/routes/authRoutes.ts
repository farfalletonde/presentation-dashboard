import express from "express";
import {
  fetchUserController,
  loginController,
  logoutController,
  signupController,
} from "../controllers/authControllers.js";
import { verifyToken } from "../controllers/tokenController.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/login", loginController);
authRoutes.post("/logout", logoutController);
authRoutes.get("/profile", verifyToken, fetchUserController);

export default authRoutes;
