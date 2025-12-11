import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const QuizPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-5 text-center font-inter">
    <div className="w-full max-w-[30rem] flex flex-col gap-y-3">
     <Card className="border-0 shadow-none">
     <CardHeader className="gap-y-2">
      <CardTitle className="text-2xl font-extrabold">The Solar System Quiz: Giant Planets Identification</CardTitle>
       <CardDescription className="flex gap-x-2 justify-center">
         <Badge variant="difficulty">Beginner</Badge>
         <Badge variant="quizType">Multiple Choice</Badge>
       </CardDescription>
      </CardHeader>
     </Card>
     <Card>
     <CardContent className="text-left py-5">
       <span>1. What is the difference in between your details?</span>
     </CardContent>
     </Card>
    </div>
    </div>) 
}

export default QuizPage;