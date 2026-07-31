"use client"

import React, { useTransition } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ShieldAlert, ShieldCheck, UserCheck } from "lucide-react";
import { changeUserStatusAction } from "../_actions/adminActions";

interface UserItem {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "LANDLORD" | "TENANT";
    activeStatus: "ACTIVE" | "BLOCKED" | string;
    createdAt: string;
}

export default function AllUsersClient({ users }: { users: UserItem[] }) {
    const [isPending, startTransition] = useTransition();

    const handleStatusChange = (userId: string, currentStatus: string) => {
        const nextStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
        const confirmationMessage = `Are you sure you want to change this user status to ${nextStatus}?`;

        if (!confirm(confirmationMessage)) return;

        startTransition(async () => {
            const res = await changeUserStatusAction(userId, nextStatus);
            if (res.success) {
                toast.success(res.message || `User successfully updated to ${nextStatus}!`);
            } else {
                toast.error(res.message || "Failed to adjust security clearing matrix.");
            }
        });
    };

    return (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User Information</TableHead>
                        <TableHead>System Role</TableHead>
                        <TableHead>Registration Date</TableHead>
                        <TableHead>Account Status</TableHead>
                        <TableHead className="text-right">Access Controls</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((account) => (
                        <TableRow key={account.id} className="hover:bg-muted/40 transition-colors">
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm">{account.name}</span>
                                    <span className="text-xs text-muted-foreground">{account.email}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="font-medium tracking-wide">
                                    {account.role}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {new Date(account.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </TableCell>
                            <TableCell>
                                <Badge 
                                    className={account.activeStatus === "ACTIVE" 
                                        ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                                        : "bg-destructive text-white hover:bg-destructive/90"}
                                >
                                    {account.activeStatus}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <button
                                    disabled={isPending || account.role === "ADMIN"}
                                    onClick={() => handleStatusChange(account.id, account.activeStatus)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold tracking-tight transition-all border cursor-pointer select-none disabled:opacity-40 disabled:pointer-events-none ${
                                        account.activeStatus === "ACTIVE"
                                            ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                            : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                    }`}
                                >
                                    {account.activeStatus === "ACTIVE" ? (
                                        <>
                                            <ShieldAlert className="h-3.5 w-3.5" /> Block Account
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck className="h-3.5 w-3.5" /> Unblock Account
                                        </>
                                    )}
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {users.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-12 text-muted-foreground text-sm">
                                No registered users found inside the system datastore pipelines.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
