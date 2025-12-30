import {
  Card, 
  CardTitle, 
  CardDescription, 
  CardHeader, 
} from "@/components/ui/card"
import type { ISystemInfo } from "@/components/custom/HowItHelps";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ISteps extends ISystemInfo {
  description: string;
}

const steps: ISteps[] = [
  {
    text: "Create an account to get started",
    description:
      "Provide the required information to create your account and securely access all quiz generation features.",
    src: "/login.svg",
  },
  {
    text: "Enter your prompt and generate a personalized quiz",
    description:
      "Describe the topic or skill you want to practice, and the system will generate an interactive quiz based on your input.",
    src: "/create.svg",
  },
  {
    text: "Take the quiz and review your results instantly",
    description:
      "Answer the questions, receive immediate feedback, and review your results to track progress and improve your skills.",
    src: "/take.svg",
  },
];



const HowItWorks = () => {
  const { ref: workRef, inView: workInview } = useInView({
    triggerOnce: true, 
    threshold: 0.1,
  }) 
  return (
     <div
      id="itworks"
      className="w-full flex flex-col items-center justify-center font-inter py-20 px-4"> 
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 bg-clip-text text-transparent mb-3">
            How it works?
          </h2>
          <p 
           className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto">
          Everything you need to generate interactive quizzes from your prompts and improve learning through smart, engaging questions.
          </p>
        </div>
        <motion.div
          ref={workRef}  
          initial={{ opacity: 0, y: 20 }}
          animate={workInview ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full px-4">
          {steps?.map((step: ISteps, idx: number) => <Card key={idx}>
            <CardHeader className="space-y-3">
              <img src={step.src} className="h-20 w-20" />
              <CardTitle>
                {step.text}
              </CardTitle>
              <CardDescription>
                {step.description}
              </CardDescription>
            </CardHeader>
          </Card>)}
        </motion.div>
      </div>
    </div>
  )
};

export default HowItWorks;