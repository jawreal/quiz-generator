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

interface IProps {
  open: boolean;
  onOpenChange: () => void;
}

export interface QuizData {
  difficulty: string;
  quizType: string;
}

const difficultyOptions: string[] = ["beginner", "intermediate", "advanced", "expert"]
const quizTypeOptions: string[] = ["multiple choice", "identification", "mixed"]

const CreateQuizDialog = (props: IProps) => {
  const { open, onOpenChange } = props;
  const [quizData, setQuizData] = useState<QuizData>({
    difficulty: "beginner", 
    quizType: "multiple choice", 
  });
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <form>
        <DialogContent className="sm:max-w-[425px]">
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
         <Textarea placeholder="Create your AI prompt" className="rounded-lg" rows={5}/>  
         </div>
          <DialogFooter className="flex-row gap-x-2">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">Cancel</Button>
            </DialogClose>
            <Button variant="purple" type="submit" className="flex-1">Generate</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateQuizDialog;