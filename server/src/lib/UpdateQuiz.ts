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
  const updateCompletedPage = {
    updateOne: {
      filter: {
        _id: quiz_id
      }, 
      update: {
        $inc: { completedPage: 1 } 
      }
    }
  };
  const result = await QuizModel.bulkWrite([ ...operations, updateCompletedPage ]);
  return result;
};

export { UpdateQuiz, IQuizUpdate };
