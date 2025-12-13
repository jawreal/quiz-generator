import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react'
import CustomDropdown from '@/components/custom/CustomDropdown'
import { useState } from 'react';

export interface QuizData {
  difficulty: string;
  quizType: string;
}

const difficultyOptions: string[] = ["beginner", "intermediate", "advanced", "expert"]
const quizTypeOptions: string[] = ["multiple choice", "identification", "mixed"]

const GenerateQuiz = () => {
  const [quizData, setQuizData] = useState<QuizData>({
    difficulty: "beginner", 
    quizType: "multiple choice", 
  });
  
  return (
    <div className="w-full min-h-screen flex flex-col md:items-center md:justify-center p-5 text-center">
    <div className="flex flex-1 md:flex-none flex-col w-full md:max-w-80 gap-y-3 relative">
      <span className="text-3xl font-extrabold font-inter">
       Generate Interactive Quizzes with the Power of AI
      </span>
      <span className="text-slate-500">
        Choose your difficulty, select a quiz type, and generate instantly
      </span>
      <div className="w-full flex-1 absolute md:relative bottom-16  md:mt-48 flex flex-col gap-y-2">
        <div className="flex gap-x-2">
          <CustomDropdown title="difficulty" options={difficultyOptions} state={quizData} setState={setQuizData} /> 
          <CustomDropdown title="quizType" options={quizTypeOptions} state={quizData} setState={setQuizData} /> 
        </div>
        <div className="w-full relative">
        <Input placeholder="Create your own quiz" className="py-6 rounded-lg"/>  
        <Button className="absolute right-2 bottom-2 p-3">
        <ArrowUp />
        </Button>
      </div> 
      </div>
    </div>
    </div>
   )
};

export default GenerateQuiz;