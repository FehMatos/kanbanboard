import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import columnRoutes from "./routes/columns.js";
import taskRoutes from "./routes/tasks.js";
import userRoutes from "./routes/user.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://FehMatos.github.io"],
    credentials: true,
  })
);

app.use((req: Request, res: Response, next: NextFunction): void => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/columns", columnRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

const MONGO_URI: string = process.env.MONGO_URI as string;
const PORT: string | number = process.env.PORT || 4000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(` ✅ Connected to DB & listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
