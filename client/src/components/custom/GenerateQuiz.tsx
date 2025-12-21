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
    <div className="flex flex-col w-full md:max-w-80 gap-y-3 relative">
      <img src="/generate.svg" className="aspect-video mt-7 md:mt-0" />
      <span className="text-slate-500 px-3">
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