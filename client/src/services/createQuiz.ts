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
    const response = await fetch("/api/prompt/generate-quiz", {
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
    const quiz_id = await response.json();
    console.log(quiz_id)
    //return { success: true, quiz_id };
  }catch(error){
    console.error(error)
    //return { success: false } 
  }
};

export default CreateQuiz;