import type { Request, Response, NextFunction } from "express";
import { QuizModel } from "@/models/QuizSchema";
import { validationResult, matchedData } from "express-validator";
import { Types } from "mongoose";


type TakeQuiz = {
  quiz_id: string;
  page: number;
}

const TakeQuizController = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const user_id = req?.user?._id;
    if(!req.isAuthenticated || !user_id){
      return res.status(404).json({ message: "Unauthorized!"})
    };
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      throw new Error("Fields are invalid")
    };
    const { quiz_id, page = 1 } = matchedData(req) as TakeQuiz;
    const limit: number = 3;
    const skip: number = (page - 1) * limit;
    
    const [quizStats, quiz] = await Promise.all([
    QuizModel.aggregate([
      { $match: { _id: new Types.ObjectId(quiz_id) } },
      {
      $project: {
        totalQuestions: { $size: "$questions" },
        totalAnswered: {
          $size: {
            $filter: {
              input: "$questions",
              as: "q",
              cond: { $ne: ["$$q.userAns", ""] }
              }
            }
          }
        }
      }
    ]), 
    QuizModel.aggregate([
      {
       $match: { 
         _id: new Types.ObjectId(quiz_id),
         user: user_id, 
       } 
      },
      {
        $project: {
          title: 1, 
          difficulty: 1,
          quizType: 1,
          userPrompt: 1,
          questions: { $slice: ["$questions", skip, limit + 1 ] }, 
          completedPage: 1,
          score: 1,
         }
       }
     ])
    ]);
    if(!quiz?.length && quiz?.length === 0){
      throw new Error("No quiz is found")
    }
    const { totalQuestions, totalAnswered } = quizStats[0];
    const { questions = [], ...rest } = quiz[0];
    const hasNextPage = questions.length > limit;
    if(hasNextPage){
      questions.pop();
    };
    res.status(201).json({
      totalQuestions, 
      totalAnswered, 
      questions, 
      hasNextPage, 
      ...rest
    });
  }catch(err){
    next(err);
  }
};

export default TakeQuizController;