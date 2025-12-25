import { body } from "express-validator";

const ValidateBeforeGenerate = [
  body("difficulty").notEmpty().withMessage("Difficulty field is required").isString().withMessage("Difficulty must be a string"), 
  body("quizType").notEmpty().withMessage("Quiz type field is required").isString().withMessage("Quiz type must be a string"), 
  body("userPrompt").notEmpty().withMessage("User prompt field is required").isString().withMessage("User prompt must be a string"), 
];


const ValidateBeforeSubmit = [
  body("quiz_id")
    .notEmpty()
    .isMongoId(),
  body("answers")
    .notEmpty()
    .isArray({ min: 1 }),
  body("answers.*._id")
    .notEmpty().withMessage("question _id is required")
    .isMongoId().withMessage("question _id must be a MongoId"),
  body("answers.*.userAns")
    .exists().withMessage("userAns is required")
    .isString().withMessage("userAns must be a string")
];

export { ValidateBeforeGenerate, ValidateBeforeSubmit };