import { model, Schema } from "mongoose";

interface IQuizSchema {
  user: Schema.Types.ObjectId, 
  title: string;
  questions: {
    question: string;
    questionNumber: number;
    options: string[];
    correctAns: string;
    userAns: string;
   }[]
}

const QuizSchema = new Schema<IQuizSchema>({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      questionNumber: { type: Number, required: true },
      options: [{ type: String, required: true }],
      correctAns: { type: String, required: true },
      userAns: { type: String, required: true },
    }
  ]
});

const QuizModel = model<IQuizSchema>("QuizModel", QuizSchema);

export { QuizModel, IQuizSchema } 