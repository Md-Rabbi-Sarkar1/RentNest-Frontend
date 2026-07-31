"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, User, Tag } from "lucide-react";

interface PropertyItem {
    id: string;
    title: string;
    address: string;
    price: number;
    isAvailable: boolean;
    isPremium: boolean;
    createdAt: string;
    category?: { name: string };
    landlord?: { id: string; name: string; email: string };
}

export default function AllPropertiesClient({ properties }: { properties: PropertyItem[] }) {
    return (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Property Details</TableHead>
                        <TableHead>Landlord Owner</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {properties.map((item) => (
                        <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                            {/* Title & Address */}
                            <TableCell>
                                <div className="flex flex-col space-y-0.5">
                                    <span className="font-semibold text-sm max-w-[280px] truncate">{item.title}</span>
                                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                                        <MapPin className="h-3 w-3 shrink-0 text-primary" />
                                        <span className="truncate max-w-[240px]">{item.address}</span>
                                    </div>
                                </div>
                            </TableCell>

                            {/* Landlord Contact Info */}
                            <TableCell>
                                <div className="flex flex-col text-sm">
                                    <span className="font-medium text-gray-700 flex items-center gap-1">
                                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                                        {item.landlord?.name || "Ecosystem User"}
                                    </span>
                                    <span className="text-xs text-muted-foreground pl-4.5">{item.landlord?.email || "—"}</span>
                                </div>
                            </TableCell>

                            {/* Property Category */}
                            <TableCell>
                                <Badge variant="outline" className="gap-1 font-medium bg-secondary/10">
                                    <Tag className="h-3 w-3 text-muted-foreground" />
                                    {item.category?.name || "Uncategorized"}
                                </Badge>
                            </TableCell>

                            {/* Marketplace Visibility Badges */}
                            <TableCell>
                                <div className="flex items-center gap-1.5">
                                    <Badge className={item.isAvailable ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"}>
                                        {item.isAvailable ? "Available" : "Rented"}
                                    </Badge>
                                    {item.isPremium && (
                                        <Badge className="bg-amber-500 text-white">Premium</Badge>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {properties.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-12 text-muted-foreground text-sm">
                                No property marketplace listings discovered in the centralized datastore.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
