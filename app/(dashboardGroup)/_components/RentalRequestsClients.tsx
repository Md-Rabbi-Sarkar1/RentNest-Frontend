'use client';

import React, { useTransition } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Calendar, DollarSign, Building } from "lucide-react";
import { toast } from "sonner";
import { updateRentalStatus } from '../_actions/rentalRequesthandle';


interface RentalRequestItem {
    id: string;
    startDate: string;
    endDate: string | null;
    totalAmount: number;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    createdAt: string;
    property: { id: string; title: string };
    tenant: { id: string; name: string; email: string };
}

interface RentalRequestsClientProps {
    initialData: RentalRequestItem[];
}

export default function RentalRequestsClient({ initialData }: RentalRequestsClientProps) {
    const [isPending, startTransition] = useTransition();

const handleStatusUpdate = (rentalId: string, status: "ACCEPTED" | "REJECTED") => {
    // 1. Trigger Loading Alert
    const toastId = toast.loading(`Updating reservation state to ${status.toLowerCase()}...`);

    startTransition(async () => {
        // 2. Await Server Action execution
        const result = await updateRentalStatus(rentalId, status);
        
        // 3. Match backend results directly
        if (result?.success) {
            toast.success("Status Updated 🎉", { 
                id: toastId,
                description: result.message || `The request was successfully ${status.toLowerCase()}.`
            });
        } else {
            toast.error("Operation Denied", { 
                id: toastId,
                // Displays explicit backend validation errors (e.g., "Alteration commands matching current owner profile invalid")
                description: result?.message || "Could not modify status tracking entry."
            });
        }
    });
};


    const getStatusBadge = (status: string) => {
        switch (status) {
            case "ACCEPTED": return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Approved</Badge>;
            case "REJECTED": return <Badge variant="destructive">Rejected</Badge>;
            default: return <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
        }
    };

    if (initialData.length === 0) {
        return (
            <Card className="text-center p-8 border-dashed">
                <CardContent className="pt-6 space-y-2">
                    <Building className="h-12 w-12 text-muted-foreground mx-auto" />
                    <h3 className="font-semibold text-lg">No Rental Requests</h3>
                    <p className="text-muted-foreground text-sm">When tenants request your listings, they will show up here.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Requested Date</TableHead>
                        <TableHead>Rent Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {initialData.map((item) => (
                        <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                            {/* Property Column */}
                            <TableCell className="font-medium">
                                <div className="flex flex-col">
                                    <span className="truncate max-w-[200px] text-sm font-semibold">{item.property.title}</span>
                                    <span className="text-xs text-muted-foreground">ID: {item.property.id.substring(0, 8)}</span>
                                </div>
                            </TableCell>

                            {/* Tenant Column */}
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs uppercase font-bold">
                                            {item.tenant.name.substring(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{item.tenant.name}</span>
                                        <span className="text-xs text-muted-foreground max-w-[150px] truncate">{item.tenant.email}</span>
                                    </div>
                                </div>
                            </TableCell>

                            {/* Date Column */}
                            <TableCell>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                                    <span>{new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </TableCell>

                            {/* Rent Amount Column */}
                            <TableCell>
                                <div className="flex items-center text-sm font-bold tracking-tight">
                                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground -mr-0.5" />
                                    {item.totalAmount.toLocaleString()}
                                </div>
                            </TableCell>

                            {/* Status Indicator Column */}
                            <TableCell>{getStatusBadge(item.status)}</TableCell>

                            {/* Action Buttons Column */}
                            <TableCell className="text-right">
                                {item.status === "PENDING" ? (
                                    <div className="flex justify-end gap-2">
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 h-8"
                                            disabled={isPending}
                                            onClick={() => handleStatusUpdate(item.id, "ACCEPTED")}
                                        >
                                            <Check className="h-4 w-4 mr-1" /> Accept
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="border-destructive/20 text-destructive hover:bg-destructive/5 h-8"
                                            disabled={isPending}
                                            onClick={() => handleStatusUpdate(item.id, "REJECTED")}
                                        >
                                            <X className="h-4 w-4 mr-1" /> Reject
                                        </Button>
                                    </div>
                                ) : (
                                    <span className="text-xs text-muted-foreground font-medium pr-4">Processed</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
