import "dotenv/config"; 
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import type { NextFunction, Request, Response } from "express";
import { AI_COMMAND } from "@/lib/AICommand";
import { matchedData, validationResult } from "express-validator";
import { QuizModel, type IQuizSchema } from "@/models/QuizSchema";
import { QuizAttemptsModel } from "@/models/QuizAttempts"
import { Types, startSession } from "mongoose";
import { getDayRange } from "@/lib/GetDayRange";

interface CerebrasChatResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
};


const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

const UserQuizToday = async (user: Types.ObjectId) => {
  const { startOfDay, endOfDay } = getDayRange();
  const result = await QuizAttemptsModel.findOne({
    user: new Types.ObjectId(user),
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  });
  // Retrieve the user's quiz attempts
  
  if(!result){
    // Check if there's result from the query, and just return 0. 
    return 0
  }

  return result.attempts;
}

const AIController = async (req: Request, res: Response, next: NextFunction) => {
  const session = await startSession();
  try {
    session.startTransaction();
    
    if (!req.isAuthenticated()) {
      throw new Error("Trespassing! not authenticated.")
    }
    
    const result = validationResult(req);
    if(!result.isEmpty()){
      throw new Error("Fields are invalid");
    }
    
    const user = req?.user?._id;
    if(!user){
      throw new Error("Failed to get User ID");
    }
    
    const quizAttempts = await UserQuizToday(user);
    if(quizAttempts >= 3){
      // Forbid the users for creating new quiz if they hit their daily limit
      await session.abortTransaction();
      return res.status(401).json({
        reachedLimit: true
      })
    }
    
    const { difficulty, quizType, userPrompt } = matchedData(req) as Record<string, string>; 
    const completion = (await cerebras.chat.completions.create({
        messages: [
          {
            role: "system",
            content: AI_COMMAND,
          },
          { role: "user", content: `Difficulty: ${difficulty}     Quiz type: ${quizType}
             User prompt: ${userPrompt}
          `},
        ],
        model: process.env.AI_MODEL!, 
        max_completion_tokens: 3000,
        temperature: 0.7,
      })) as CerebrasChatResponse;
    const output = completion.choices[0].message.content;
    // Get the output 

    const normalizedOuput = JSON.parse(output);
    // Parse the output
    const userQuiz = { ...normalizedOuput, user, difficulty, quizType, userPrompt } as IQuizSchema;
    // Final normalize 
    
    const savedQuiz = await QuizModel.create([userQuiz], {
      session
    });
    // Create the quiz and get the id and send it back to the client
    
    const { startOfDay, endOfDay } = getDayRange(); 
    await QuizAttemptsModel.findOneAndUpdate(
      {
        user: new Types.ObjectId(user),
        createdAt: { $gte: startOfDay, $lte: endOfDay }, // Scope today 
      },
      {
        $inc: { attempts: 1 } 
      }, // Set user and increment attempts
      {
        upsert: true,
        new: true,
        session
      } // Create if not found
    );
    
    // Safe to commit all transactions
    await session.commitTransaction()
    
    // Respond to the client 
    res.status(201).json({ quiz_id: savedQuiz[0]._id });
  } catch (error) {
    // Cancel transaction
    await session.abortTransaction();
    next(error);
  }
};

export default AIController;