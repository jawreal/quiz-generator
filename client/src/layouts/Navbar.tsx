import QuizLogo from "@/components/custom/QuizLogo"
import { Button } from "@/components/ui/button";
import useDarkMode from "@/hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [ darkMode, setDarkMode ] = useDarkMode();
  
  const onSetTheme = () => setDarkMode(theme => !theme)
  
  return (
    <nav className="w-full flex items-center py-4 px-4 md:px-10 lg:px-20 xl:px-32 border-b border-zinc-300 dark:border-zinc-800 font-inter sticky top-0 z-10 bg-white dark:bg-zinc-950">
      <QuizLogo />
      <Button
        variant="outline"
        size="icon"
        className="ml-auto"
        onClick={onSetTheme}
      >
      {darkMode ? <Sun /> : <Moon />}
      </Button>
    </nav>
  )
};

export default Navbar;