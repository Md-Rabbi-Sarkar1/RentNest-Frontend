
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, DollarSign, MapPin, User, Receipt, Building } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSingleRentalRequest } from "@/app/(dashboardGroup)/_actions/tenantAction";

interface PageProps {
    params: Promise<{ requestId: string }>;
}

export default async function RentalRequestDetailPage({ params }: PageProps) {
    const { requestId } = await params;
    const result = await getSingleRentalRequest(requestId);

    if (!result || !result.success) {
        notFound();
    }

    const data = result.data;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "COMPLETED": return <Badge className="bg-emerald-500 text-white">Paid & Completed</Badge>;
            case "ACCEPTED": return <Badge className="bg-blue-500 text-white">Approved / Awaiting Payment</Badge>;
            case "REJECTED": return <Badge variant="destructive">Rejected</Badge>;
            default: return <Badge className="bg-amber-100 text-amber-800">Pending Approval</Badge>;
        }
    };

    return (
        <main className="container mx-auto max-w-4xl p-4 md:p-8 space-y-6">
            <Link href="/tenant-dashboard">
                <Button variant="ghost" size="sm" className="gap-2 mb-2">
                    <ArrowLeft className="h-4 w-4" /> Back to My Applications
                </Button>
            </Link>

           
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
                <div>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Application ID: {data.id}</span>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">{data.property?.title}</h1>
                    <div className="flex items-center text-sm text-muted-foreground gap-1.5 mt-2">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <span>{data.property?.address}</span>
                    </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                    <div className="mb-2">{getStatusBadge(data.status)}</div>
                    <div className="text-2xl font-bold tracking-tight flex items-center sm:justify-end">
                        <DollarSign className="h-5 w-5 text-muted-foreground -mr-0.5" />
                        {data.totalAmount ? data.totalAmount.toLocaleString() : "TBD"}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2 pb-3">
                        <Calendar className="h-4 w-4 text-primary" />
                        <CardTitle className="text-base font-semibold">Lease Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="flex justify-between py-1.5 border-b">
                            <span className="text-muted-foreground">Desired Move-in Date:</span>
                            <span className="font-medium">{new Date(data.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b">
                            <span className="text-muted-foreground">Payment Status:</span>
                            <span className="font-medium text-xs uppercase px-2 py-0.5 rounded-full bg-muted">{data.payments?.length > 0 ? data.payments[0].status : "UNPAID"}</span>
                        </div>
                    </CardContent>
                </Card>

               
                <Card>
                    <CardHeader className="flex flex-row items-center gap-2 pb-3">
                        <User className="h-4 w-4 text-primary" />
                        <CardTitle className="text-base font-semibold">Applicant Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="flex justify-between py-1.5 border-b">
                            <span className="text-muted-foreground">Name:</span>
                            <span className="font-medium">{data.tenant?.name}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b">
                            <span className="text-muted-foreground">Email Address:</span>
                            <span className="font-medium break-all">{data.tenant?.email}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            
            <Card>
                <CardHeader className="flex flex-row items-center gap-2 pb-3">
                    <Receipt className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base font-semibold">Transaction Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    {data.payments && data.payments.length > 0 ? (
                        <div className="divide-y text-sm">
                            {data.payments.map((pay: any) => (
                                <div key={pay.id} className="flex justify-between py-3 items-center">
                                    <div>
                                        <p className="font-medium">Transaction: {pay.transactionId || "N/A"}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{new Date(pay.createdAt).toLocaleString()}</p>
                                    </div>
                                    <Badge variant={pay.status === "VALID" ? "default" : "secondary"} className={pay.status === "VALID" ? "bg-emerald-500 hover:bg-emerald-500" : ""}>
                                        {pay.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-6">No historical invoice payment transactions processed yet for this application.</p>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
