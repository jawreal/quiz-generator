import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import type { UserAuth } from "@/services/registerAccount";
import AuthenticateUser from "@/services/authenticateUser";
import { useForm, type SubmitHandler } from "react-hook-form";

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { register, handleSubmit } = useForm<UserAuth>();
  const onSubmit: SubmitHandler<UserAuth> = async (data) => {
    const result = await AuthenticateUser(data);
    if(!result?.success){
      if(result?.message){
        console.log(result?.message) 
      };
      console.log("Failed to login")
    };
    console.log("Login successful")
  }
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
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to GenQuiz</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johnDoe.23"
                className="h-11"
                {...register("username")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                {...register("password")}
                className="h-11" 
              />
            </div>
            <Button type="submit" variant="purple" className="w-full h-11">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm;