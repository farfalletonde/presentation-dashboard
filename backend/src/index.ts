import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import presentationRoutes from "./routes/presentationRoutes.js";
import { generateUploadUrl } from "./s3.js";
import { generateAIResult } from "./chatgpt.js";
import path from "path";

export const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/presentation", presentationRoutes);

app.get("/api/s3", async (_req, res) => {
  const imageUrl = await generateUploadUrl();
  res.status(200).json({ imageUrl: imageUrl });
});

app.post("/api/chatgpt", async (req, res) => {
  const aiPrompt = await generateAIResult(req.body.message);
  res.status(200).json({ message: aiPrompt });
});

app.use(express.static(path.join(path.resolve(), "/frontend/build")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(path.resolve(), "frontend", "build", "index.html"));
});

export const server = app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
