"use server"
import { isAccessTokenExist } from "@/service/refreshToken";
import { cookies } from "next/headers";

export const getPaymentHistoryAction = async () => {
    const accessToken = await isAccessTokenExist();
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
            headers: { "Cookie": `accessToken=${accessToken}` },
            cache: "no-cache",
            next: { tags: ["tenant-payments"] }
        });
        return await res.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to compile transaction history records." };
    }
};

export async function getSinglePaymentDetailAction(paymentId: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        // Connects directly to app.use('/api/payments', paymentRouter)
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/${paymentId}`, {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Failed to query central data ledger endpoint:", error);
        return null;
    }
}