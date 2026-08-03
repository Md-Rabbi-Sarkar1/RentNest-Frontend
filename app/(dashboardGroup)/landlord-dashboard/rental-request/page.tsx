import React from 'react';

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getRentalRequests } from '../../_actions/rentalRequesthandle';
import RentalRequestsClient from '../../_components/RentalRequestsClients';
export const dynamic = "force-dynamic";
export default async function LandlordRequestsPage() {
    const res = await getRentalRequests();

    if (!res || !res.success) {
        return (
            <div className="container mx-auto max-w-4xl p-6 mt-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Connection Failed</AlertTitle>
                    <AlertDescription>
                        {res?.message || "Failed to load rental queue data from the backend application."}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <main className="container mx-auto max-w-6xl p-4 md:p-8 space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Incoming Rental Requests</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Manage tenant application queues and approve bookings for your properties.
                </p>
            </div>
            
            
            <RentalRequestsClient initialData={res.data || []} />
        </main>
    );
}

