import { Skeleton } from "@/components/ui/skeleton";

const SearchSkeleton = () => {
  return Array(3).fill(1).map((_, idx: number) => (
    <div key={idx} className="flex w-full  gap-x-2">
      <Skeleton className="w-8 h-8" />
      <Skeleton className="flex-1 h-8" />
    </div>
  ))
}

export default SearchSkeleton;