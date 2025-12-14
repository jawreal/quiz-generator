import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter, 
} from "@/components/ui/card";
import { Badge, type KeyOfVariants } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Fragment, useMemo } from "react";
import { difficultyIcons, quizTypeIcons } from "@/lib/optionIcons"

interface IQuestions {
  question: string;
  questionNumber: number;
  options?: string[];
  correctAns: string;
  userAns: string;
}

interface IQuiz {
  //user: Schema.Types.ObjectId, 
  title: string;
  questions: IQuestions[];
  difficulty: string;
  quizType: string;
  userPrompt: string;
}


const QuizPage = (props: IQuiz) => {
  const { title, questions, difficulty, quizType, userPrompt } = props;
  const DifficultyBadgeIcon = useMemo(() => {
   return difficulty ? difficultyIcons[difficulty.toLowerCase() as string] : undefined
  }, [difficulty])
  const QuizTypeBadgeIcon = useMemo(() => {
   return quizType ? quizTypeIcons[quizType.toLowerCase() as string] : undefined
  }, [difficulty])
  
  
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-5 text-center font-inter gap-y-3">
    <div className="w-full max-w-[30rem] flex flex-col gap-y-4">
     <Card>
     <CardHeader className="gap-y-2">
      <CardTitle className="text-2xl font-extrabold">{title ?? "No title found"}</CardTitle>
       <CardDescription className="flex gap-x-2 justify-center">
         <Badge variant={(difficulty?.toLowerCase() ?? "default") as KeyOfVariants} className="rounded-full gap-x-1 capitalize p-2">
           {difficulty ? <Fragment>
             {DifficultyBadgeIcon ? <DifficultyBadgeIcon size={15} /> : ""}
             {difficulty}
             </Fragment> : "No quiz difficulty found"}
         </Badge>
         <Badge variant={(quizType?.toLowerCase() ?? "default") as KeyOfVariants} className="rounded-full gap-x-1 capitalize p-2">
           {quizType ? <Fragment>
             {QuizTypeBadgeIcon ? <QuizTypeBadgeIcon size={15} /> : ""}
             {quizType}
             </Fragment> : "No quiz type found"}
         </Badge>
       </CardDescription>
      </CardHeader>
      <CardFooter className="bg-purple-500 dark:bg-purple-800 py-4 rounded-b-md flex flex-col items-start gap-y-1 text-left">
        <span className="font-medium text-xs">AI Prompt</span>
        <span className="text-purple-300 text-sm line-clamp-4">{userPrompt ?? "No AI prompt found"}</span>
      </CardFooter>
     </Card>
     {questions?.map((obj: IQuestions, idx: number) => 
       <Card key={idx} className="shadow-sm dark:bg-slate-900/80">
       <CardContent className="text-left py-5 flex flex-col gap-y-4">
       <span>{obj?.question ?? "No question found"}</span>
        {obj?.options?.length && obj?.options?.length > 0 ?
         (<RadioGroup className="space-y-2">
         {obj?.options?.map((option: string, idx: number) => <Fragment key={idx}>
         <Label htmlFor={option} className="flex items-center gap-x-2 font-normal">
         <RadioGroupItem id={option} value={option}
         className="border-slate-400 shadow-none dark:border-slate-800 text-white dark:text-slate-900/80 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"/>
           {option ?? "No option found"} 
         </Label>
       </Fragment>)}
       </RadioGroup>) : 
       <Input type="text" className="border-x-0 border-t-0 shadow-none rounded-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-b border-slate-300 dark:border-slate-800 px-0 focus:border-purple-500" />}
       </CardContent>
     </Card>)}
    </div>
    <div className="ml-auto">
      <Button variant="purple" className="ml-auto active:scale-95">Submit</Button>
    </div>
    </div>) 
}

export default QuizPage;