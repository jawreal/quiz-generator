import {
  Card, 
  CardTitle, 
  CardDescription, 
  CardHeader, 
} from "@/components/ui/card"

const HowItWorks = () => {
  return (
     <div
      id="benefits"
      className="w-full flex flex-col items-center justify-center font-inter py-20 px-4"> 
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 bg-clip-text text-transparent mb-3">
            How it works?
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto">
            Benefits on using this platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
          <Card className="">
            <CardHeader className="space-y-3">
              <img src="/generate.svg" className="h-20 w-20" />
              <CardTitle>
                Create account
              </CardTitle>
              <CardDescription>
                Create interactive quizzes from your own prompts to sharpen skills and reinforce knowledge through active learning.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
};

export default HowItWorks;