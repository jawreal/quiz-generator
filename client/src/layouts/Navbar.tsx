import { Brain } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="w-full flex items-center py-4 px-4 md:px-10 lg:px-20 xl:px-32 border-b border-zinc-300 dark:border-zinc-800 font-inter sticky top-0 backdrop-blur-sm">
      <div className="flex gap-x-2 items-center">
        <img src="/logo.png" className="h-8 w-8" />
        <div className="flex flex-col items-start text-xs">
          <span className="font-bold text">NEURO</span>
          <span className="font-medium text-violet-500 flex gap-x-1 items-center">
            QUIZ
            <Brain size={12}/>
          </span>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;