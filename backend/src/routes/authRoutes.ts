import express from "express";
import {
  loginController,
  logoutController,
  signupController,
} from "../controllers/authControllers.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/login", loginController);
authRoutes.post("/logout", logoutController);

export default authRoutes;
