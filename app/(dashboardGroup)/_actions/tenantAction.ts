"use server"
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// 🌟 Fetches all rental requests for the current authenticated Tenant user
export const getTenantRentalRequests = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!"
        };
    }
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL || 'http://localhost:5000'}/api/rentals`, {
            headers: { "Cookie": `accessToken=${accessToken}` },
            cache: "no-cache",
            next: { tags: ["tenant-rentals"] }
        });
        return await res.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to load rental requests." };
    }
};

// 🌟 Calls router.post('/create/:id') to generate the SSLCommerz initialization URL link
export const initiateSslPayment = async (rentalRequestId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!"
        };
    }
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL || 'http://localhost:5000'}/api/payments/create/${rentalRequestId}`, {
            method: "POST",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Content-Type": "application/json"
            }
        });
        return await res.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to initialize payment connection." };
    }
};

// 🌟 Submits property feedback reviews to the database matching the propertyId string 
export const submitPropertyReview = async (propertyId: string, rating: number, comment: string) => {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value || null;
    
        if (!accessToken) {
            return {
                success: false,
                message: "User not logged in!"
            };
        }
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL || 'http://localhost:5000'}/api/reviews/${propertyId}`, {
            method: "POST",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ propertyId, rating, comment })
        });
        const result = await res.json();
        if (result.success) revalidateTag("tenant-rentals",'max');
        return result;
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to post review feedback." };
    }
};


export async function getSingleRentalRequest(rentalId: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        // Matches your app.use('/api/rentals', rentalRouter) router layout config
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${rentalId}`, {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Fetch request error tracking details:", error);
        return null;
    }
}
