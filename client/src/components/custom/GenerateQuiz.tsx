import { Button } from '@/components/ui/button';
import CreateQuizDialog from '@/components/custom/CreateQuizDialog'
import { useState } from 'react';

const GenerateQuiz = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  
  const onOpenDialog = () => {
    setOpenDialog(state => !state);
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-5 text-center">
    <div className="flex flex-col justify-center items-center w-full md:max-w-80 gap-y-4 relative">
      <img
        src="/questionMark.svg"
        alt="quiz_img"
        className="w-40 h-40 border rounded-md bg-indigo-100 dark:bg-indigo-950/80 border-gray-300 dark:border-gray-700"
              />
      <span className="text-slate-500 dark:text-slate-400 px-3">
        Choose your difficulty, select a quiz type, and generate instantly
      </span>
      <div>
        <CreateQuizDialog open={openDialog} onOpenChange={onOpenDialog} />
        <Button onClick={onOpenDialog} variant="violet">Generate Quiz</Button> 
      </div>
    </div>
    </div>
   )
};

export default GenerateQuiz;