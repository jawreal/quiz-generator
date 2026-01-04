import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizRoute from "@/routers/QuizRoute";
import AuthRoute from "@/routers/AuthRoute";
import { AuthProvider } from "@/hooks/useAuthProvider";
import useDarkMode from "@/hooks/useDarkMode";


const App = () => {
  useDarkMode();
  return (
  <AuthProvider>
    <Router>
      <Routes>
       <Route path="/quiz/*" element={<QuizRoute />} />
       <Route path="/auth/*" element={<AuthRoute />} />
      </Routes>
    </Router>
  </AuthProvider>
  )
}

export default App;