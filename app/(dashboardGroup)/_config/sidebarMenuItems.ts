import { ISidebarItem } from "@/lib/types"
import { FileText, LayoutDashboard } from "lucide-react"
import { TENANT_SIDEBAR_ITEMS } from "./tenantSidebarItems"
import { ADMIN_SIDEBAR_ITEMS } from "./adminSideBarItems"


const LANDLORD_SIDEBAR_ITEMS : ISidebarItem[] = [
    {
        label : "Dashboard",
        href : "/landlord-dashboard",
        icon : LayoutDashboard
    },
    {
        label : "My Posts",
        href : "/landlord-dashboard/my-posts",
        icon : FileText
    },
    {
        label : "Rental Request",
        href : "/landlord-dashboard/rental-request",
        icon : FileText
    },
]


export const sidebarMenuItems = {
    LANDLORD : LANDLORD_SIDEBAR_ITEMS,
    TENANT : TENANT_SIDEBAR_ITEMS,
    ADMIN : ADMIN_SIDEBAR_ITEMS
}