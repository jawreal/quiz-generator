import { Fragment, useCallback, memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription, 
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomToast } from "@/components/custom/CustomToast";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react"
import { useQueryClient } from "@tanstack/react-query";

interface IDelete {
  quizName: string;
  quiz_id: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const DeleteQuizDialog = ({
  quizName,
  quiz_id,
  open,
  onOpenChange,
}: IDelete) => {
  const queryClient = useQueryClient();
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "loading">("idle");
  
  const onClose = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])
  
  const onDelete = useCallback(async () => {
    try{
      setDeleteStatus("loading")
      if(!quiz_id){
        throw new Error("Quiz id is required for deleting quiz")
      }
      const response = await fetch("/api/quiz/delete", {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
          quiz_id,
        })
      });
      if(!response.ok){
        throw new Error("Failed to delete the quiz")
      }
      queryClient.invalidateQueries({
          queryKey: ["quizzes"]
        }); // refetch the quizzes in app sidebar
      CustomToast({
        status: "success", 
        description: "Quiz is successfully deleted", 
      })
    }catch(err){
      console.error(err);
      CustomToast({
        status: "error", 
        description: "Failed to delete the quiz", 
      })
    }finally{
      setDeleteStatus("idle")
      onClose()
    }
  }, [quiz_id, onOpenChange])
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] gap-y-0 md:min-w-[30rem] font-inter flex flex-col">
        <DialogHeader className="text-left">
          <DialogTitle className="font-inter text-1xl transform -translate-y-2 truncate pr-7">
            Confirm deletion of {quizName ?? "Failed to load the quiz"}
          </DialogTitle>
          <DialogDescription className="sr-only" />
        </DialogHeader>
        <Alert variant="destructive" className="mt-1 max-[5rem] dark:border-red-500">
          <AlertTitle className="dark:text-red-400" >This action cannot be undone</AlertTitle>
          <AlertDescription className="w-full max-w-80 dark:text-red-400">
            Are you sure you want to delete this quiz?
          </AlertDescription>
        </Alert>
        <DialogFooter className="mt-4 flex-row gap-x-2">
          <Button
            disabled={deleteStatus === "loading"}
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            disabled={deleteStatus === "loading"}
            onClick={onDelete}
            className="cursor-pointer flex-1 border border-red-300 bg-red-200/70 dark:bg-red-900/70 dark:border-red-700 shadow-none text-red-500 dark:text-red-50 hover:bg-red-200 dark:hover:bg-red-900"
          >
            {deleteStatus === "loading" ? (
              <Fragment>
                <RefreshCw size={20} className="animate-spin" />
                <span>Deleting...</span>
              </Fragment>
            ) : (
              <span>Delete</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(DeleteQuizDialog);