import LoginForm from "@/pages/LoginForm";
import SignUpForm from "@/pages/SignUpForm";
import LandingPage from "@/pages/LandingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuthProvider"

const AuthRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();
  if(isLoggedIn && !isLoading){
    return <Navigate to="/quiz/create" replace />
  }
  return (
  <Routes>
     <Route path="/" element={<LandingPage />}>
       <Route path="login" element={<LoginForm />} />
       <Route index element={<SignUpForm />} />
       <Route
         path="*"
         element={<Navigate to="/auth" replace />}
         />
       </Route>
    </Routes>
  );
};

export default AuthRoute;