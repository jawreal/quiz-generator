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
import QuizProgress from "@/components/custom/QuizProgress";
import { Fragment, useMemo } from "react";
import { difficultyIcons, quizTypeIcons } from "@/lib/optionIcons";
//import ScoreChart from "@/components/custom/ScoreChart";
import { X, Check, MoveRight } from "lucide-react";

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
  score: number; 
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
    <div className="w-full max-w-[30rem] flex flex-col">
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
        <span className="font-medium text-xs text-purple-300">AI Prompt</span>
        <span className="text-purple-50 text-sm line-clamp-4">{userPrompt ?? "No AI prompt found"}</span>
      </CardFooter>
     </Card>
     <QuizProgress currentQuestions={questions?.length ?? 0} totalQuestions={10} />
     <div className="w-full flex flex-col gap-y-4">
     {questions?.map((obj: IQuestions, idx: number) => {
       const isCorrect: boolean = obj?.userAns === obj?.correctAns;
       return (
       <div key={idx}>
       <Card className="shadow-sm">
       <CardContent className="text-left py-5 flex flex-col gap-y-4 relative">
         <span className="flex gap-x-2">
           <span>{`${obj?.questionNumber ?? "0"}.`} {obj?.question ?? "No question found"}</span>
         </span>
         {!obj?.options &&
         <div className="w-full relative">
          <Input value="Apple in the tree" type="text" className="border-x-0 border-t-0 shadow-none rounded-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-b border-slate-300 dark:border-red-500 px-0 dark:text-red-500 focus:border-purple-500 text-sm" /> 
          <X className="absolute right-0 top-2 text-red-500" size ={20}/>
         </div>} 
       </CardContent>
       <CardFooter className="py-4 border-t flex-col items-start gap-y-2">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Correct answer</span>
        <span className="text-sm">{obj?.correctAns ?? "No correct answer found"}</span>
       </CardFooter>
      </Card>
      {obj?.options?.length && obj?.options?.length > 0 &&
         (<RadioGroup className="space-y-2 mt-4 w-full">
         {obj?.options?.map((option: string, idx: number) => {
         const rightAns = obj?.userAns && obj?.userAns === option
         return (<Label key={idx} htmlFor={option} className={`w-full flex items-center gap-x-2 font-normal p-5 rounded-lg border ${rightAns ? "bg-green-100 border-green-400 dark:bg-green-950/50 dark:border-green-700" : rightAns && !isCorrect ? "bg-red-100 border-red-400 dark:bg-red-950/50 dark:border-red-700" :"border-slate-300 dark:border-slate-800"}`}>
         <RadioGroupItem id={option} value={option}
         className={`border-slate-400 shadow-none dark:border-slate-800 text-white dark:text-slate-900/80 ${rightAns && isCorrect ? "data-[state=checked]:bg-green-500 data-[state=checked]:bg-green-500 text-green-400" : "data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"} text-left`}/>
           {option ?? "No option found"}
           {rightAns && isCorrect ? <Check className="text-green-500 ml-auto flex-shrink-0"/> : rightAns && !isCorrect ? <X className="text-red-500 ml-auto flex-shrink-0"/> : ""}
         </Label>)})}
       </RadioGroup>)}
     </div>)
     })}
     {/*<ScoreChart score={score ?? 0} total={questions?.length ?? 0} />*/}
    </div>
    <div className="w-full md:w-auto ml-auto mb-2 mt-4">
      <Button variant="purple" className="ml-auto w-full md:w-auto ml-auto active:scale-95 h-11">
        <span>Next</span>
        <MoveRight />
      </Button>
    </div> 
    </div>
    </div>) 
}

export default QuizPage;