import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import CustomInput from "@/components/custom/CustomInput"
import { Label } from "@/components/ui/label";
import RegisterAccount, { type UserInfo } from "@/services/registerAccount";
import { useForm, type SubmitHandler } from "react-hook-form";
import { User, AtSign, Lock } from "lucide-react"

const SignUpForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { register, handleSubmit } = useForm<UserInfo>();
  
  const onSubmit: SubmitHandler<UserInfo> = async (data) => {
    const result = await RegisterAccount(data);
    console.log(result);
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
              <a href="#" className="underline underline-offset-4">
                Sign In
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
           <div className="grid grid-cols-2 gap-x-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <CustomInput
                  icon={User}
                  id="firstName"
                  placeholder="John"
                  {...register("firstName")}
                 />
               </div> 
               <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <CustomInput
                  icon={User}
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                 />
               </div> 
            </div> 
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <CustomInput
                icon={AtSign}
                id="username"
                placeholder="johnDoe.23"
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
              />
            </div>
            <Button type="submit" variant="violet" className="w-full h-11">
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm;