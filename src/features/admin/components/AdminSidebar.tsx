import { Package, ShoppingCart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/shared/components/ui/sidebar/sidebar";

import {
  useSidebar,
} from "@/shared/components/ui/sidebar/sidebar-context";

const menuItems = [
  { title: "Pedidos", icon: ShoppingCart, key: "pedidos" },
  { title: "Produtos", icon: Package, key: "produtos" },
] as const;

export type AdminSection = (typeof menuItems)[number]["key"];

interface AdminSidebarProps {
  active: AdminSection;
  onNavigate: (section: AdminSection) => void;
}

const AdminSidebar = ({ active, onNavigate }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border h-16 justify-start">
        {!collapsed ? (
          <span className="font-display text-lg font-bold tracking-wider text-primary pt-2 pl-2">
            ADMIN
          </span>
        ) : (
          <span className="font-display text-lg font-bold text-primary">A</span>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3 pt-4 pr-6">
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    isActive={active === item.key}
                    onClick={() => onNavigate(item.key)}
                    tooltip={item.title}
                    size="default"
                    className="h-9 text-sm pr-30"
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border px-3 py-3 pr-4">
        <SidebarMenuButton
          onClick={() => navigate("/")}
          tooltip="Sair"
          size="default"
          className="h-9 text-sm text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sair</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
