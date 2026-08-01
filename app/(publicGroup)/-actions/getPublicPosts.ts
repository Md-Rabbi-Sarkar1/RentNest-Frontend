"use server"
import { cookies } from "next/headers";

export const getPublicPosts = async ({
  query
}: {
  query?: { [key: string]: string | string[] | undefined };
}) =>{
    const params = new URLSearchParams()
    if(query && query?.searchTerm){
        params.set("searchTerm",query.searchTerm as string)
    }
    const cookieStore = await cookies();
    
        const accessToken = cookieStore.get("accessToken")?.value || null;
    
        if(!accessToken){
          
    
            return {
                success : false,
                message : "User not logged in!"
            }
        }
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,{
        headers : {
            // Authorization : accessToken as unknown as string,
            // Authorization : `${accessToken}`,
            // Authorization : `Bearer ${accessToken}`

            Cookie : `accessToken=${accessToken}`
        },
        cache:"no-cache",
        next:{
            revalidate:60*60*24,
            tags: ["public-posts"]
        }
    })
    const result = await res.json();
    return result
}