import { Router } from "express";
import AIController from "@/controllers/AIController";
import UserQuizzes from "@/controllers/UserQuizzes";
import { ValidateBeforeGenerate } from "@/middlewares/ValidateQuiz";
const router = Router()

router.get("/user/link", UserQuizzes);
router.post("/ai/generate", ValidateBeforeGenerate, AIController);

export default router;