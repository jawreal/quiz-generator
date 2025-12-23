interface ITakeQuiz {
  quiz_id?: string | undefined;
  page: number;
}

const TakeQuiz = async ({
  quiz_id, 
  page, 
}: ITakeQuiz) => {
  console.log(quiz_id, page)
  if(!quiz_id){
    throw new Error("Quiz id is required")
  }
  const response = await fetch(`/api/quiz/user/take?page=${page}&quiz_id=${quiz_id}`, 
  {
    credentials: "include"
  });
  if(!response.ok){
    throw new Error("Failed to retrieve the quiz");
  }
  const result = await response.json();
  console.log(result);
  return result;
};

export default TakeQuiz;