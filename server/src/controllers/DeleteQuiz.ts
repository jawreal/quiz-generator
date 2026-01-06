import type { Request, Response, NextFunction } from "express";
import { QuizModel } from "@/models/QuizSchema";
import { validationResult, matchedData } from "express-validator";
import { Types } from "mongoose"

interface IQueryValue {
  quiz_id: string;
}

const DeleteQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const error = validationResult(req);
    if(!req.isAuthenticated){
      return res.status(404).json({ message: "Unauthorized!"})
    };
    
    if(!error.isEmpty()){
      throw new Error("Invalid fields");
    }
    
    const { quiz_id } = matchedData(req) as IQueryValue;
    const { deletedCount } = await QuizModel.deleteOne({
      _id: new Types.ObjectId(quiz_id), 
    });
    if(deletedCount === 0){
      throw new Error("Failed to delete the quiz")
    }
    
    res.status(201).json({
      message: "Deleted successfully!"
    })
  }catch(err){
    next(err);
  }
};

export default DeleteQuiz;