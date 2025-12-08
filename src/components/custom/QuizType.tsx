import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const QuizType = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-slate-500 daek:text-slate-400 font-inter">
        Quiz Type
        <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 font-inter" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>Multiple Choice</DropdownMenuItem>
          <DropdownMenuItem>Identification</DropdownMenuItem>
          <DropdownMenuItem>Enumeration</DropdownMenuItem>
          <DropdownMenuItem>Mixed</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default QuizType;