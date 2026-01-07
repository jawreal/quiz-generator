import QuizLogo from "@/components/custom/QuizLogo"

const Navbar = () => {
  return (
    <nav className="w-full flex items-center py-4 px-4 md:px-10 lg:px-20 xl:px-32 border-b border-zinc-300 dark:border-zinc-800 font-inter sticky top-0 backdrop-blur-sm z-10">
      <QuizLogo />
    </nav>
  )
};

export default Navbar;