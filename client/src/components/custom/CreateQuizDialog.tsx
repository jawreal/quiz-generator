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
import { useState } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import CreateQuiz from "@/services/createQuiz";
import { RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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

const difficultyOptions: string[] = ["beginner", "intermediate", "advanced", "expert"]
const quizTypeOptions: string[] = ["multiple choice", "identification", "mixed"]

const CreateQuizDialog = (props: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { open, onOpenChange } = props;
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<IUserPrompt>();
  const [quizData, setQuizData] = useState<QuizData>({
    difficulty: "beginner", 
    quizType: "multiple choice", 
  });
  const onSubmit: SubmitHandler<IUserPrompt> = async (data) => {
    /*queryClient.invalidateQueries({
      queryKey: ["quizzes"]
    });
    navigate(`/quiz/take`) */
    const input = { ...data, ...quizData };
    const result = await CreateQuiz(input);
    if (!result?.success || !result?.quiz_id) {
      console.error("Failed to create quiz or missing quiz_id");
      return;
    }
    queryClient.invalidateQueries({
      queryKey: ["quizzes"]
    });
    navigate(`/quiz/take/${result?.quiz_id}`) 
    //onOpenChange();
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
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
         <div className="w-full relative">
         <Textarea {...register("userPrompt")} placeholder="Create your AI prompt" className="rounded-lg" rows={5}/>  
         </div>
          <DialogFooter className="flex-row gap-x-2">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">Cancel</Button>
            </DialogClose>
            <Button disabled={isSubmitting} variant="violet" type="submit" className="flex-1 transition-all active:scale-95">
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