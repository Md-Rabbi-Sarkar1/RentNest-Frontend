"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Building, Clock } from "lucide-react";

interface RentalRequestItem {
    id: string;
    startDate: string;
    totalAmount: number | null;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
    createdAt: string;
    property: { title: string };
    tenant: { name: string; email: string };
}

export default function AllRentalsClient({ rentals }: { rentals: RentalRequestItem[] }) {

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Paid & Finished</Badge>;
            case "ACCEPTED":
                return <Badge className="bg-blue-500 text-white hover:bg-blue-600">Approved / Unpaid</Badge>;
            case "REJECTED":
                return <Badge variant="destructive">Rejected</Badge>;
            default:
                return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Pending</Badge>;
        }
    };

    return (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Target Property</TableHead>
                        <TableHead>Tenant Applicant</TableHead>
                        <TableHead>Move-in Date</TableHead>
                        <TableHead>Financial Booking</TableHead>
                        <TableHead>Application Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rentals.map((req) => (
                        <TableRow key={req.id} className="hover:bg-muted/40 transition-colors">

                            <TableCell>
                                <div className="flex items-center gap-2 font-medium text-sm max-w-[260px] truncate">
                                    <Building className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span>{req.property?.title || "Unknown Listing"}</span>
                                </div>
                            </TableCell>


                            <TableCell>
                                <div className="flex flex-col text-sm">
                                    <span className="font-medium text-gray-700 flex items-center gap-1">
                                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                                        {req.tenant?.name || "Ecosystem Guest"}
                                    </span>
                                    <span className="text-xs text-muted-foreground pl-4.5">{req.tenant?.email || "—"}</span>
                                </div>
                            </TableCell>


                            <TableCell className="text-muted-foreground text-sm">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                                    <span>
                                        {new Date(req.startDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </TableCell>


                            <TableCell className="font-bold text-sm">
                                {req.totalAmount ? `৳${req.totalAmount.toLocaleString()}` : "Pending Evaluation"}
                            </TableCell>


                            <TableCell>{getStatusBadge(req.status)}</TableCell>
                        </TableRow>
                    ))}
                    {rentals.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-12 text-muted-foreground text-sm">
                                No marketplace rental application logs discovered.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
