'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, DollarSign, CheckCircle2, AlertTriangle, HelpCircle, Receipt, Eye } from "lucide-react";
import Link from "next/link";

interface PaymentMeta {
    card_type?: string;
    bank_tran_id?: string;
    card_issuer_country?: string;
    status?: string;
}

interface TransactionItem {
    id: string;
    transactionId: string;
    amount: number;
    method: string | null;
    status: "PENDING" | "PAID" | "FAILED";
    bankTransactionId: string | null;
    createdAt: string;
    meta: PaymentMeta | null;
}

interface PaymentHistoryClientProps {
    transactions: TransactionItem[];
}

export default function PaymentHistoryClient({ transactions }: PaymentHistoryClientProps) {

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PAID":
                return <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 gap-1"><CheckCircle2 className="h-3 w-3" /> Paid</Badge>;
            case "FAILED":
                return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" /> Failed</Badge>;
            default:
                return <Badge variant="secondary" className="bg-amber-100 text-amber-800 gap-1"><HelpCircle className="h-3 w-3" /> Pending</Badge>;
        }
    };

    if (transactions.length === 0) {
        return (
            <Card className="text-center p-8 border-dashed mt-4">
                <CardContent className="pt-6 space-y-2">
                    <Receipt className="h-12 w-12 text-muted-foreground mx-auto" />
                    <h3 className="font-semibold text-lg">No Invoices Found</h3>
                    <p className="text-muted-foreground text-sm">Your verified transaction history ledgers are currently empty.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm border">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ledger Timeline</CardTitle>
                <CardDescription>A comprehensive listing of processing settlement operations associated with your profile.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Transaction Tracking ID</TableHead>
                                <TableHead>Payment Gateway Method</TableHead>
                                <TableHead>Bank Reference ID</TableHead>
                                <TableHead>Settlement Date</TableHead>
                                <TableHead>Amount (BDT)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((tx) => (
                                <TableRow key={tx.id} className="hover:bg-muted/40 transition-colors">
                                    <TableCell className="font-mono text-xs font-semibold text-primary">
                                        {tx.transactionId}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
                                            <span className="capitalize">
                                                {tx.meta?.card_type || tx.method || "SSLCommerz Channel"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {tx.meta?.bank_tran_id || tx.bankTransactionId || "—"}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3.5 w-3.5 shrink-0" />
                                            <span>
                                                {new Date(tx.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-bold text-sm">
                                        ৳{tx.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(tx.status)}</TableCell>

                                    <TableCell className="text-right">
                                        <Link href={`/tenant-dashboard/payment-history/${tx.id}`}>
                                            <Button size="sm" variant="ghost" className="h-8 gap-1">
                                                <Eye className="h-3.5 w-3.5" /> Details
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
