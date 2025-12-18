import { Router } from "express";
import AIController from "@/controllers/AIController";
import { ValidateBeforeGenerate } from "@/middlewares/ValidateQuiz";
const router = Router()

router.post("/generate-quiz", ValidateBeforeGenerate, AIController)

export default router;