"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Home, ArrowRight, Building2, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function HeroBanner() {
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchLocation.trim()) return;
    
    window.location.href = `/posts?search=${encodeURIComponent(searchLocation)}`;
  };

  return (
    <div className="relative w-full overflow-hidden bg-background pt-8 pb-16 md:pt-16 md:pb-24 transition-colors duration-200">
      
      
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(99,102,241,0.12),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(99,102,241,0.08),transparent)]" />
      
     
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 md:space-y-12">
        
      
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 animate-fade-in">
            <Home className="h-3.5 w-3.5" /> Next-Gen Property Management
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Find Your Next Home Easily with <span className="text-primary bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">RentNest</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed">
            Secure rental applications, verified property listings, transparent monthly automated lease processing platforms, and landlord matchmaking tools.
          </p>
        </div>

        
        <div className="max-w-2xl mx-auto">
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-xl bg-card border shadow-md focus-within:ring-2 focus-within:ring-primary/20 transition-all"
          >
            <div className="relative w-full flex-1 flex items-center">
              <MapPin className="absolute left-3 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Enter city, address or neighborhood zip..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-10 pr-4 h-11 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto h-11 px-6 font-medium gap-2 cursor-pointer shadow-sm">
              <Search className="h-4 w-4" /> Discover Listings
            </Button>
          </form>
        </div>

        
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Link href="/posts">
            <Button size="lg" className="font-semibold gap-2 py-6 px-6 cursor-pointer">
              Explore Properties <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="font-semibold py-6 px-6 cursor-pointer">
              How it Works
            </Button>
          </Link>
        </div>

       
        <div className="border-t border-muted pt-8 md:pt-12 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900">
              <Building2 className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">2,500+</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Verified Homes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900">
              <Users className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">18,000+</p>
              <p className="Active Tenants text-xs font-medium text-muted-foreground uppercase tracking-wider">Happy Renters</p>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-2 md:col-span-1 mx-auto md:mx-0">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">100% Secure</p>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">SSL Verified Pay</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
