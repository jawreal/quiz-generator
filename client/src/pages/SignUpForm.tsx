import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import CustomInput from "@/components/custom/CustomInput"
import { Label } from "@/components/ui/label";
import RegisterAccount, { type UserInfo } from "@/services/registerAccount";
import { useForm, type SubmitHandler } from "react-hook-form";
import { User, AtSign, Lock, RefreshCw } from "lucide-react"
import { Link } from "react-router-dom"
import { CustomToast } from "@/components/custom/CustomToast";
import { useAuth } from "@/hooks/useAuthProvider"


const SignUpForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<UserInfo>();
  const { refetch, setIsLoggedIn } = useAuth();
  
  const onSubmit: SubmitHandler<UserInfo> = async (data) => {
    const result = await RegisterAccount(data);
    if(result.success){
      refetch();
      return setIsLoggedIn(true);
    }
    CustomToast({
      status: "error", 
      description: "Internal server error"
    })
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <img src="/logo.png" className="size-8" />
              </div>
            </a>
            <h1 className="text-xl font-bold">Create Account</h1>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="login" className="underline underline-offset-4">
                Sign In
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
           <div className="grid grid-cols-2 gap-x-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name *</Label>
                <CustomInput
                  icon={User}
                  id="firstName"
                  placeholder="First name"
                  {...register("firstName")}
                 />
               </div> 
               <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <CustomInput
                  icon={User}
                  id="lastName"
                  placeholder="Last name"
                  {...register("lastName")}
                 />
               </div> 
            </div> 
            <div className="grid gap-2">
              <Label htmlFor="username">Username *</Label>
              <CustomInput
                icon={AtSign}
                id="username"
                placeholder="Create username"
                {...register("username")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password *</Label>
              <CustomInput
                icon={Lock}
                id="password"
                isPassword={true}
                placeholder="Create password"
                {...register("password")}
              />
            </div>
            <Button 
              disabled={isSubmitting}
              type="submit"
              variant="violet" 
              className="w-full h-11">
             {isSubmitting && <RefreshCw className="animate-spin" />}
             {isSubmitting ? "Please wait..." : "Register"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm;