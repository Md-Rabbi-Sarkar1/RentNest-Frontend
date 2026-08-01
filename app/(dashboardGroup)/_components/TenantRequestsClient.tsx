'use client';

import React, { useTransition } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, Calendar, DollarSign, MapPin, Eye } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { initiateSslPayment } from '../_actions/tenantAction';
import ReviewDialog from './ReviewDialog';

interface RentalRequestItem {
    id: string;
    startDate: string;
    totalAmount: number | null;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
    propertyId: string;
    property: { title: string; address: string };
}

interface TenantRequestsProps {
    requests: RentalRequestItem[];
}

export default function TenantRequestsClient({ requests }: TenantRequestsProps) {
    const [isPending, startTransition] = useTransition();

    const handlePayNowClick = (requestId: string) => {
        const toastId = toast.loading("Configuring payment session gateway securely...");

        startTransition(async () => {
            const result = await initiateSslPayment(requestId);

            if (result?.success && result?.data?.gatewayUrl) {
                toast.success("Payment session generated! Redirecting...", { id: toastId });
                window.location.href = result.data.gatewayUrl;
            } else {
                toast.error(result?.message || "Payment routing unavailable. Missing amount calculations.", { id: toastId });
            }
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "COMPLETED": return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Paid & Completed</Badge>;
            case "ACCEPTED": return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Approved / Awaiting Payment</Badge>;
            case "REJECTED": return <Badge variant="destructive">Rejected</Badge>;
            default: return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Pending Approval</Badge>;
        }
    };

    return (
        <Card className="shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Property Destination</TableHead>
                        <TableHead>Move-in Date</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Status Code</TableHead>
                        <TableHead className="text-right">Action Operations</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((item) => (
                        <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">

                            <TableCell>
                                <div className="flex flex-col space-y-0.5">
                                    <span className="font-semibold text-sm max-w-[240px] truncate">{item.property.title}</span>
                                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                                        <MapPin className="h-3 w-3 shrink-0" />
                                        <span className="truncate max-w-[200px]">{item.property.address}</span>
                                    </div>
                                </div>
                            </TableCell>


                            <TableCell>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </TableCell>


                            <TableCell>
                                <div className="flex items-center text-sm font-bold tracking-tight">
                                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground -mr-0.5" />
                                    {item.totalAmount ? item.totalAmount.toLocaleString() : "TBD"}
                                </div>
                            </TableCell>


                            <TableCell>{getStatusBadge(item.status)}</TableCell>


                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">

                                    <Link href={`/tenant-dashboard/rental-request/${item.id}`}>
                                        <Button size="sm" variant="outline" className="h-8 gap-1">
                                            <Eye className="h-3.5 w-3.5" /> Details
                                        </Button>
                                    </Link>


                                    {item.status === "ACCEPTED" && (
                                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white h-8 gap-1" disabled={isPending} onClick={() => handlePayNowClick(item.id)}>
                                            <CreditCard className="h-3.5 w-3.5" /> Pay Now
                                        </Button>
                                    )}


                                    {item.status === "COMPLETED" && (
                                        <ReviewDialog propertyId={item.propertyId} propertyName={item.property.title} />
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
