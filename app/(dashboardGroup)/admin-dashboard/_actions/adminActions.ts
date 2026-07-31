"use server"

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// 1. Fetch All Users from /api/users/users
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

// 2. Modify Active Status from PENDING, ACTIVE, to BLOCKED via PATCH
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

// Add this inside app/admin-dashboard/_actions/adminActions.ts

// 1. Fetch All Properties from /api/users/properties
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
