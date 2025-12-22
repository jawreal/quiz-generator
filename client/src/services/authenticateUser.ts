import type { UserAuth } from "@/services/registerAccount";

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
      return { success: false, message: "Incorrect credentials" };
    }
    if(!response.ok){
      throw new Error("Failed to submit request");
    }
    return { success: true };
  }catch(error){
    console.error(error)
    return { success: false } 
  }
};

export default AuthenticateUser;