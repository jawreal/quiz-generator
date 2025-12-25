import { Types } from "mongoose";
import { QuizModel } from "@/models/QuizSchema";

type Answers = {
  _id: Types.ObjectId, 
  userAns: string;
}

type IQuizUpdate = {
  quiz_id: Types.ObjectId,
  answers: Answers[];
}


const UpdateQuiz = async (userQuiz: IQuizUpdate) => {
  const { answers, quiz_id } = userQuiz;

  if (!answers || !quiz_id) {
    throw new Error("Invalid payload");
  }

  const quizId = new Types.ObjectId(quiz_id);

  const operations = answers.map((answer) => ({
    updateOne: {
      filter: {
        _id: quizId,
        "questions._id": new Types.ObjectId(answer._id),
        "questions.userAns": ""
      },
      update: {
        $set: {
          "questions.$.userAns": answer.userAns
        }
      }
    }
  }));
  const result = await QuizModel.bulkWrite(operations);
  return result;
};

export { UpdateQuiz, IQuizUpdate };
