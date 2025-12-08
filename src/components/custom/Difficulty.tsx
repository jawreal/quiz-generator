import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Difficulty = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-slate-500 daek:text-slate-400 font-inter">
        Difficulty
        <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 font-inter" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>Beginner</DropdownMenuItem>
          <DropdownMenuItem>Intermediate</DropdownMenuItem>
          <DropdownMenuItem>Advanced</DropdownMenuItem>
          <DropdownMenuItem>Expert</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Difficulty;
