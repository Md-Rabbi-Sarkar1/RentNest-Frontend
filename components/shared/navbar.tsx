"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// 👈 FIX 1: Added Menu icon for the hamburger button
import { LayoutDashboard, LogOut, Settings, User, Sun, Moon, Menu } from "lucide-react"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useTheme } from "next-themes"; 
import { useEffect, useState } from "react"; 

// 👈 FIX 2: Import Sheet components for the mobile overlay drawer
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { NavbarProps } from "@/lib/types";
import { logout } from "@/service/logout";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Properties", href: "/posts" },
];

const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  
  const { resolvedTheme, setTheme } = useTheme(); 
  const [mounted, setMounted] = useState(false); 
  // 👈 FIX 3: Local state management to close the mobile menu on item clicks
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const profileData = user?.data?.profile;

  const handleUserMenuAction = async (action: string) => {
    if (action === "dashboard") {
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
    <nav className="border-b border-border bg-background transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Mobile Burger Menu + Logo */}
          <div className="flex items-center gap-2">
            {/* 👈 FIX 4: Responsive Mobile Sheet Side Drawer View */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[260px] sm:w-[300px]">
                  <SheetHeader className="text-left border-b pb-4 mb-4">
                    <SheetTitle className="text-xl font-bold text-primary tracking-tight">RENTNEST</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-foreground hover:text-primary transition-colors text-base font-medium py-2 border-b border-muted/40"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <span className="text-2xl font-bold text-primary">RENTNEST</span>
            </Link>
          </div>

          {/* Nav Links (Desktop Only Layout Grid Framework) */}
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

          {/* Actions Menu Rack */}
          <div className="flex items-center gap-4">
            
            {/* Shadcn UI Dark/Light Toggler Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="h-9 w-9 rounded-md cursor-pointer text-muted-foreground hover:text-foreground relative select-none"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-400 transition-all scale-100 rotate-0" />
              ) : mounted && resolvedTheme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500 transition-all scale-100 rotate-0" />
              ) : (
                <div className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User Dropdown */}
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
                  <Button className="cursor-pointer" variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="cursor-pointer" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
