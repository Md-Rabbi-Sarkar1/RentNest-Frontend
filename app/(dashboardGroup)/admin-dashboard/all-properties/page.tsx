import React from "react";
import { getAllPropertiesAction } from "../_actions/adminActions";

import { Building2 } from "lucide-react";
import AllPropertiesClient from "../_components/AllPropertiesClient";
export const dynamic = "force-dynamic";
export default async function AdminAllPropertiesPage() {
    const res = await getAllPropertiesAction();

    return (
        <div className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto w-full">
           
            <div className="flex items-center gap-3 border-b pb-5">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 rounded-xl">
                    <Building2 className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Global Marketplace Listings</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">
                        Monitor active real estate listings, audit catalog entries, and track property category distribution.
                    </p>
                </div>
            </div>

            
            <AllPropertiesClient properties={res?.data || []} />
        </div>
    );
}
