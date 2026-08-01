"use server"
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getRentalRequests = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value || null;
    
    if (!accessToken) {


        return {
            success: false,
            message: "User not logged in!"
        }
    }
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/requests`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`
            },
            cache: "no-cache",
            next: { tags: ["landlord-rentals"] }
        });

        return await res.json();
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch rental requests." };
    }
};



export const updateRentalStatus = async (rentalId: string, status: "ACCEPTED" | "REJECTED") => {
    const accessToken = await isAccessTokenExist();

    try {

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/${rentalId}`, {
            method: "PATCH",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        });

        const result = await res.json();

        if (result.success) {

            revalidateTag("landlord-rentals", '');
        }
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to alter booking status records."
        };
    }
};

