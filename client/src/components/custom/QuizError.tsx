const QuizError = () => (
    <div className="flex flex-col min-h-screen justify-center items-center w-full md:max-w-80 gap-y-1 relative text-center">
      <img src="/error.svg" className="aspect-video mt-7 md:mt-0" />
      <span className="text-slate-200 text-xl mt-1 font-medium px-3">
       Something went wrong. 
      </span>
      <span className="text-slate-500 px-3">
        Error processing request. Check network connection and try again. 
      </span>
   </div>
);

export default QuizError;