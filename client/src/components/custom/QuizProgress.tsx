import { memo, useMemo, Fragment } from "react";
import { Progress } from "@/components/ui/progress";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface IProps {
  totalAnswered: number;
  totalQuestions: number;
}

const QuizProgress = (props: IProps) => {
  const { totalAnswered, totalQuestions } = props;
  const progressValue: number = useMemo(() => Math.round((totalAnswered / totalQuestions ) * 100), [totalAnswered, totalQuestions]); // progress value converted to percent
  
  const { ref: progressRef , inView: progressInView } = useInView({
    triggerOnce: false, 
    threshold: 0.1,
  }) // intersection observer for progress
  
  const questionsLeft: number = useMemo(() =>  totalQuestions - totalAnswered, [totalAnswered, totalQuestions]);
  
  const quizCompleted: boolean = useMemo(() => questionsLeft === 0, [questionsLeft])
  
  return (
     <Fragment>
       <div ref={progressRef} className="h-px" /> 
       <div className={cn("mt-4 flex flex-col items-start gap-y-2 sticky top-0 bg-white dark:bg-zinc-950 z-10 py-2 transition-all", !progressInView && "py-3 pb-4 border-b border-zinc-300 dark:border-zinc-800")}>
         <span className="font-medium self-start text-sm text-zinc-500 dark:text-zinc-400">{!quizCompleted ? `${questionsLeft} question/s left` : "Quiz completed!"}</span> 
         <Progress value={progressValue} className={cn("[&>div]:bg-violet-500", quizCompleted && "[&>div]:bg-emerald-600")}/> 
       </div>
     </Fragment>
    )
};

export default memo(QuizProgress);