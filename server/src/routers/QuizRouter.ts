import { Router } from "express";
import AIController from "@/controllers/AIController";
import UserQuizzes from "@/controllers/UserQuizzes";
import TakeQuizController from "@/controllers/TakeQuizController";
import SubmitUserQuiz from "@/controllers/SubmitUserQuiz";
import SearchController from "@/controllers/SearchController";
import DeleteQuiz from "@/controllers/DeleteQuiz";
import { 
  ValidateBeforeGenerate, 
  ValidateBeforeSubmit, 
  ValidateBeforeSearch, 
  ValidateBeforeDelete, 
} from "@/middlewares/ValidateQuiz";
import { query } from "express-validator";
const router = Router();
const validateTakeQuiz = [
  query("quiz_id").notEmpty().isMongoId(),
  query("page").isNumeric().optional()
]

router.get("/user/link", UserQuizzes);
router.get("/user/take", validateTakeQuiz, TakeQuizController);
router.get("/user/search", ValidateBeforeSearch, SearchController);
router.post("/ai/generate", ValidateBeforeGenerate, AIController);
router.post("/user/submit", ValidateBeforeSubmit, SubmitUserQuiz);
router.delete("/delete", ValidateBeforeDelete, DeleteQuiz);

export default router;