import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
//import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"
import { useMemo, Fragment } from "react";

interface IProps {
  score: number;
  total: number;
}

interface IScoreStats {
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
  const { score, total } = props;
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
  ], [score, total])
  
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Congratulations!</CardTitle>
        <CardDescription>You successfully passed the quiz! </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
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
      </CardContent>
      <CardFooter className="flex-col gap-y-3">
          {statsLabel?.map((stats: IScoreStats, idx: number) =>
           <ScoreStats
            key={idx}
            text={stats.text}
            value={stats.value}
            idx={idx}
            />
          )}
      </CardFooter>
    </Card>
  )
}

export default ScoreChart;