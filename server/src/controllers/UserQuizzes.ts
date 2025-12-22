import type { Request, Response, NextFunction } from "express";
import { QuizModel } from "@/models/QuizSchema";

const UserQuizzes = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const user_id = req?.user?._id;
    if(!req.isAuthenticated || !user_id){
      return res.status(404).json({ message: "Unauthorized!"})
    };
    const quizzes = await QuizModel.find({
      user: user_id
    }, {
      title: 1,
      icon: 1,
    }).lean();
    console.log(quizzes)
    res.status(201).json(quizzes)
  }catch(err){
    next(err);
  }
};

export default UserQuizzes;