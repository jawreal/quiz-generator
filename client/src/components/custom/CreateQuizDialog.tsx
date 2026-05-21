import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import CustomDropdown from '@/components/custom/CustomDropdown'
import { useState, useMemo } from 'react';
import { useWatch, useForm, type SubmitHandler } from "react-hook-form";
import { RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CustomToast } from "@/components/custom/CustomToast";

interface IProps {
  open: boolean;
  onOpenChange: () => void;
}

export interface QuizData {
  difficulty: string;
  quizType: string;
}

interface IUserPrompt {
  userPrompt: string;
};

export const difficultyOptions: string[] = ["beginner", "intermediate", "advanced", "expert"]
export const quizTypeOptions: string[] = ["multiple choice", "identification", "mixed"]

const CreateQuizDialog = (props: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { open, onOpenChange } = props;
  const { register, control, handleSubmit, formState: { isSubmitting } } = useForm<IUserPrompt>({
    mode: "onChange"
  });
  const [quizData, setQuizData] = useState<QuizData>({
    difficulty: "beginner", 
    quizType: "multiple choice", 
  });
  
  const { userPrompt } = useWatch<IUserPrompt>({
    control
  });
  
  const inputValue = useMemo(() => {
    if(!userPrompt){
      return false 
    }
    
    return userPrompt?.trim()?.length > 0
  }, [userPrompt])
  
  const onSubmit: SubmitHandler<IUserPrompt> = async (data) => {
    try{
      const input = { ...data, ...quizData }; 
      const response = await fetch("/api/quiz/ai/generate", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(input), 
        credentials: "include"
      });
      
      if(response.status === 401){
      // this would check if the user hit the limit
        const result = await response.json();
        if(result?.reachedLimit){
          return CustomToast({
            status: "error", 
            description: "You reached your daily quiz limit"
          })
        }
      }
    
      if(!response.ok){
        throw new Error("Internal server error.");
      }
      
      const quiz = await response.json();
      queryClient.invalidateQueries({
        queryKey: ["quizzes"]
      });
      navigate(`/quiz/take/${quiz?.quiz_id}`) 
    }catch(error){
      console.error(error)
      CustomToast({
        status: "error", 
        description: "Internal server error. Please try again."
      })
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> 
          <DialogHeader className="text-left">
            <DialogTitle>Generate Quiz</DialogTitle>
            <DialogDescription>
              Let AI create an interactive quiz according to your prompt
            </DialogDescription>
          </DialogHeader>        
          <div className="flex gap-x-2">
            <CustomDropdown title="difficulty" options={difficultyOptions} state={quizData} setState={setQuizData} /> 
           <CustomDropdown title="quizType" options={quizTypeOptions} state={quizData} setState={setQuizData} /> 
         </div>
         <div className="w-full relative flex flex-col gap-y-2">
         <Textarea {...register("userPrompt")} placeholder="Create your AI prompt" className="rounded-lg" rows={5}/>
         <span className="text-xs text-gray-500">
           Daily Limit: You can generate up to 3 quizzes per day. This limit is due to AI free-tier usage restrictions.</span>
         </div>
          <DialogFooter className="flex-row gap-x-2">
            <DialogClose asChild>
              <Button disabled={isSubmitting} variant="outline" className="flex-1">Cancel</Button>
            </DialogClose>
            <Button disabled={isSubmitting || !inputValue} variant="violet" type="submit" className="flex-1 transition-all active:scale-95">
             {isSubmitting && <RefreshCw className="animate-spin" />}
             {isSubmitting ? "Please wait..." : "Generate"}
            </Button>
            </DialogFooter>
         </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateQuizDialog;