import Navbar from "@/layouts/Navbar";
import { Button } from "@/components/ui/button"
import HowItHelps from "@/components/custom/HowItHelps"
import HowItWorks from "@/components/custom/HowItWorks"
import Footer from "@/components/custom/Footer"
import { motion } from "framer-motion";
import AuthDialog from "@/components/custom/AuthDialog";
import SignUpForm from "@/pages/SignUpForm";
import { useState } from "react";


const LandingPage = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  
  const onOpenForm = () => {
    setOpenForm(open => !open)
  }
  
  return (
    <div className="min-h-screen flex flex-col font-inter w-full items-center">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="my-16 flex flex-col w-full md:w-1/2 lg:max-w-[45rem] gap-y-2 md:gap-y-2 px-8 md:px-10 lg:px-20 xl:px-32 items-center text-center">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
            Where quizzes meet
           <span className="bg-gradient-to-r from-violet-400 via-violet-500 to-violet-700 bg-clip-text text-transparent ml-2">
              intelligence
           </span>
        </h1>
        <p className="text-zinc-500 text-base lg:text-lg max-w-2xl">An AI-powered platform for creating interactive and adaptive quizzes that support effective assessment and personalized learning.
        </p>
        <Button
          variant="violet"
          onClick={onOpenForm}
          className="mt-4 h-10 hover:scale-105 transition-all duration-150 active:scale-95" >
           Get Started
        </Button>
      </motion.div>
      <AuthDialog open={openForm} onOpenChange={onOpenForm}>
        <SignUpForm />
      </AuthDialog>
      <HowItHelps />
      <HowItWorks />
      <Footer />
    </div>
    )
};

export default LandingPage;