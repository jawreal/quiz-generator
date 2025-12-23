import { model, Schema } from "mongoose";

interface IQuestionSchema {
  question_id: Schema.Types.ObjectId, 
  answers: {
    quiz_id: Schema.Types.ObjectId, 
    userAns: string;
  }[]
}

const QuestionSchema = new Schema<IQuestionSchema>({
  question_id: { type: Schema.Types.ObjectId, required: true },
  answers:[
    {
      quiz_id: { type: Schema.Types.ObjectId, required: true },
      userAns: { type: String, required: true },
    }
  ] 
});

const QuestionModel = model<IQuestionSchema>("QuestionModel", QuestionSchema);

export { QuestionModel, IQuestionSchema } 