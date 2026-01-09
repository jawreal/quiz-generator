import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizRoute from "@/routers/QuizRoute";
import AuthRoute from "@/routers/AuthRoute";
import { AuthProvider } from "@/hooks/useAuthProvider";
import useDarkMode from "@/hooks/useDarkMode";


const App = () => {
  useDarkMode();
  return (
  <Router> 
    <AuthProvider>
      <Routes>
       <Route path="/quiz/*" element={<QuizRoute />} />
       <Route path="/auth/*" element={<AuthRoute />} />
      </Routes>
    </AuthProvider>
  </Router> 
  )
}

export default App;