import { Router } from "express";
import RegisterController from "@/controllers/RegisterController";
import { CheckUserInfo } from "@/middlewares/RegisterValidation";
const router = Router()

router.post("/register", CheckUserInfo, RegisterController)

export default router;