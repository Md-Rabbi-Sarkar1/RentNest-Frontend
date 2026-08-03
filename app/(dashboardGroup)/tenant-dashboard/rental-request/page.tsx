import React from 'react';

import { AlertCircle, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getTenantRentalRequests } from '../../_actions/tenantAction';
import TenantRequestsClient from '../../_components/TenantRequestsClient';
export const dynamic = "force-dynamic";
export default async function TenantRequestsDashboardPage() {
    const res = await getTenantRentalRequests();

    if (!res || !res.success) {
        return (
            <div className="container mx-auto max-w-4xl p-6 mt-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Data Fetch Error</AlertTitle>
                    <AlertDescription>{res?.message || "Unable to acquire property pipeline items."}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <main className="container mx-auto max-w-6xl p-4 md:p-8 space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <FileText className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Rental Applications</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">Monitor request confirmations, authorize payments, and leave feedback reviews.</p>
                </div>
            </div>

            <TenantRequestsClient requests={res.data || []} />
        </main>
    );
}
