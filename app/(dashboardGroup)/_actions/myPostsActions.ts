"use server"
import { isAccessTokenExist } from "@/service/refreshToken";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type PostState = {
    success: boolean;
    statusCode: number;
    message: string;
    data: Record<string, any>;
} | null;

export const createPost = async (prevState: PostState, formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const priceInput = formData.get("price") as string;
    const imageUrl = formData.get("imageUrl") as string || null;
    const isPremium = formData.get("isPremium") === "true";

    // 1. Get categoryName from form submission
    const categoryName = formData.get("categoryName") as string;

    // 2. Map categoryName to the specific categoryId required by your DB
    const categoryMapping: Record<string, number> = {
        "HOUSE": 1,
        "APPARTMENT": 2,
        "STUDIO": 3,
        "HOMECAR": 4,
        "TENT": 5
    };

    // fallback to null if someone submits an invalid category
    const categoryId = categoryMapping[categoryName] || null;

    const price = parseFloat(priceInput) || 0;

    // 3. Add both categoryName and categoryId into your payload
    const payload = {
        title,
        description,
        address,
        price,
        imageUrl,
        isPremium,
        categoryName, // Optional: tracking plain-text label
        categoryId    // Crucial: for structural filtering later
    };

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

        if (result.success) {
            revalidateTag("my-posts", '');
            if (result.data?.isPremium) {
                revalidateTag("premium-posts", '');
            } else {
                revalidateTag("public-posts", '');
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
};


export const updatePost = async (postId: string, prevState: PostState, formData: FormData) => {

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const priceInput = formData.get("price") as string;
    const imageUrl = formData.get("imageUrl") as string || null;
    const isPremium = formData.get("isPremium") === "true";


    const price = parseFloat(priceInput) || 0;

    const payload = {
        title: title ?? '',
        description: description ?? '',
        address: address ?? '',
        price,
        imageUrl,
        isPremium
    };



    const accessToken = await isAccessTokenExist();

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/${postId}`, {
            method: "PUT",
            headers: {
                Authorization: accessToken as unknown as string,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const result = await res.json();


        if (result.success) {
            revalidateTag("my-posts", '');
            if (result.data?.isPremium) {
                revalidateTag("premium-posts", '');
            } else {
                revalidateTag("public-posts", '');
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
                revalidate: 60 * 60 * 24,
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




export async function deletePostAction(postId: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const result = await res.json();

        if (result.success) {
            revalidatePath("/landlord-dashboard/my-posts");
        }
        return result;
    } catch (error) {
        return { success: false, message: "Something went wrong while deleting" };
    }
}
