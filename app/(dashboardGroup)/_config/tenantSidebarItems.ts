import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/tenant-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "Rental Request",
        href: "/tenant-dashboard/rental-request",
        icon: FileText
    },
]