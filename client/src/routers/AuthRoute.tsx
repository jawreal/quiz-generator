import LoginForm from "@/pages/LoginForm";
import SignUpForm from "@/pages/SignUpForm";
import LandingPage from "@/pages/LandingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore"
import { useQueryDummy } from "@/hooks/useQueryDummy";

const AuthRoute = () => {
  const { isLoggedIn } = useAuthStore();
  const { isLoading } = useQueryDummy("user-auth");
  
  if(isLoggedIn && !isLoading) {
    return <Navigate to="/quiz/create" replace />
  } 
  
  if(isLoading){
    return null
  }

  return (
  <Routes>
     <Route path="/" element={<LandingPage />}>
       <Route path="login" element={<LoginForm />} />
       <Route index element={<SignUpForm />} />
       </Route>
    </Routes>
  );
};

export default AuthRoute;