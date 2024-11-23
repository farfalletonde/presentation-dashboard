import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import presentationRoutes from "./routes/presentationRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/presentation", presentationRoutes)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
