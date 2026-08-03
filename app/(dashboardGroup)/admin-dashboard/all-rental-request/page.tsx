import React from "react";
import { getAllRentalsAction } from "../_actions/adminActions";

import { FileSearch } from "lucide-react";
import AllRentalsClient from "../_components/AllRentalsClient";
export const dynamic = "force-dynamic";
export default async function AdminAllRentalRequestsPage() {
    const res = await getAllRentalsAction();

    return (
        <div className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto w-full">
            
            <div className="flex items-center gap-3 border-b pb-5">
                <div className="p-2.5 bg-blue-50 text-blue-600 dark:bg-blue-950/30 rounded-xl">
                    <FileSearch className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Global Lease Applications</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">
                        Audit active rental application milestones, inspect financial obligations, and track settlement cycles.
                    </p>
                </div>
            </div>

           
            <AllRentalsClient rentals={res?.data || []} />
        </div>
    );
}
