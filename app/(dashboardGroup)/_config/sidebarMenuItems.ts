import { ISidebarItem } from "@/lib/types"
import { FileText, LayoutDashboard } from "lucide-react"
import { AUTHOR_SIDEBAR_ITEMS } from "./tenantSidebarItems"
import { ADMIN_SIDEBAR_ITEMS } from "./adminSideBarItems"


const USER_SIDEBAR_ITEMS : ISidebarItem[] = [
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
]


export const sidebarMenuItems = {
    USER : USER_SIDEBAR_ITEMS,
    AUTHOR : AUTHOR_SIDEBAR_ITEMS,
    ADMIN : ADMIN_SIDEBAR_ITEMS
}