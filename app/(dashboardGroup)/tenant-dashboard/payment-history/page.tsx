import React from 'react';

import { AlertCircle, History } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getPaymentHistoryAction } from '../../_actions/historyActions';
import PaymentHistoryClient from '../../_components/PaymentHistoryClient';

export default async function TenantPaymentHistoryPage() {
    const res = await getPaymentHistoryAction();

    if (!res || !res.success) {
        return (
            <div className="container mx-auto max-w-4xl p-6 mt-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Ledger Sync Failure</AlertTitle>
                    <AlertDescription>
                        {res?.message || "Failed to retrieve transaction billing histories from the central datastore."}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <main className="container mx-auto max-w-6xl p-4 md:p-8 space-y-6">
            {/* Upper Heading Dashboard Block */}
            <div className="flex items-center gap-3 border-b pb-5">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 rounded-xl">
                    <History className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Payment Histories</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">
                        Review, audit, and track secure billing records verified through SSLCommerz channels.
                    </p>
                </div>
            </div>

            {/* Content Table Mapping Grid */}
            <PaymentHistoryClient transactions={res.data || []} />
        </main>
    );
}
