import {
  ArrowUpRight,
  ArrowUp,
  MoreHorizontal,
  Trash2,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom";
import { useCallback } from "react"
import DeleteQuizDialog from "@/components/custom/DeleteQuizDialog";
import { useState } from "react";

interface IQuiz {
  title: string
  _id: string
  icon: string
}

interface IQuizDelete {
  quiz_id: string;
  quizName: string;
}

export function NavQuizzes({
  quizzes,
}: {
  quizzes: IQuiz[]
}) {
  const { isMobile, toggleSidebar } = useSidebar()
  const location = useLocation();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [quizInfo, setQuizInfo] = useState<IQuizDelete>({
    quiz_id: "",
    quizName: "",
  })
  
  const offSidebar = () => {
    if(isMobile) {
      setTimeout(() => {
        toggleSidebar();
      }, 50)
    } 
  }
  
  const onOpenNewTab = useCallback((e: Event) => {
    e.preventDefault();
    const id = (e.currentTarget as HTMLElement).id;
    const url = `${window.location.origin}/quiz/take/${id}`
     window.open(url, "_blank", "noopener,noreferrer")
  }, []);
  
  const onCopyLink = useCallback(async () => {
    try{
      await navigator.clipboard.writeText(window.location.href)
    }catch(err){
      console.error(err)
    }
  }, []);
  
  const onOpenDelete = useCallback((e: Event, quiz_id?: string, quizName?: string) => {
    e.preventDefault()
    if(quizName && quiz_id){
      setQuizInfo({
        quiz_id, 
        quizName,
      })
    }
    setOpenDelete(true)
  }, [])
  
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Quizzes</SidebarGroupLabel>
     <DeleteQuizDialog
       open={openDelete}
       onOpenChange={setOpenDelete}
       {...quizInfo}
     /> 
      <SidebarMenu>
        {quizzes?.map((item: IQuiz, idx: number) => (
          <SidebarMenuItem key={idx}>
            <SidebarMenuButton asChild data-active={location.pathname?.includes(item?._id?.toString()) ?? false} className="data-[active=true]:bg-gray-200/60 dark:data-[active=true]:bg-gray-900" >
              <Link
                to={`/quiz/take/${item?._id?.toString() ?? "#"}`} 
                title={item?.title}
                onClick={offSidebar}
              >
                <span>{item?.icon ?? "No icon found"}</span>
                <span>{item?.title ?? "No title found"}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem onSelect={onCopyLink}>
                  <ArrowUp className="text-muted-foreground" />
                  <span>Copy Link</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  id={item?._id?.toString() ?? "#"}
                  onSelect={onOpenNewTab}>
                  <ArrowUpRight className="text-muted-foreground" />
                  <span>Open in New Tab</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                   onSelect={(e) => onOpenDelete(e, item?._id, item?.title)}
                   >
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
