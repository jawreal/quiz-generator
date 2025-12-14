import { Button } from "@/components/ui/button"
import { ChevronDown, Check } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
} from "@/components/ui/dropdown-menu"
import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useCallback, memo } from 'react';
import type { QuizData } from '@/components/custom/CreateQuizDialog';

interface ICustomDropdown {
  title: string;
  options: string[];
  state: QuizData;
  setState: Dispatch<SetStateAction<QuizData>>;
}

const CustomDropdown = (props: ICustomDropdown) => {
  const { title, options, state, setState } = props;
  const checkedOption: string = useMemo(() => state[(title === "quizType" ? title : title?.toLowerCase()) as keyof QuizData], [state, title])
  
  const selectOption = useCallback((e: Event) => {
    e.preventDefault();
    const id = (e.currentTarget as HTMLElement).id;
    setState((prev: QuizData) => ({
     ...prev,
     [title]: id
    }))
    console.log(state)
  }, [setState, checkedOption, state]);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-inter capitalize">
        {checkedOption} 
        <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 font-inter" align="start">
        <DropdownMenuLabel className="capitalize" >{title === "quizType"? "Quiz Type" : title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {options?.map((option: string) => (<DropdownMenuItem onSelect={selectOption} id={option} key={option} className="capitalize">{option}
          {checkedOption?.toLowerCase() === option && <Check className="ml-auto"/>} </DropdownMenuItem>))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default memo(CustomDropdown);
