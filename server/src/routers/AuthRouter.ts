import { Router } from "express";
import RegisterController from "@/controllers/RegisterController";
import LoginController from "@/controllers/LoginController";
import { CheckUserInfo } from "@/middlewares/RegisterValidation";
const router = Router()

router.post("/register", CheckUserInfo, RegisterController);
router.post("/login", [ CheckUserInfo[2], CheckUserInfo[3]], LoginController);

export default router;