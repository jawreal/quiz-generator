import { memo, useMemo, Fragment } from "react";
import { Progress } from "@/components/ui/progress";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface IProps {
  currentQuestions: number;
  totalQuestions: number;
}

const QuizProgress = (props: IProps) => {
  const { currentQuestions, totalQuestions } = props;
  const progressValue: number = useMemo(() => Math.round((currentQuestions / totalQuestions ) * 100), [currentQuestions, totalQuestions]); // progress value converted to percent
  
  const { ref: progressRef , inView: progressInView } = useInView({
    triggerOnce: false, 
    threshold: 0.1,
  }) // intersection observer for progress
  
  return (
     <Fragment>
       <div ref={progressRef} className="h-px" /> 
       <div className={cn("my-4 flex flex-col items-start gap-y-2 sticky top-0 bg-white dark:bg-slate-950 z-10 py-2 transition-all", !progressInView && "py-3 pb-4 border-b border-slate-300 dark:border-slate-800")}>
         <span className="font-medium self-start text-sm text-slate-500 dark:text-slate-400">5 questions out of 10</span> 
         <Progress value={progressValue} className="[&>div]:bg-purple-500" /> 
       </div>
     </Fragment>
    )
};

export default memo(QuizProgress);