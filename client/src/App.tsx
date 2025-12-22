import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizRoute from "@/routers/QuizRoute";
//import AuthRoute from "@/routers/AuthRoute";
import LoginForm from "@/pages/LoginForm";
//import SignUpForm from "@/pages/SignUpForm";
//import MainLayout from "@/layouts/MainLayout";
//import QuizPage from "@/pages/QuizPage";


const App = () => {
  return (
    <Router>
    {/*<GenerateQuiz />*/}
    {/*<MainLayout />*/} 
    {/*<div className="w-full flex min-h-screen justify-center items-center px-5">
      <LoginForm className="w-full md:max-w-[25rem]"/>
      {/*<SignUpForm className="w-full md:max-w-[25rem]"/>
    </div>*/}
    {/*<QuizPage {...mockQuiz} />*/}
      <Routes>
       <Route path="/quiz/*" element={<QuizRoute />} />
       <Route path="/login" element={<LoginForm className="w-full md:max-w-[25rem]" />} />
      </Routes>
    </Router>)
}

export default App;