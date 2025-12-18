import { body } from "express-validator";

const ValidateBeforeGenerate = [
  body("difficulty").notEmpty().withMessage("Difficulty field is required").isString().withMessage("Difficulty must be a string"), 
  body("quizType").notEmpty().withMessage("Quiz type field is required").isString().withMessage("Quiz type must be a string"), 
  body("userPrompt").notEmpty().withMessage("User prompt field is required").isString().withMessage("User prompt must be a string"), 
];

export { ValidateBeforeGenerate };