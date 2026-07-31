import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label : "Admin Dashboard",
        href : "/admin-dashboard",
        icon : LayoutDashboard
    },
    {
        label : "All Users",
        href : "/admin-dashboard/all-users",
        icon : FileText
    },
    {
    label : "All Properties",
    href : "/admin-dashboard/all-properties",
    icon : FileText
},
    {
        label : "All Rental Request",
        href : "/admin-dashboard/all-rental-request",
        icon : FileText
    },
    {
        label : "category",
        href : "/admin-dashboard/category",
        icon : FileText
    },
]