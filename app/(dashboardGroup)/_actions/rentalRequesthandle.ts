"use server"
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getRentalRequests = async () => {
    const cookieStore = await cookies();
            
                const accessToken = cookieStore.get("accessToken")?.value || null;
            console.log("Next.js Server Action Token extracted:", accessToken);
                if(!accessToken){
                    // throw new Error("User Not Logged In!");
            
                    return {
                        success : false,
                        message : "User not logged in!"
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
        // 🌟 Targets http://localhost:5000/api/landlord/:id
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/${rentalId}`, {
            method: "PATCH",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status }) // 🌟 Passed as req.body.status
        });

        const result = await res.json();
        
        if (result.success) {
            // Clears cache and updates table data visually
            revalidateTag("landlord-rentals",'');
        }
        return result;
    } catch (error: any) {
        return { 
            success: false, 
            message: error.message || "Failed to alter booking status records." 
        };
    }
};

