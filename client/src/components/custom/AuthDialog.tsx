import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
      <DialogContent className="sm:max-w-[425px]"> 
         {children} 
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog;