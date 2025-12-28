import * as React from "react"
import {
  AudioWaveform,
  Command,
  Search,
  Sparkles,
} from "lucide-react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarFooter, 
} from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Generate Quiz",
      url: "/quiz/create",
      icon: Sparkles,
    }, 
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: quizzes, isLoading } = useQuery({
    queryKey: ["quizzes"], 
    queryFn: async () => {
      const response = await fetch("/api/quiz/user/link", {
        credentials: "include", 
      });
      if(!response.ok){
        throw new Error("Couldn't retrieve the quiz titles")
      };
      const result = await response.json();
      return result
    }
  });
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {!isLoading && <NavFavorites quizzes={quizzes} />}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
