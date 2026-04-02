import MainLayout from "@/layouts/MainLayout";
import QuizPage from "@/pages/QuizPage";
import GenerateQuiz from "@/components/custom/GenerateQuiz";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore"
import { useQueryDummy } from "@/hooks/useQueryDummy";

const QuizRoute = () => {
  const { isLoggedIn } = useAuthStore();
  const { isLoading } = useQueryDummy("user-auth");
  
  if(!isLoggedIn && !isLoading ) {
    return <Navigate to="/auth" replace />
  } 
  
  if(isLoading){
    return null
  }
  
  return (
  <Routes>
     <Route path="/" element={<MainLayout />}>
       <Route path="take/:quiz_id?" element={<QuizPage />} />
       <Route path="create" element={<GenerateQuiz />} />
       </Route>
    </Routes>
  );
};

export default QuizRoute;