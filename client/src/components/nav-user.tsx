import { Sun, Moon, ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import LogoutDialog from "@/components/custom/LogoutDialog";
import useDarkMode from "@/hooks/useDarkMode";
import { useAuth } from "@/hooks/useAuthProvider";
import { useMemo, useState, useCallback } from "react";

export const NavUser = () => {
  const { fullName, username } = useAuth();
  const { isMobile } = useSidebar();
  const [darkMode, setDarkMode] = useDarkMode();
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  const onDarkmode = () => {
    setDarkMode((prevTheme) => !prevTheme);
  }
  
  const avatar = useMemo(() => `https://api.dicebear.com/9.x/glass/svg?seed=${fullName ?? "default"}`, [fullName]);
  
  const onLogOut = useCallback(() => {
    setOpenLogout(open => !open)
  }, []);

  return (
    <SidebarMenu>
      <LogoutDialog
       open={openLogout} 
       onOpenChange={onLogOut}
      />
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={avatar} alt={fullName} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{fullName ?? "No name found"}</span>
                <span className="text-xs text-zinc-700 dark:text-zinc-400 flex items-center gap-x-2">
                  {`@${username ?? "No username found"}`}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg font-inter"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={avatar} alt={fullName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{fullName ?? "No name found"}</span>
                  <span className="text-xs text-zinc-700 dark:text-zinc-400 flex items-center gap-x-2">
                  {`@${username ?? "No username found"}`}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                {darkMode ? <Moon /> : <Sun />}
                Dark Mode
                <Switch
                  checked={darkMode}
                  onCheckedChange={onDarkmode}
                  className="ml-auto"
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              onClick={onLogOut}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};