import express from "express";
import { verifyToken } from "../controllers/tokenController.js";
import {
  createPresentationController,
  deletePresentationController,
  getPresentationsController,
  updatePresentationController,
} from "../controllers/presentationControllers.js";

const presentationRoutes = express.Router();

presentationRoutes.get("/", verifyToken, getPresentationsController);
presentationRoutes.post("/create", verifyToken, createPresentationController);
presentationRoutes.put("/update", verifyToken, updatePresentationController);
presentationRoutes.post("/delete", verifyToken, deletePresentationController);

export default presentationRoutes;
