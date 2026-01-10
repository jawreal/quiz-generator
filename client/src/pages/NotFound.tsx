import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center font-inter">
       <span className="font-extrabold text-4xl">404</span>
       <span className="font-medium text-zinc-400 dark:text-zinc-500 mt-1">The requested page doesn't exist</span>
       <div className="mt-3">
         <Link to="/auth" className=" underline">Go Home</Link>
       </div>
    </div>
 )
};

export default NotFound;