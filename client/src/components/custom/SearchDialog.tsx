import {
  Dialog,
  DialogContent,
  DialogHeader,   
  DialogTitle,   
  DialogDescription,
} from "@/components/ui/dialog"
import { Search } from "lucide-react"
import { useCallback, useState, type ChangeEvent } from "react";
import CustomInput from '@/components/custom/CustomInput'
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom"
import useDebounce from "@/hooks/useDebounce"
import { useQuery } from "@tanstack/react-query"

interface IProps {
  open: boolean;
  onOpenChange: () => void;
}

interface IQuizzes {
  _id: string;
  title: string;
  icon: string;
}

const SearchDialog = (props: IProps) => {
  const { open, onOpenChange } = props;
  const [search, setSearch] = useState<string>("")
  const debouncedValue = useDebounce(search?.toLowerCase())
  const { data: quizzes, isLoading } = useQuery<IQuizzes[]>({
    queryKey: ["search-quiz", debouncedValue],
    queryFn: async () => {
      const response = await fetch(`/api/quiz/user/search?searchValue=${debouncedValue}`)
      if(!response.ok){
        throw new Error("Failed to query")
      }
      const result = await response.json();
      console.log(result) 
      return result
    }, 
    enabled: debouncedValue.trim().length > 0
  });
  
  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])
  
  return (
  <Dialog
    open={open} 
    onOpenChange={onOpenChange}
  >
    <DialogContent className="flex flex-col items-center h-[100dvh] gap-y-3 md:h-auto md:h-96">
      <DialogHeader className="text-left w-full">
        <DialogTitle>Search Quizzes</DialogTitle>
        <DialogDescription>
          Find a quiz by name or keyword.
       </DialogDescription>
      </DialogHeader>
      <CustomInput
        icon={Search}
        placeholder="Search"
        value={search}
        onChange={onSearch}
        className="rounded-lg" />
      <div className="flex w-full flex-col gap-y-2 divide-y divide-zinc-300 dark:divide-zinc-800 overflow-y-auto flex-1">
        {quizzes?.map((quiz: IQuizzes, idx: number) => (
         <Link key={idx} to={`/quiz/take/${quiz?._id?.toString() ?? "#"}`} className="flex gap-x-2 py-3">
            <span>{quiz?.icon ?? "💔"}</span>
            <span className="font-medium truncate" >{quiz?.title ?? "Title not found"}</span>
            <ArrowUpRight 
             size={20} 
             className="ml-auto"
             />
         </Link>
        ))}
      </div>
    </DialogContent>
  </Dialog>
  )
}


export default SearchDialog;