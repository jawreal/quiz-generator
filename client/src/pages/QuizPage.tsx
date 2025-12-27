import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent, 
  CardFooter, 
} from "@/components/ui/card";
import { Badge, type KeyOfVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import QuizProgress from "@/components/custom/QuizProgress";
import { Fragment, useMemo, useState, useCallback, useEffect, type MouseEvent } from "react";
import { difficultyIcons, quizTypeIcons } from "@/lib/optionIcons";
import QuizQuestion from "@/components/custom/QuizQuestion";
import QuizError from "@/components/custom/QuizError";
import QuizPageSkeleton from "@/components/custom/QuizPageSkeleton";
import ScoreChart from "@/components/custom/ScoreChart";
import ScoreHeader from "@/components/custom/ScoreHeader";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import TakeQuiz from "@/services/takeQuiz";
import SubmitAnswer from "@/services/sendUserAns";
import { cn } from "@/lib/utils"

export interface IQuestions {
  _id?: string; 
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
  hasNextPage: boolean;
  completedPage: number;
  totalQuestions: number;
  totalAnswered: number;
  isCompleted: boolean;
};


const QuizPage = () => {
  const { quiz_id } = useParams();
  const [page, setPage] = useState<number>(1);
  const [openScore, setOpenScore] = useState<boolean>(false);
  const { 
    data,
    isLoading,
    refetch,
    error, 
  } = useQuery<IQuiz>({
    queryKey: ["take-quiz", page, quiz_id], 
    queryFn: () => TakeQuiz({ quiz_id, page }), 
    enabled: !!quiz_id
  });
  const [questions, setQuestions] = useState<IQuestions[]>([]);
  const DifficultyBadgeIcon = useMemo(() => {
   return data?.difficulty ? difficultyIcons[data?.difficulty.toLowerCase() as string] : undefined
  }, [data])
  
  const QuizTypeBadgeIcon = useMemo(() => {
   return data?.quizType ? quizTypeIcons[data?.quizType.toLowerCase() as string] : undefined
  }, [data])
  
  const onOpenChart = useCallback(() => setOpenScore(open => !open), []); 
  
  const submitAttempt = useCallback(async () => {
    try{
      const result = await SubmitAnswer({
        quiz_id, 
        answers: questions, 
        hasNextPage: data?.hasNextPage ?? false, 
      })
     if(data?.hasNextPage && result?.success){
       return setPage(currPage => currPage + 1);
     };
     refetch();
     onOpenChart();
    }catch(err){
      console.error(err)
    }
  }, [data?.hasNextPage, quiz_id, questions]);
  
  const incomplete: boolean = useMemo(() => {
    return questions.some((qstn: IQuestions) => qstn.userAns?.length === 0);
  }, [questions])
  
  useEffect(() => {
    console.log(data)
    if(data?.completedPage && !data.isCompleted){
      setPage(data.completedPage)
    }
    if(data?.questions){
      setQuestions(data.questions) 
    }
  }, [data])
  
  const navigateToPages = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const id = (e.currentTarget as HTMLElement).id;
    if(id === "next"){
      return setPage(currPage => currPage + 1)
    };
    setPage(currPage => currPage - 1)
  }, []);
  
  if(isLoading) {
    return <QuizPageSkeleton />
  }
  
  if(error){
    return <QuizError />
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-5 text-center font-inter gap-y-3">
    <div className="w-full max-w-[30rem] flex flex-col">
     <Card>
     <CardHeader className="gap-y-2">
      <CardTitle className="text-2xl font-extrabold">{data?.title ?? "No title found"}</CardTitle>
       <CardDescription className="flex gap-x-2 justify-center">
         <Badge variant={(data?.difficulty?.toLowerCase() ?? "default") as KeyOfVariants} className="rounded-full gap-x-1 capitalize p-2">
           {data?.difficulty ? <Fragment>
             {DifficultyBadgeIcon ? <DifficultyBadgeIcon size={15} /> : ""}
             {data?.difficulty}
             </Fragment> : "No quiz difficulty found"}
         </Badge>
         <Badge variant={(data?.quizType?.toLowerCase() ?? "default") as KeyOfVariants} className="rounded-full gap-x-1 capitalize p-2">
           {data?.quizType ? <Fragment>
             {QuizTypeBadgeIcon ? <QuizTypeBadgeIcon size={15} /> : ""}
             {data?.quizType}
             </Fragment> : "No quiz type found"}
         </Badge>
       </CardDescription>
      </CardHeader>
      <CardContent className={cn("bg-violet-500 dark:bg-violet-800 py-4 flex flex-col items-start gap-y-2 text-left", !data?.isCompleted && "rounded-b-lg")}>
        <span className="font-medium text-xs text-violet-300">AI Prompt</span>
        <span className="text-violet-50 text-sm line-clamp-4">{data?.userPrompt ?? "No AI prompt found"}</span>
      </CardContent>
      {data?.isCompleted && <CardFooter className="flex flex-col p-4 gap-y-3">
       <ScoreHeader
         score={data?.score ?? 0}
         total={data?.totalQuestions ?? 0}
       />
      </CardFooter>}
     </Card>
     {(!data?.isCompleted && !isLoading) && <QuizProgress totalAnswered={data?.totalAnswered ?? 0} totalQuestions={data?.totalQuestions ?? 0} />}
     <div className="w-full mt-4 flex flex-col gap-y-4">
     {questions?.map((obj: IQuestions, idx: number) =>
       <QuizQuestion
        key={idx} 
        obj={obj}
        setQuestions={setQuestions}
        isCompleted={data?.isCompleted ?? false}
      />)}
     {data?.isCompleted && <div className="w-full flex gap-x-2 items-center">
       <Button
         id="prev"
         disabled={page === 1} 
         size="lg" 
         className="flex-1 md:flex-0" 
         variant="outline"
         onClick={navigateToPages}>
         <ChevronLeft />
         Previous
       </Button>
       <Button 
         id="next"
         disabled={!data?.hasNextPage}
         size="lg" 
         className="flex-1 md:flex-0 ml-auto" 
         variant="outline" 
         onClick={navigateToPages}
        >
         Next
         <ChevronRight /> 
       </Button>
     </div>} 
     {(data?.isCompleted && !isLoading) && <ScoreChart score={data?.score ?? 0} total={data?.totalQuestions ?? 0} open={openScore} onOpenChange={onOpenChart} />}
    </div>
    {!data?.isCompleted && <div className="w-full md:w-auto ml-auto mb-2 mt-4">
      <Button
       disabled={incomplete} 
       variant="violet" 
       className="ml-auto w-full md:w-auto ml-auto active:scale-95 h-11"
       onClick={submitAttempt}>
        {data?.hasNextPage ? <Fragment>     <span>Next</span>
             <ChevronRight />
          </Fragment> :
          <span>Submit</span>
        }
      </Button>
    </div>}
    </div>
    </div>) 
}

export default QuizPage;