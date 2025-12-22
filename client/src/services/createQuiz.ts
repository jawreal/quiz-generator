interface IProps {
  difficulty: string;
  quizType: string;
  userPrompt: string;
};

/*interface IResult {
  success: false;
  quiz_id?:  string;
}*/

const CreateQuiz = async (props: IProps): Promise<void>  => {
  try{
    const response = await fetch("/api/quiz/ai/generate", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(props), 
      credentials: "include"
    });
    if(!response.ok){
      throw new Error("Failed to generate quiz");
    }
    const result = await response.json();
    console.log(result)
    return { success: true, quiz_id: result?.quizId?.toString() };
  }catch(error){
    console.error(error)
    return { success: false } 
  }
};

export default CreateQuiz;