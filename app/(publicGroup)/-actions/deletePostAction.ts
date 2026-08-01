"use server"
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const deletePostAction = async (postId: string) => {
    const accessToken = await isAccessTokenExist();

    try {
       
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        const result = await res.json();

        if (result.success) {
          
            revalidateTag("my-posts",'');
            revalidateTag("public-posts",'');
            revalidateTag("premium-posts",'');
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to purge property post records from the datastore backend."
        };
    }
};
