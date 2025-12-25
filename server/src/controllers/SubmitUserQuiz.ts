import type { Request, Response, NextFunction } from "express";
import { type IQuizUpdate, UpdateQuiz } from "@/lib/UpdateQuiz";
import { validationResult, matchedData } from "express-validator";

const SubmitUserQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try{
    if(!req.isAuthenticated) {
      return res.status(404).json({ message: "Unauthorized!"})
    };
    const errors = validationResult(req)
    if(!errors.isEmpty()){
     throw new Error("Invalid fields")
   }
    const userSubmission = matchedData(req) as IQuizUpdate;
    const { matchedCount, modifiedCount } = await UpdateQuiz(userSubmission);
    if(matchedCount !== 0 && modifiedCount !== 0 ){
      return res.status(201).json({ message: "Submission success!"})
    }
    throw new Error("Failed to submit answers")
  }catch(err){
    next(err);
  }
};

export default SubmitUserQuiz;