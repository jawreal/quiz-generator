import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SignUpForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
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
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className="h-11"
                 />
               </div> 
               <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  className="h-11"
                 />
               </div> 
            </div> 
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johnDoe.23"
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                className="h-11"
              />
            </div>
            <Button type="submit" variant="purple" className="w-full h-11">
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm;