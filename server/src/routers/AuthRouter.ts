import { Router } from "express";
import RegisterController from "@/controllers/RegisterController";
import LoginController from "@/controllers/LoginController";
import { CheckAuth, LogoutSession } from "@/controllers/AuthChecker";
import { CheckUserInfo } from "@/middlewares/RegisterValidation";
const router = Router()

router.post("/register", CheckUserInfo, RegisterController);
router.post("/login", [ CheckUserInfo[2], CheckUserInfo[3]], LoginController);
router.get("/logout", LogoutSession);
router.get("/check/user", CheckAuth);

export default router;