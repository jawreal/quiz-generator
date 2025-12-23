import { Skeleton } from "@/components/ui/skeleton";

const QuizPageSkeleton = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center p-5">
      <div className="flex flex-col w-full md:max-w-3xl space-y-4">
        <Skeleton className="h-64 rounded-lg w-full" />
        <Skeleton className="h-96 rounded-lg w-full" />
        <Skeleton className="h-16 rounded-lg w-full" />
      </div>
    </div>
  );
};

export default QuizPageSkeleton;