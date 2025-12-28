import type { IProps, IScoreStats } from "@/components/custom/ScoreChart";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { useMemo, Fragment, memo } from "react";
import { Separator } from "@/components/ui/separator"

const ScoreHeader = (props: IProps) => {
  const { score, total } = props;
  const percentage = useMemo(() => 
  Math.round((score / total) * 100), [score, total]);
  const totalWrongAns = useMemo(() => (total - score), [score, total]);
  
  const statsLabel = useMemo(() => [
    {
      text: "Correct Answers", 
      value: score, 
    },
    {
      text: "Wrong Answers", 
      value: totalWrongAns, 
    }, 
    {
      text: "Total Questions", 
      value: total, 
    }, 
    {
      text: "Accuracy", 
      value: percentage, 
    }, 
  ], [score, total]);
  return statsLabel?.map((stats: IScoreStats, idx: number) => {
    return (
       <Fragment key={idx}>
         <div className="w-full flex items-center text-sm">
            <span className="text-zinc-500 dark:text-zinc-400">{stats.text}</span> 
            <span className="font-medium ml-auto flex items-center [&>svg]:ml-1">
              {stats.value}
              {idx === 3 && <Fragment>
                <span>%</span>
                {percentage < 50 ? <ArrowDown size={16} className="text-red-500" /> : (percentage === 50 ? <Minus size={16} className="text-yellow-500" /> : <ArrowUp size={16} className="text-green-500" />)}
              </Fragment>}
             </span>
           </div> 
          {idx !== 3 && <Separator />}
        </Fragment>
      )
    }
  )
};

export default memo(ScoreHeader);