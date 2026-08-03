"use server"

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";


export async function getAllUsersAction() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
            cache: "no-store",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) return { success: false, data: [] };
        return await res.json();
    } catch (error) {
        return { success: false, data: [] };
    }
}


export async function changeUserStatusAction(userId: string, status: "ACTIVE" | "BLOCKED" | string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        });

        const result = await res.json();
        if (result.success) {
            revalidatePath("/admin-dashboard/all-users");
        }
        return result;
    } catch (error) {
        return { success: false, message: "Network synchronization failure changing access status." };
    }
}


export async function getAllPropertiesAction() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/properties`, {
            cache: "no-store",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) return { success: false, data: [] };
        return await res.json();
    } catch (error) {
        return { success: false, data: [] };
    }
}


export async function getAllRentalsAction() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/rentals`, {
            cache: "no-store",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) return { success: false, data: [] };
        return await res.json();
    } catch (error) {
        return { success: false, data: [] };
    }
}


export async function createCategoryAction(prevState: any, formData: FormData) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const name = formData.get("name")?.toString().trim();

        if (!name) {
            return { success: false, message: "Category name field cannot be empty." };
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/category`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        });

        const result = await res.json();

        if (result.success) {
            revalidatePath("/admin-dashboard/category");
        }
        return result;
    } catch (error) {
        return { success: false, message: "Gateway error while creating property category." };
    }
}



export async function getAdminCategoriesWithPropertiesAction() {
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
            cache: "no-store"
        });
        if (!res.ok) return { success: false, data: [] };
        // console.log(res.data)
        return await res.json();
    } catch (error) {
        return { success: false, data: [] };
    }
}
