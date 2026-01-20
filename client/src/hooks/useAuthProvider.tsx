import { useEffect, useState, useContext, createContext, type ReactNode, type Dispatch, type SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

interface IAuth {
  fullName: string | undefined;
  username: string | undefined;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  error?: Error | null;
  isLoading: boolean; 
  refetch: () => void;
}

const AuthContext = createContext<IAuth | null>(null);

const AuthProvider = ({ children }: {
  children: ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { data, isLoading, error, refetch } = useQuery<IAuth>({
    queryKey: ["user"], 
    queryFn: async () => {
      const res = await fetch("/api/auth/check/user");
      if(!res.ok){
        throw new Error("Unauthorized")
      }
      const user = await res.json();
      return user
    }
  });
  
  useEffect(() => {
    if(!isLoading && data){
      setIsLoggedIn(true)
    }
  }, [isLoading, data])
  
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center dark:bg-zinc-950">
        <Loader
          size={50}
          className="animate-spin text-violet-400"
        />
      </div>
    );
  }
  
  return (
    <AuthContext.Provider value={{ fullName: data?.fullName, 
      username: data?.username,
      isLoggedIn, 
      setIsLoggedIn,
      error, 
      isLoading, 
      refetch, 
    }}>
     {children}
    </AuthContext.Provider>
    )
};

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export { useAuth, AuthProvider };
