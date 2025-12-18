interface IProps {
  difficulty: string;
  quizType: string;
  userPrompt: string;
};

interface IResult {
  success: false;
  quiz_id?:  string;
}

const FetchService = async (props: IProps): Promise<IResult> => {
  try{
    const response = await("/api/prompt/generate-quiz", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      credentials: "include"
    });
    if(!response.ok){
      throw new Error("Failed to generate quiz");
    }
    const quiz_id = await result.json();
    console.log(quiz_id)
    //return { success: true, quiz_id };
  }catch(error){
    console.error(error)
    return { success: false } 
  }
};

export default FetchService;