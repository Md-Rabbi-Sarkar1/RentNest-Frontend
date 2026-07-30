"use server"
import { cookies } from "next/headers";

export const rentalRequest = async (id : string) =>{
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
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}`,{
            method:"POST",
            headers : {
               "Content-Type":"application/json",
                Authorization : accessToken as unknown as string,
                // Authorization : `${accessToken}`,
                // Authorization : `Bearer ${accessToken}`
    
                // Cookie : `accessToken=${accessToken}`
            },
            cache:"no-cache",
            
        })
        const result = await res.json();
        console.log(result)
        return result
}