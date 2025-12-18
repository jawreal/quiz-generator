import { Router } from "express";
import AIController from "@/controllers/AIController";
const router = Router()

router.get("/generate-quiz", AIController)

export default router;