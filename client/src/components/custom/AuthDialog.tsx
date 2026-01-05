import {
  Dialog,
  DialogTitle, 
  DialogDescription, 
  DialogContent,
} from "@/components/ui/dialog"
import { type ReactNode } from "react";

interface IProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: () => void;
}


const AuthDialog = (props: IProps) => {
  const { open, onOpenChange, children } = props;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-lg w-[calc(100%-2rem)] flex justify-center max-w-md"> 
         <div className="sr-only">
           <DialogTitle />
           <DialogDescription />
         </div>
         {children} 
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog;