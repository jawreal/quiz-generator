import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizRoute from "@/routers/QuizRoute";
import { AuthProvider } from "@/hooks/useAuthProvider";
import LoginForm from "@/pages/LoginForm";


const App = () => {
  return (
  <AuthProvider>
    <Router>
      <Routes>
       <Route path="/quiz/*" element={<QuizRoute />} />
       <Route path="/login" element={<LoginForm className="w-full md:max-w-[25rem]" />} />
      </Routes>
    </Router>
  </AuthProvider>
  )
}

export default App;