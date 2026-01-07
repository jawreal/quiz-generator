import type { UserAuth } from "@/services/registerAccount";
import { CustomToast } from "@/components/custom/CustomToast"

const AuthenticateUser = async (props: UserAuth) => {
  try{
    const response = await fetch("/api/auth/login", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(props), 
      credentials: "include"
    });
    if(response.status === 401) {
      CustomToast({
        status: "error", 
        description: "Incorrect username or password"
      })
      return { success: false, message: "Incorrect credentials" };
    }
    if(!response.ok){
      throw new Error("Failed to submit request");
    }
    return { success: true };
  }catch(error){
    console.error(error)
    CustomToast({
      status: "error", 
      description: "Internal server error"
    })
    return { success: false } 
  }
};

export default AuthenticateUser;