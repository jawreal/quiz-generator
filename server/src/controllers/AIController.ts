import Cerebras from "@cerebras/cerebras_cloud_sdk";
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
dotenv.config();
import { AI_COMMAND } from "@/lib/AICommand";

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

const AIController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    //const { difficulty = "Intermediate", quizType = "Mixed", userPrompt = "Create a quiz about MERN Stack, 6 questions, 3 options only" } = req.body;
    const difficulty = "Intermediate";
    const quizType = "Mixed";
    const userPrompt = "Create a quiz about MERN Stack, 6 questions, 3 options only"; // mock up command 
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
        max_completion_tokens: 500,
        temperature: 0.7,
      })) as CerebrasChatResponse;
    const output = completion.choices[0].message.content;
    //const finalOutput = JSON.parse(output);
    res.json({ reply: output });
  } catch (error) {
    next(error);
  }
};

export default AIController;