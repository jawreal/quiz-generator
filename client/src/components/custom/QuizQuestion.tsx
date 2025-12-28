import { cn } from "@/lib/utils";
import { type  IQuestions } from "@/pages/QuizPage";
import {
  Card,
  CardContent, 
  CardFooter, 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Check } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useMemo, memo, useCallback, type ChangeEvent } from "react"

interface IProps {
  obj: IQuestions;
  setQuestions: Dispatch<SetStateAction<IQuestions[]>>;
  isCompleted: boolean;
}

const QuizQuestion = ({ 
  obj,
  setQuestions,
  isCompleted, 
  }: IProps) => {
  const isCorrect: boolean = useMemo(() => obj?.userAns?.toLowerCase() === obj?.correctAns?.toLowerCase(), [obj]); 
  
  const onUpdateAnswer = useCallback((value: string) => {
    setQuestions((qstn_docs: IQuestions[]) => {
      return qstn_docs?.map((qstn: IQuestions) => {
        if(qstn?._id === obj?._id){
          return { ...qstn, userAns: value }
        }
        return qstn;
      })
    });
  }, [setQuestions, obj] ); 
  
  const onOptionChange = useCallback((value: string) => {
    onUpdateAnswer(value)
  }, [onUpdateAnswer]);
  
  const onUpdateInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onUpdateAnswer(value)
  }, [onUpdateAnswer]);
  
  console.log(isCompleted)
  
  return (
    <div>
     <Card className="shadow-sm">
      <CardContent className="text-left py-5 flex flex-col gap-y-4 relative">
         <span className="flex gap-x-2">
           <span>{`${obj?.questionNumber ?? "0"}.`} {obj?.question ?? "No question found"}</span>
         </span>
         {obj?.options && obj?.options?.length === 0 &&
         <div className="w-full relative">
          <Input  
          disabled={isCompleted}
          value={obj?.userAns ?? ""}  
          onChange={onUpdateInput}
          className={"border-x-0 border-t-0 shadow-none rounded-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-b border-zinc-300 dark:border-zinc-800 px-0 focus:border-violet-500 text-sm"} /> 
          {isCorrect && isCompleted && <Check className="absolute right-0 top-2 text-green-500" size ={20}/>}
          {!isCorrect && isCompleted && <X className="absolute right-0 top-2 text-red-500" size ={20}/>}
         </div>} 
       </CardContent>
      {!isCorrect && isCompleted && <CardFooter className="py-4 border-t flex-col items-start gap-y-2 text-left">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Correct answer</span>
        <span className="text-sm">{obj?.correctAns ?? "No correct answer found"}</span>
       </CardFooter>}
      </Card>
      {obj?.options && obj?.options?.length > 0 &&
         (<RadioGroup 
         value={obj?.userAns?? ""} 
         onValueChange={onOptionChange}
         className="space-y-2 mt-4 w-full">
         {obj?.options?.map((option: string, idx: number) => {
         const selectedAns = obj?.userAns && obj?.userAns === option
         return (
         <Label key={idx} htmlFor={option} className={cn("w-full flex text-left leading-relaxed items-center gap-x-3 font-normal p-5 rounded-lg border", (selectedAns && isCorrect && isCompleted) && "bg-green-100 border-green-400 dark:bg-green-950/50 dark:border-green-700", (selectedAns && !isCorrect && isCompleted) && "bg-red-100 border-red-400 dark:bg-red-950/50 dark:border-red-700", "border-zinc-300 dark:border-zinc-800")}>
         <RadioGroupItem disabled={isCompleted} id={option} value={option}
         className={`border-zinc-400 shadow-none dark:border-zinc-800 text-white dark:text-zinc-900/80 ${(selectedAns && isCorrect && isCompleted) ? "data-[state=checked]:bg-green-500 data-[state=checked]:bg-green-500 text-green-400" : "data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500"} text-left`}/>
          <span className="inline-block" >{option ?? "No option found"}</span>
           {(selectedAns && isCorrect && isCompleted) ? <Check className="text-green-500 ml-auto flex-shrink-0"/> : (selectedAns && isCompleted && !isCorrect) ? <X className="text-red-500 ml-auto flex-shrink-0"/> : ""}
         </Label>
         )})}
       </RadioGroup>)}
     </div>)
};

export default memo(QuizQuestion);