import {
  Dialog,
  DialogContent,
  DialogHeader,   
  DialogTitle,   
  DialogDescription,
} from "@/components/ui/dialog"
import CustomInput from "@/components/custom/CustomInput"
import { Search } from "lucide-react"
import {
  difficultyOptions,
  quizTypeOptions,  
  type QuizData, 
} from "@/components/custom/CreateQuizDialog";
import { useState } from "react";
import CustomDropdown from '@/components/custom/CustomDropdown'
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom"

interface IProps {
  open: boolean;
  onOpenChange: () => void;
}

interface IQuizzes {
  _id: string;
  title: string;
  icon: string;
}

const quizzes: IQuizzes[] = [
  {
    _id: "1", 
    title: "Basic Math Quiz", 
    icon: "🚀", 
  },
  {
    _id: "2", 
    title: "Basic English Quiz", 
    icon: "✨", 
  },
  {
    _id: "3", 
    title: "Basic Science Quiz", 
    icon: "🌙", 
  },
]

const SearchDialog = (props: IProps) => {
  const { open, onOpenChange } = props;
  const [quizData, setQuizData] = useState<QuizData>({
    difficulty: "beginner", 
    quizType: "multiple choice", 
  });
  
  return (
  <Dialog
    open={open} 
    onOpenChange={onOpenChange}
  >
    <DialogContent className="flex flex-col items-center h-[100dvh] gap-y-3 md:h-auto md:h-96">
      <DialogHeader className="text-left w-full">
        <DialogTitle>Search Quizzes</DialogTitle>
        <DialogDescription>
          Find a quiz by name or keyword.
       </DialogDescription>
      </DialogHeader>
      <CustomInput
        icon={Search}
        placeholder="Search"
        className="rounded-lg" />
      <div className="flex w-full gap-x-2">
         <CustomDropdown title="difficulty" options={difficultyOptions} state={quizData} setState={setQuizData} /> 
         <CustomDropdown title="quizType" options={quizTypeOptions} state={quizData} setState={setQuizData} /> 
      </div>
      <div className="flex w-full flex-col gap-y-2 divide-y divide-zinc-300 dark:divide-zinc-800 overflow-y-auto flex-1">
        {quizzes?.map((quiz: IQuizzes, idx: number) => (
         <Link key={idx} to={`/quiz/take/${quiz?._id?.toString() ?? "#"}`} className="flex gap-x-2 py-3">
            <span>{quiz?.icon ?? "💔"}</span>
            <span className="font-medium truncate" >{quiz?.title ?? "Title not found"}</span>
            <ArrowUpRight 
             size={20} 
             className="ml-auto"
             />
         </Link>
        ))}
      </div>
    </DialogContent>
  </Dialog>
  )
}


export default SearchDialog;