import * as React from "react"
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
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
      url: "#",
      icon: Sparkles,
    }, 
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  quizzes: [
    {
      title: "Project Management & Task Tracking",
      _id: "1", 
      icon: "📊",
    },
    {
      title: "Family Recipe Collection & Meal Planning",
      _id: "2",
      icon: "🍳",
    },
    {
      title: "Fitness Tracker & Workout Routines",
      _id: "3",
      icon: "💪",
    },
    {
      title: "Book Notes & Reading List",
      _id: "4",
      icon: "📚",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: quizzes } = useQuery({
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
        <NavFavorites quizzes={quizzes} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
