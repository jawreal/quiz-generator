import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizRoute from "@/routers/QuizRoute";
import { AuthProvider } from "@/hooks/useAuthProvider";
import LoginForm from "@/pages/LoginForm";
import SignUpForm from "@/pages/SignUpForm";
import LandingPage from "@/pages/LandingPage";
import useDarkMode from "@/hooks/useDarkMode";


const App = () => {
  useDarkMode();
  return (
  <AuthProvider>
    <Router>
      <Routes>
       <Route path="/quiz/*" element={<QuizRoute />} />
       <Route path="/login" element={<LoginForm className="w-full md:max-w-[25rem]" />} />
       <Route path="/sign-up" element={<SignUpForm className="w-full md:max-w-[25rem]" />} />
       <Route path="/auth" element={<LandingPage />} />
      </Routes>
    </Router>
  </AuthProvider>
  )
}

export default App;