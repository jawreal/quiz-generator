import { memo, type InputHTMLAttributes, useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: LucideIcon;
  isPassword?: boolean;
}

const CustomInput = (props: CustomInputProps) => {
  const { icon: Icon, isPassword = false, ...rest } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const onShowPassword = useCallback(() => {
    setShowPassword(show => !show)
  }, []);
  
  return (
    <div className="w-full relative">
      <Icon size={20} className="absolute left-3 top-3 text-zinc-500" />
      <Input 
        {...rest} 
        type={!isPassword ? "text" : (!showPassword ? "password" : "text")}
        className="h-11 pl-9 rounded-lg shadow-none"/>
      {isPassword && 
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onShowPassword} 
        className="absolute right-2 top-1 [&_svg]:size-[20px] text-zinc-500"
      >
       {!showPassword ? <Eye /> : <EyeOff />}
      </Button>} 
    </div>
  )
};

export default memo(CustomInput);