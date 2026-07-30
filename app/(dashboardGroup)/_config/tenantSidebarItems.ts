import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";

export const AUTHOR_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/tenant-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "My Posts",
        href: "/tenant-dashboard/my-posts",
        icon: FileText
    },
]