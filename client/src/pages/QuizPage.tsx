import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter, 
} from "@/components/ui/card";
import { Badge, type KeyOfVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import QuizProgress from "@/components/custom/QuizProgress";
import { Fragment, useMemo } from "react";
import { difficultyIcons, quizTypeIcons } from "@/lib/optionIcons";
import QuizQuestion from "@/components/custom/QuizQuestion";
//import ScoreChart from "@/components/custom/ScoreChart";
import { MoveRight } from "lucide-react";

export interface IQuestions {
  question: string;
  questionNumber: number;
  options?: string[];
  correctAns: string;
  userAns: string;
}

interface IQuiz {
  user?: string, 
  title: string;
  questions: IQuestions[];
  difficulty: string;
  quizType: string;
  userPrompt: string;
  score?: number; 
}


const QuizPage = (props: IQuiz) => {
  const { title, questions, difficulty, quizType, userPrompt, score } = props;
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
     {questions?.map((obj: IQuestions, idx: number) =>
       <QuizQuestion key={idx} obj={obj ?? []} score={score} />)}
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