import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Search, FileText, Landmark, Key, BarChart3 } from "lucide-react";
export const dynamic = "force-dynamic";
const tenantServices = [
  { title: "Verified Smart Search", desc: "Browse real properties verified through our multi-step physical and ownership check protocols.", icon: Search },
  { title: "Seamless Digital Forms", desc: "Submit application requests and legal digital documents directly through Next.js secure workflows.", icon: FileText },
  { title: "SSL Escrow Gateway", desc: "Rent installments and safety deposits stay securely routed to protect against localized landlord scams.", icon: Landmark },
];

const landlordServices = [
  { title: "Automated Lease Handling", desc: "Send standard template binding legal documents directly to approved applicants instantly.", icon: Key },
  { title: "Financial Dashboard Analytics", desc: "Track premium property occupancy data matrixes, net overhead monthly profits, and late payments.", icon: BarChart3 },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20 space-y-16">
      
     
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="outline" className="px-3 py-1 text-primary bg-primary/5">Platform Features</Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">All-In-One Property Utilities</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          RentNest splits its automation tools down the middle to offer dedicated features tailored perfectly for both tenants and real estate investors.
        </p>
      </div>

     
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-indigo-500 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" /> Built for Renters & Tenants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tenantServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <Card key={idx} className="hover:border-indigo-500/20 hover:shadow-md transition-all">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mb-2 border border-indigo-100 dark:border-indigo-900">
                    <Icon className="h-5 w-5 text-indigo-500" />
                  </div>
                  <CardTitle className="text-lg">{srv.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{srv.desc}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

     
      <div className="space-y-6 border-t pt-12">
        <h2 className="text-2xl font-bold tracking-tight text-amber-500 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" /> Built for Landlords & Managers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {landlordServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <Card key={idx} className="hover:border-amber-500/20 hover:shadow-md transition-all">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center mb-2 border border-amber-100 dark:border-amber-900">
                    <Icon className="h-5 w-5 text-amber-500" />
                  </div>
                  <CardTitle className="text-lg">{srv.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{srv.desc}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
}
