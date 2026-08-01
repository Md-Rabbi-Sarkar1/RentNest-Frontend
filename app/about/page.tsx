import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, ShieldCheck, HeartHandshake, Eye } from "lucide-react";
import Image from "next/image";

const coreValues = [
  { title: "Transparency", desc: "No hidden application fees, arbitrary price markups, or secret leasing clauses.", icon: Eye, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40" },
  { title: "Ultimate Security", desc: "Every security deposit transaction is routed safely via verified gateway servers.", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40" },
  { title: "Tenant Welfare", desc: "We build features to level the playing field between property landlords and tenants.", icon: HeartHandshake, color: "text-pink-500 bg-pink-50 dark:bg-pink-950/40" },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20 space-y-16">
      
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Redefining the Rental Experience with <span className="text-primary">RentNest</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Founded in 2026, RentNest emerged from a simple observation: renting a home is unnecessarily stressful for tenants and complicated for landlords. We built a unified ecosystem that brings clarity, speed, and safety to both parties.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you are a tenant looking for a safe space to call home or a landlord managing multiple premium properties, our platform streamlines everything from discovery to monthly automated payments.
          </p>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden border bg-muted shadow-md">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent z-10" />
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Building2 className="h-20 w-20 text-muted/60" />
          </div>
        </div>
      </div>

     
      <div className="space-y-8 border-t pt-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Our Core Mission Values</h2>
          <p className="text-muted-foreground">The operational philosophies that guide how we engineer our real estate platforms daily.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((value, idx) => {
            const Icon = value.icon;
            return (
              <Card key={idx} className="border-muted/60 shadow-sm">
                <CardContent className="pt-6 space-y-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center border shrink-0 ${value.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
}
