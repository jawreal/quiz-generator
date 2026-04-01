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
import useDebounce from "@/hooks/useDebounce"
import { useQuery } from "@tanstack/react-query"
import SearchSkeleton from "@/components/custom/SearchSkeleton";
import { Link } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar"


interface IProps {
  open: boolean;
  onOpenChange: () => void;
}

interface IQuizInfo {
  _id: string;
  title: string;
  icon: string;
}

interface IQuizzes {
  quizzes: IQuizInfo[];
  hasNoResult: boolean;
}

const SearchDialog = (props: IProps) => {
  const { open, onOpenChange } = props;
  const [search, setSearch] = useState<string>("")
  const { isMobile, toggleSidebar } = useSidebar();
  const debouncedValue = useDebounce(search?.toLowerCase())
  const { data, isLoading } = useQuery<IQuizzes>({
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
  
  const onOffDialog = useCallback(() => {
    setTimeout(() => {
      if(isMobile) { 
        return toggleSidebar();
      }
      onOpenChange();
    }, 200); // I use the setTimeout to fix the bug when toggling the dialog as well as the sidebar
  }, [toggleSidebar])
  
  return (
  <Dialog
    open={open} 
    onOpenChange={onOpenChange}
  >
    <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-lg self-start flex flex-col items-center h-[28rem] max-h-[40rem] gap-y-3 md:h-auto md:h-96">
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
      {isLoading ? <SearchSkeleton /> :
      !data?.hasNoResult ? <div className="w-full flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
         {debouncedValue?.trim().length > 0 ? `No result for ${debouncedValue}` : "Looking for something?"}
      </div> : <div className="flex w-full flex-col gap-y-2 divide-y divide-gray-300 dark:divide-gray-800 overflow-y-auto flex-1">
        {data?.quizzes?.map((quiz: IQuizInfo, idx: number) => (
         <Link 
           key={idx} 
           to={`/quiz/take/${quiz?._id?.toString() ?? "#"}`}
           className="flex gap-x-2 py-3 items-center"
           onClick={onOffDialog}
         >
            <span>{quiz?.icon ?? "💔"}</span>
            <span className="font-medium truncate text-sm" >{quiz?.title ?? "Title not found"}</span>
            <ArrowUpRight 
             size={20} 
             className="ml-auto text-gray-400 dark:text-gray-500"
             />
         </Link>
        ))}
      </div>}
    </DialogContent>
  </Dialog>
  )
}


export default SearchDialog;