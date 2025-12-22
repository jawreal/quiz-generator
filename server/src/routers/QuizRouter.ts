import { Router } from "express";
import AIController from "@/controllers/AIController";
import UserQuizzes from "@/controllers/UserQuizzes";
import TakeQuizController from "@/controllers/TakeQuizController";
import { ValidateBeforeGenerate } from "@/middlewares/ValidateQuiz";
import { query } from "express-validator";
const router = Router();
const validateTakeQuiz = [
  query("quiz_id").notEmpty().isMongoId(),
  query("page").isNumeric().optional()
]

router.get("/user/link", UserQuizzes);
router.get("/user/take", validateTakeQuiz, TakeQuizController);
router.post("/ai/generate", ValidateBeforeGenerate, AIController);

export default router;