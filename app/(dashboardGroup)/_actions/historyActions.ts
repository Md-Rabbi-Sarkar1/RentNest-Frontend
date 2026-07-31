"use server"
import { isAccessTokenExist } from "@/service/refreshToken";

export const getPaymentHistoryAction = async () => {
    const accessToken = await isAccessTokenExist();
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL || 'http://localhost:5000'}/api/payments`, {
            headers: { "Cookie": `accessToken=${accessToken}` },
            cache: "no-cache",
            next: { tags: ["tenant-payments"] }
        });
        return await res.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to compile transaction history records." };
    }
};
