const QuizError = () => (
    <div className="flex flex-col min-h-screen justify-center items-center w-full gap-y-1 relative text-center">
      <div className="md:max-w-80">
        <img
           src="/error.svg"
           alt="QR Placeholder"
           className="w-40 h-40 border rounded-md bg-indigo-100 dark:bg-indigo-950/80 border-gray-300 dark:border-gray-700"
              />
      </div>
      <span className="dark:text-slate-200 md:text-xl mt-3 font-medium px-3">
       Something went wrong
      </span>
      <span className="text-slate-500 px-3 text-sm md:text-base">
        Error processing request. Check network connection and try again. 
      </span>
   </div>
);

export default QuizError;