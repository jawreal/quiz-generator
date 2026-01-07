import { Brain } from "lucide-react";

const QuizLogo = () => (
   <div className="flex gap-x-2 items-center">
      <img src="/logo.png" className="h-7 w-7" />
       <div className="flex flex-col items-start text-xs">
        <span className="font-bold text">NEURO</span>
         <span className="font-medium text-violet-500 flex gap-x-1 items-center">
            QUIZ
            <Brain size={12}/>
         </span>
      </div>
   </div>
);


export default QuizLogo;