import dotenv from "dotenv";
dotenv.config();
import AIRouter from "@/routers/AIRouter";
import morgan from "morgan";
import express from "express";
import cors from "cors";
const app = express();
import errorHandler from "@/middlewares/ErrorHandler"
const isDeployed: boolean = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(morgan(isDeployed ? "combined" : "dev"));
if (!isDeployed) {
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
};

app.use("/api/prompt", AIRouter)
app.use(errorHandler);

export default app;
