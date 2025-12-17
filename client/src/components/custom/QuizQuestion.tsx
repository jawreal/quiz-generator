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

interface IProps {
  obj: IQuestions;
  score: number | null | undefined;
}

const QuizQuestion = ({ obj, score }: IProps) => {
  const isCorrect: boolean = obj?.userAns?.toLowerCase() === obj?.correctAns?.toLowerCase(); 
  return (
    <div>
     <Card className="shadow-sm">
      <CardContent className="text-left py-5 flex flex-col gap-y-4 relative">
         <span className="flex gap-x-2">
           <span>{`${obj?.questionNumber ?? "0"}.`} {obj?.question ?? "No question found"}</span>
         </span>
         {!obj?.options &&
         <div className="w-full relative">
          <Input disabled={true} value={obj?.userAns ?? ""}  type="text" className={"border-x-0 border-t-0 shadow-none rounded-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-b border-slate-300 dark:border-slate-800 px-0 focus:border-purple-500 text-sm"} /> 
          {isCorrect && score ? <Check className="absolute right-0 top-2 text-green-500" size ={20}/> : <X className="absolute right-0 top-2 text-red-500" size ={20}/>}
         </div>} 
       </CardContent>
      {!isCorrect && score && <CardFooter className="py-4 border-t flex-col items-start gap-y-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Correct answer</span>
        <span className="text-sm">{obj?.correctAns ?? "No correct answer found"}</span>
       </CardFooter>}
      </Card>
      {obj?.options?.length && obj?.options?.length > 0 &&
         (<RadioGroup className="space-y-2 mt-4 w-full">
         {obj?.options?.map((option: string, idx: number) => {
         const selectedAns = obj?.userAns && obj?.userAns === option
         return (<Label key={idx} htmlFor={option} className={cn("w-full flex items-center gap-x-2 font-normal p-5 rounded-lg border", selectedAns && "bg-green-100 border-green-400 dark:bg-green-950/50 dark:border-green-700", selectedAns && !isCorrect && "bg-red-100 border-red-400 dark:bg-red-950/50 dark:border-red-700", "border-slate-300 dark:border-slate-800")}>
         <RadioGroupItem id={option} value={option}
         className={`border-slate-400 shadow-none dark:border-slate-800 text-white dark:text-slate-900/80 ${selectedAns && isCorrect ? "data-[state=checked]:bg-green-500 data-[state=checked]:bg-green-500 text-green-400" : "data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"} text-left`}/>
           {option ?? "No option found"}
           {selectedAns && isCorrect ? <Check className="text-green-500 ml-auto flex-shrink-0"/> : selectedAns && !isCorrect ? <X className="text-red-500 ml-auto flex-shrink-0"/> : ""}
         </Label>)})}
       </RadioGroup>)}
     </div>)
};

export default QuizQuestion;