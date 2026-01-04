import LoginForm from "@/pages/LoginForm";
import SignUpForm from "@/pages/SignUpForm";
import LandingPage from "@/pages/LandingPage";
import { Routes, Route, Navigate } from "react-router-dom";

const AuthRoute = () => {
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