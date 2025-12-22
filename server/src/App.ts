import dotenv from "dotenv";
dotenv.config();
import QuizRouter from "@/routers/QuizRouter";
import AuthRouter from "@/routers/AuthRouter";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import errorHandler from "@/middlewares/ErrorHandler";
import passport from "passport";
import session from "express-session";
import { store } from "@/config/DbConfig";
import "@/config/PassportStrat";

const app = express(); 
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
app.use(
  session({
    secret: process.env.PASSPORT_SECRET ?? "",
    resave: false,
    rolling: false,
    saveUninitialized: false,
    store: store,
    proxy: true,
    cookie: {
      httpOnly: isDeployed, //must be false in production
      secure: isDeployed, //HTTPS only in production
      sameSite: isDeployed ? "strict" : "lax", //strict only in production
      maxAge: 1000 * 60 * 60 * 12,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/quiz", QuizRouter);
app.use("/api/auth", AuthRouter);
app.use(errorHandler);

export default app;
