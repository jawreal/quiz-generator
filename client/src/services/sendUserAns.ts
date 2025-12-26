import type { IQuestions } from "@/pages/QuizPage";

interface ISubmitAns {
  quiz_id?: string | undefined;
  answers: IQuestions[];
  hasNextPage: boolean;
}

const SubmitAnswer = async (submission: ISubmitAns) => {
  try{
    const { answers, quiz_id, hasNextPage } = submission; 
    if(!quiz_id || !answers){
      throw new Error("Empty fields")
    }
    let score: number = 0;
    const normalizedAns = answers?.map((ans: IQuestions) => {
     if(ans.correctAns === ans.userAns){
       score ++;
     }
     return {
        _id: ans._id,
        userAns: ans.userAns
       }
     }
    );
    const response = await fetch("/api/quiz/user/submit", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
       quiz_id, 
       answers: normalizedAns,
       score,  
       hasNextPage, 
      })
    })
    if(!response.ok){
      throw new Error("Failed to submit answers")
    }
    return { success: true }
  }catch(err){
    console.error(err)
    return { success: false }
  }
}

export default SubmitAnswer;