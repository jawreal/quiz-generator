import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose, 
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"
import { useMemo, Fragment, memo } from "react";
import { Button } from "@/components/ui/button";

export interface IProps {
  score: number;
  total: number;
  open?: boolean;
  onOpenChange?: () => void;
}

export interface IScoreStats {
  text: string;
  value: number;
  idx?: number;
}

const chartConfig = {
  score: {
    label: "Score",
  },
} satisfies ChartConfig


const ScoreStats = ({ text, value, idx }: IScoreStats) => (
   <Fragment>
     <div className="w-full flex items-center text-sm">
         <span className="text-zinc-500 dark:text-zinc-400">{text}</span> 
         <span className="font-medium ml-auto">{value}</span> 
      </div>
      {idx !== 2 && <Separator />}
    </Fragment>
);

const ScoreChart = (props: IProps) => {
  const { score, total, open, onOpenChange } = props;
  const percentage = useMemo(() => 
  Math.round((score / total) * 100), [score, total]);
  const totalWrongAns = useMemo(() => (total - score), [score, total]);
  
  const chartData = useMemo(() => [
  {
    score: percentage,
    fill: "#8b5cf6",
  },
  ], [percentage]);
  
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
  ], [score, total, totalWrongAns])
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center pb-0">
          <DialogTitle>Quiz Result</DialogTitle>
          <DialogDescription>You've successfully finished the quiz</DialogDescription>
        </DialogHeader>
        <div className="flex-1 py-1">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-video max-h-[200px]"
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={percentage * 3.6} // 360° * (percentage/100) = dynamic end angle
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="score" background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {percentage}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Accuracy
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </div>
        <div className="flex flex-col w-full gap-y-3">
          {statsLabel?.map((stats: IScoreStats, idx: number) =>
           <ScoreStats
            key={idx}
            text={stats.text}
            value={stats.value}
            idx={idx}
            />
          )}
        </div>
        <DialogFooter className="gap-x-3 sm:flex-col flex-row md:flex-row mt-1">
           <DialogClose asChild>
             <Button variant="outline" className="flex-1">Exit</Button>
            </DialogClose>
            <Button variant="violet" className="flex-1 transition-all active:scale-95" onClick={onOpenChange}>
              Ok, I understand
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ScoreChart);