import { Sun, Moon, ChevronsUpDown, User, LogOut } from "lucide-react";

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
import LogoutModal from "./custom/LogoutModal";
import { Switch } from "@/components/ui/switch";
import useDarkMode from "@/hooks/useDarkMode";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useAuth } from "@/hooks/useAuthProvider";

export const NavUser = ({
  user,
}: {
  user: {
    username: string;
    fullName: string;
    avatar: string;
  };
}) => {
  const navigate = useNavigate();
  const { user: user_info } = useAuth();
  const { isMobile } = useSidebar();
  const [darkMode, setDarkMode] = useDarkMode();
  const [isOpen, setOpen] = useState<boolean>(false);

  const onDarkmode = () => {
    setDarkMode((prevTheme) => !prevTheme);
  };

  const onNavigate = () => {
    navigate(
      `/${
        user_info?.role?.toLowerCase() === "administrator"
          ? "admin"
          : user_info?.role
      }/profile`
    );
  };

  const onOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.fullName}</span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-x-2">
                  {user_info?.role?.toLowerCase() ?? ""}
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
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-x-2">
                    {user_info?.role?.toLowerCase() ?? ""}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={onNavigate}>
                <User />
                Profile
              </DropdownMenuItem>
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
            <DropdownMenuSeparator />
            <LogoutModal open={isOpen} onOpenChange={onOpenChange} />
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              onClick={() => onOpenChange(true)}
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