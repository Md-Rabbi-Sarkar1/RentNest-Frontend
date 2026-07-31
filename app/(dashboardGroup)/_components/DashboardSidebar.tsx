"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";

export default function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();

  let navItems: ISidebarItem[] = [];

  // 💡 FIXED: Read the role safely using optional chaining to prevent any properties crash
  const userRole = user?.data?.profile?.role || "";

  if (userRole === "LANDLORD") {
    navItems = sidebarMenuItems.LANDLORD;
  } else if (userRole === "TENANT") {
    navItems = sidebarMenuItems.TENANT;
  } else if (userRole === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  } else {
    navItems = []; // Safe fallback empty array if data is loading
  }

  return (
    <Sidebar
      collapsible="none"
      className="h-[calc(100svh-0rem)] border-r border-sidebar-border"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
