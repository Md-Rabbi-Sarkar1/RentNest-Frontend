import React from "react";
import { getAllUsersAction } from "../_actions/adminActions";

import { UsersIcon } from "lucide-react";
import AllUsersClient from "../_components/AllUsersClient";
export const dynamic = "force-dynamic";
export default async function AdminAllUsersPage() {
    const res = await getAllUsersAction();

    return (
        <div className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto w-full">
           
            <div className="flex items-center gap-3 border-b pb-5">
                <div className="p-2.5 bg-blue-50 text-blue-600 dark:bg-blue-950/30 rounded-xl">
                    <UsersIcon className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">System User Directory</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">
                        Audit ecosystem identity roles, flag malicious profiles, and adjust platform access keys.
                    </p>
                </div>
            </div>

           
            <AllUsersClient users={res?.data || []} />
        </div>
    );
}
