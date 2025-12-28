import { useContext, createContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

interface IAuth {
  fullName: string | undefined;
  username: string | undefined;
}

const AuthContext = createContext<IAuth | null>(null);

const AuthProvider = ({ children }: {
  children: ReactNode;
}) => {
  const { data, isLoading } = useQuery<IAuth>({
    queryKey: ["user"], 
    queryFn: async () => {
      const res = await fetch("/api/auth/check/user");
      const user = await res.json();
      return user
    }
  });
  
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center dark:bg-zinc-950">
        <Loader
          size={50}
          className="animate-spin text-violet-500"
        />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ fullName: data?.fullName, username: data?.username }}>
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
