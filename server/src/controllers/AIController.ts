import Cerebras from "@cerebras/cerebras_cloud_sdk";
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
dotenv.config();
import { AI_COMMAND } from "@/lib/AICommand";
import { matchedData, validationResult } from "express-validator";
import { QuizModel, type IQuizSchema } from "@/models/QuizSchema";

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

interface CerebrasChatResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
};

const AIController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.isAuthenticated()) {
      throw new Error("Trespassing! not authenticated.")
    }
    const result = validationResult(req);
    if(!result.isEmpty()){
      console.log(result)
      throw new Error("Fields are invalid");
    }
    const user = req?.user?._id;
    if(!user){
      throw new Error("Failed to get User ID");
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
        model: "llama3.1-8b",
        max_completion_tokens: 3000,
        temperature: 0.7,
      })) as CerebrasChatResponse;
    const output = completion.choices[0].message.content;
    //console.log(output) 
    const normalizedOuput = JSON.parse(output);
    const userQuiz = { ...normalizedOuput, user, difficulty, quizType, userPrompt } as IQuizSchema;
    const savedQuiz = await QuizModel.create(userQuiz);
    console.log(savedQuiz)
    res.status(201).json({ quizId: savedQuiz });
  } catch (error) {
    next(error);
  }
};

export default AIController;