"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

import { NavbarProps } from "@/lib/types";
import { logout } from "@/service/logout";

// Navigation items configuration
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Properties", href: "/posts" },
];

// User menu items configuration
const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  // 💡 Extract the inner profile record safely based on your backend object nesting response
  const profileData = user?.data?.profile;

  const handleUserMenuAction = async (action: string) => {
    if (action === "dashboard") {
      // 🛡️ FIXED: Changed to safe optional chaining to prevent property parsing errors
      const userRole = profileData?.role;

      if (userRole === "LANDLORD") {
        router.push("/landlord-dashboard");
      } else if (userRole === "TENANT") {
        router.push("/tenant-dashboard");
      } else if (userRole === "ADMIN") {
        router.push("/admin-dashboard");
      }
      return;
    }
    if (action === "logout") {
        await logout();
        toast.success("User Logged Out Successfully!");
        router.push("/login");
    }
    if (action === "profile") {
        router.push("/profile");
        return;
    }
  };

  return (
    <nav className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-2xl font-bold text-primary">RENTNEST</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Dropdown */}
          {/* 🛡️ Verify the user success status and profileData structure completely */}
          {user?.success && profileData ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    {/* ✅ Corrected fields extraction mapping paths */}
                    <p className="text-sm font-medium">{profileData.name}</p>
                    <p className="text-xs text-muted-foreground">{profileData.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={() => handleUserMenuAction(item.action)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => {
                  await handleUserMenuAction("logout");
                }}>
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button className="cursor-pointer" variant="outline">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="cursor-pointer">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
