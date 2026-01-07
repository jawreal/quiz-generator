import { type LucideIcon } from "lucide-react"
import { Link } from "react-router-dom";
import SearchDialog from "@/components/custom/SearchDialog";
import { useState, useCallback } from "react";
import { useSidebar } from "@/components/ui/sidebar";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }[]
}) {
  const { isMobile, toggleSidebar } = useSidebar();
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  
  const onOpenSearch = () => {
    setOpenSearch(open => !open)
  };
  
  const onCloseSidebar = useCallback(() => {
    if(isMobile){
      setTimeout(() => {
        toggleSidebar();
      }, 100)
    }
  }, [isMobile, toggleSidebar])
  
  return (
    <SidebarMenu>
      <SearchDialog open={openSearch} onOpenChange={onOpenSearch} />
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive} onClick={item.title?.toLowerCase() === "search" ? onOpenSearch : onCloseSidebar}>
            <Link to={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
