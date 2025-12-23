import MainLayout from "@/layouts/MainLayout";
import QuizPage from "@/pages/QuizPage";
import GenerateQuiz from "@/components/custom/GenerateQuiz";
import { Routes, Route, Navigate } from "react-router-dom";

const QuizRoute = () => {
  return (
  <Routes>
     <Route path="/" element={<MainLayout />}>
       <Route path="take/:quiz_id?" element={<QuizPage />} />
       <Route path="create" element={<GenerateQuiz />} />
       <Route
         path="*"
         element={<Navigate to="/create" replace />}
         />
       </Route>
    </Routes>
  );
};

export default QuizRoute;