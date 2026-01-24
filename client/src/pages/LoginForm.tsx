import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import CustomInput from "@/components/custom/CustomInput"
import { Label } from "@/components/ui/label";
import type { UserAuth } from "@/services/registerAccount";
import AuthenticateUser from "@/services/authenticateUser";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AtSign, Lock, RefreshCw } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuthProvider"
import { CustomToast } from "@/components/custom/CustomToast"

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<UserAuth>();
  const { refetch, setIsLoggedIn } = useAuth();
  
  const onSubmit: SubmitHandler<UserAuth> = async (data) => {
    const isValid = Object.values(data).every((v) => v !== "" && v !== undefined && v !== null);
    if(!isValid){
      return CustomToast({
        status: "error", 
        description: "All fields are required.",
      })
    }
    const result = await AuthenticateUser(data);
    if(!result?.success){
      if(result?.message){
        console.log(result?.message) 
      };
      console.log("Failed to login")
      return 
    };
    refetch();
    setIsLoggedIn(true);
    console.log("Login successful")
  }
  return (
    <div className={cn("flex-1 flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <img src="/logo.png" className="size-8" />
              </div>
              <span className="sr-only">Neuro-quiz.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Neuro-quiz</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <CustomInput
                icon={AtSign}
                id="username"
                placeholder="Enter username"
                className="h-11"
                {...register("username")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <CustomInput
                icon={Lock}
                id="password"
                isPassword={true}
                placeholder="••••••••••"
                {...register("password")}
                className="h-11" 
              />
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="violet"
              className="w-full h-11">
             {isSubmitting && <RefreshCw className="animate-spin" />}
             {isSubmitting ? "Please wait..." : "Login"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;