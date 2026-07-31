import React from 'react';
import { getSinglePaymentDetailAction } from "@/app/(dashboardGroup)/_actions/historyActions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Calendar, DollarSign, CheckCircle2, AlertTriangle, HelpCircle, Receipt, Building, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ paymentId: string }>;
}

export default async function TenantPaymentDetailPage({ params }: PageProps) {
    const { paymentId } = await params;
    const res = await getSinglePaymentDetailAction(paymentId);

    if (!res || !res.success) {
        notFound();
    }

    const tx = res.data;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PAID":
                return <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 gap-1"><CheckCircle2 className="h-3 w-3" /> Settlement Confirmed</Badge>;
            case "FAILED":
                return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" /> Transaction Aborted</Badge>;
            default:
                return <Badge variant="secondary" className="bg-amber-100 text-amber-800 gap-1"><HelpCircle className="h-3 w-3" /> Awaiting Clearance</Badge>;
        }
    };

    return (
        <main className="container mx-auto max-w-4xl p-4 md:p-8 space-y-6">
            <Link href="/tenant-dashboard/payment-history">
                <Button variant="ghost" size="sm" className="gap-2 mb-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Payment Histories
                </Button>
            </Link>

            {/* Main Header Block */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Receipt className="h-5 w-5 text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Internal Reference: {tx.id}</span>
                    </div>
                    <h1 className="text-xl md:text-2xl font-extrabold tracking-tight mt-1">Invoice Tracker: {tx.transactionId}</h1>
                </div>
                <div className="shrink-0">{getStatusBadge(tx.status)}</div>
            </div>

            {/* Data Parameter Grids */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Panel 1: Settlement Overview */}
                <Card className="md:col-span-2">
                    <CardHeader className="pb-3 border-b bg-muted/20">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-primary" /> Gateway Accounting Parameters
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="divide-y text-sm pt-2">
                        <div className="flex justify-between py-3">
                            <span className="text-muted-foreground">Payment Channel Engine:</span>
                            <span className="font-semibold capitalize">{tx.meta?.card_type || tx.method || "SSLCommerz Gateway"}</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-muted-foreground">Bank Authorization ID:</span>
                            <span className="font-mono font-medium break-all">{tx.meta?.bank_tran_id || tx.bankTransactionId || "—"}</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-muted-foreground">Origin Issuing Country:</span>
                            <span className="font-medium">{tx.meta?.card_issuer_country || "International Clearance"}</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-muted-foreground">Settlement Cleared Date:</span>
                            <span className="font-medium flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                {new Date(tx.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Panel 2: Ledger Balance Calculations */}
                <Card className="flex flex-col justify-between">
                    <CardHeader className="pb-2 bg-emerald-500/5 border-b border-emerald-500/10">
                        <CardTitle className="text-sm font-medium text-emerald-800 dark:text-emerald-400">Total Settlement Balance</CardTitle>
                        <CardDescription>Calculated gross collection total</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 flex-1 flex flex-col justify-center items-center text-center space-y-2">
                        <div className="text-3xl font-black tracking-tight text-primary flex items-center">
                            <DollarSign className="h-6 w-6 text-muted-foreground -mr-1" />
                            <span>{tx.amount?.toLocaleString()} BDT</span>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Secure SSLCommerz Handshake
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
