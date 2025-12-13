import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Fragment } from "react";

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
}


const QuizPage = (props: IQuiz) => {
  const { title, questions, difficulty, quizType } = props;
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-5 text-center font-inter">
    <div className="w-full max-w-[30rem] flex flex-col gap-y-4">
     <Card className="border-0 shadow-none">
     <CardHeader className="gap-y-2">
      <CardTitle className="text-2xl font-extrabold">{title ?? "No title found"}</CardTitle>
       <CardDescription className="flex gap-x-2 justify-center">
         <Badge variant="difficulty">{difficulty ?? "No quiz difficulty found"}</Badge>
         <Badge variant="quizType">{quizType ?? "No quiz type found"}</Badge>
       </CardDescription>
      </CardHeader>
     </Card>
     {questions?.map((obj: IQuestions, idx: number) => 
       <Card key={idx} className="shadow-sm">
       <CardContent className="text-left py-5 flex flex-col gap-y-4">
       <span className="text-sm">{obj?.question ?? "No question found"}</span>
        {obj?.options?.length > 0 ?
         (<RadioGroup className="space-y-2">
         {obj.options.map((option: string, idx: number) => <Fragment key={idx}>
         <Label htmlFor={option} className="flex items-center gap-x-2 font-normal">
         <RadioGroupItem id={option} value={option}
         className="border-purple-500 text-purple-500 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"/>
           {option ?? "No option found"} 
         </Label>
       </Fragment>)}
       </RadioGroup>) : 
       <Input type="text" className="border-x-0 border-t-0 shadow-none rounded-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-b border-slate-300 dark:border-slate-800 px-0" />}
       </CardContent>
     </Card>)}
    </div>
    </div>) 
}

export default QuizPage;