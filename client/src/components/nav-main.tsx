import { type LucideIcon } from "lucide-react"
import { Link } from "react-router-dom";
import SearchDialog from "@/components/custom/SearchDialog";
import { useState } from "react";

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
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  
  const onOpenSearch = () => {
    setOpenSearch(open => !open)
  }
  return (
    <SidebarMenu>
      <SearchDialog open={openSearch} onOpenChange={onOpenSearch} />
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive} onClick={item.title?.toLowerCase() === "search" ? onOpenSearch : () => {}}>
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
