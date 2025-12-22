import { Router } from "express";
import AIController from "@/controllers/AIController";
import UserQuizzes from "@/controllers/UserQuizzes";
import TakeQuizController from "@/controllers/TakeQuizController";
import { ValidateBeforeGenerate } from "@/middlewares/ValidateQuiz";
const router = Router()

router.get("/user/link", UserQuizzes);
router.get("/user/take", TakeQuizController);
router.post("/ai/generate", ValidateBeforeGenerate, AIController);

export default router;