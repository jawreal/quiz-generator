import { Fragment, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { type IAuthStore, useAuthStore } from "@/store/authStore";
import QuizError from "@/components/custom/QuizError"

interface IAuth extends Pick<IAuthStore, "fullName" | "username"> {} // get the fullName and username only

const AuthProvider = ({ children }: {
  children: ReactNode;
}) => {
  const { setUser } = useAuthStore();
  const { isLoading, error } = useQuery<IAuth>({
    queryKey: ["user-auth"], 
    queryFn: async () => {
      const response = await fetch("/api/auth/check/user", {
        credentials: "include"
      });
      if(!response.ok){
        console.log("Failed to fetch session")
        throw new Error("Failed to fetch session")
      }
      const result = await response.json();
      if(result?.isSuccess){
        setUser({
        fullName: result?.fullName ?? null, 
        username: result?.username ?? null,  
        }); 
      } // set the user directly if the user is authenticated
      
      // return the result but do nothing about it. (this is required)
      return result
    }, 
    staleTime: 1000 * 60 * 5, // 5 minute
  });
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center dark:bg-zinc-950 dark:text-white">
        <Loader
          size={50}
          className="animate-spin text-violet-400"
        />
      </div>
    );
  }
  
  if(error){
    return <QuizError />
  }
  
  return (
    <Fragment>
      {children}
    </Fragment>
  )
};

export { AuthProvider };
