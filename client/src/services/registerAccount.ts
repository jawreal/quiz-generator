export type UserInfo = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
} 

const RegisterAccount = async (userInfo: UserInfo) => {
  try{
    const response = await fetch("/api/auth/register", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(userInfo), 
      credentials: "include"
    });
    if(!response.ok){
      throw new Error("Failed to register user")
    };
    //const result = await response.json();
    return { success: true };
  }catch(error){
    console.error(error)
    return { success: false };
  }
}

export default RegisterAccount;