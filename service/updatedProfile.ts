"use server"

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(prevState: any, formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const name = formData.get("name")?.toString().trim();
    const bio = formData.get("bio")?.toString().trim() || ""; 
    const profilePhoto = formData.get("profilePhoto")?.toString().trim() || ""; 

    if (!name) {
      return { success: false, message: "Full Name is required." };
    }

    // This perfectly matches your backend destructuring: const { name, profilePhoto, bio } = payload;
    const payload = { 
      name, 
      profilePhoto, 
      bio 
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/my-profile`, {
      method: "PUT", 
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/profile"); 
    }
    return result;
  } catch (error) {
    console.error("Action Error Details:", error);
    return { success: false, message: "Failed to connect to profile management API." };
  }
}
