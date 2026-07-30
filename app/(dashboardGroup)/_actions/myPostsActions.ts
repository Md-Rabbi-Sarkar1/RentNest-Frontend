"use server"
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type PostState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: Record<string, any>;
} | null;

export const createPost = async (prevState: PostState, formData: FormData) => {
    // 1. Extract values matching the new form field names
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const priceInput = formData.get("price") as string;
    const imageUrl = formData.get("imageUrl") as string || null;
    
    // Checkbox mapping: Shadcn checkbox passes value "true" if checked
    const isPremium = formData.get("isPremium") === "true";

    // 2. Parse Float for database data type safety
    const price = parseFloat(priceInput) || 0;

    const payload = {
        title,
        description,
        address,
        price,
        imageUrl,
        isPremium
    };

    console.log("Create Payload to Backend:", payload);

    const accessToken = await isAccessTokenExist();

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
            method: "POST",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        // 3. Purge Next.js cache tags dynamically upon success
        if (result.success) {
            revalidateTag("my-posts",'max');
            if (result.data?.isPremium) {
                revalidateTag("premium-posts",'max');
            } else {
                revalidateTag("public-posts",'max');
            }
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to submit post creation request.",
            data: {}
        };
    }
}

export const updatePost = async (postId: string, prevState: PostState, formData: FormData) => {
    // 1. Extract values matching the new form field names
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const priceInput = formData.get("price") as string;
    const imageUrl = formData.get("imageUrl") as string || null;
    const isPremium = formData.get("isPremium") === "true";

    // 2. Parse Float for database data type safety
    const price = parseFloat(priceInput) || 0;

    const payload = {
        title: title ?? '',
        description: description ?? '',
        address: address ?? '',
        price,
        imageUrl,
        isPremium
    };

    console.log("Update Payload to Backend:", payload);

    const accessToken = await isAccessTokenExist();

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/${postId}`, {
            method: "PUT",
            headers: {
                Authorization : accessToken as unknown as string,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        // 3. Purge Next.js cache tags dynamically upon success
        if (result.success) {
            revalidateTag("my-posts",'max');
            if (result.data?.isPremium) {
                revalidateTag("premium-posts",'max');
            } else {
                revalidateTag("public-posts",'max');
            }
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to submit post update request.",
            data: {}
        };
    }
}

export const getMyPost = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!"
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/properties`, {
            headers: {
                "Cookie": `accessToken=${accessToken}`
            },
            cache: "no-cache",
            next: {
                revalidate: 60 * 60 * 24, // 1 day
                tags: ["my-posts"]
            }
        });

        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch user posts."
        };
    }
}
