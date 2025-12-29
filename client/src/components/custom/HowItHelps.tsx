import {
  Card, 
  CardTitle, 
  CardDescription, 
  CardHeader, 
} from "@/components/ui/card";

interface IBenefits {
  text: string;
  src: string;
}

const benefits: IBenefits[] = [
  {
    text: "Create interactive quizzes from your own prompts to sharpen skills and reinforce knowledge through active learning.", 
    src: "/interactive.svg", 
  },
  {
    text: "Generate quizzes based on your prompts and improve skills with an interactive, hands-on quiz experience.", 
    src: "/generate.svg", 
  },
  {
    text: "Transform your ideas into interactive quizzes that help you learn faster and build real understanding.", 
    src: "/ideas.svg", 
  },
]

const HowItHelps = () => {
  return (
     <div
      id="benefits"
      className="w-full flex flex-col items-center justify-center font-inter py-10 px-4 gap-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-x-2 max-w-2xl w-full p-5 bg-violet-500 dark:bg-violet-600/60 rounded-md">
          {benefits?.map((benefit: IBenefits, idx: number) => 
          <Card
            key={idx} 
            className="text-center bg-transparent border-0 shadow-none">
            <CardHeader className="gap-y-12 items-center md:flex-col-reverse">
              <CardTitle className="font-normal text-zinc-200">
              {benefit.text}
              </CardTitle>
              <CardDescription className="bg-violet-100 p-2 rounded-sm">
               <img src={benefit.src} className="h-24 w-24" />
              </CardDescription>
            </CardHeader>
          </Card>)}
      </div>
    </div>
  )
};

export default HowItHelps;