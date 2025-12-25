import { model, Schema } from "mongoose";

interface IQuizSchema {
  user: Schema.Types.ObjectId, 
  title: string;
  questions: {
    question: string;
    questionNumber: number;
    options?: string[];
    correctAns: string;
    userAns: string;
   }[], 
   icon: string;
   difficulty: string;
   quizType: string;
   userPrompt: string;
   score?: number;
   completedPage?: number;
}

const QuizSchema = new Schema<IQuizSchema>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "UserModel" },
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      questionNumber: { type: Number, required: true },
      options: [{ type: String, required: false }],
      userAns: { type: String, required: false },
      correctAns: { type: String, required: false },
    }
  ], 
  icon: { type: String, required: true }, 
  difficulty: { type: String, required: true }, 
  quizType: { type: String, required: true },
  userPrompt: { type: String, required: true },
  score: { type: Number, required: false },
  completedPage: { type: Number, required: false, default: 1 },
});

const QuizModel = model<IQuizSchema>("QuizModel", QuizSchema);

export { QuizModel, IQuizSchema } 