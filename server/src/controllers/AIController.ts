import type { Request, Response } from "express";

const generateQuiz = (_req: Request, res: Response) => {
  res.send("Hello World")
}

export default generateQuiz;