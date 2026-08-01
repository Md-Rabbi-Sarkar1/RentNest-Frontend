"use server"

import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginState = {
    success: true,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}


export const loginAction = async (redirectTo: string, prevState: LoginState, formData: FormData) => {

    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
        });
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax",
        });

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
        if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith('/') && !redirectTo.startsWith('//')) {
            redirect(redirectTo)
        }
        if (decodedToken.role === "LANDLORD") {
            redirect("/landlord-dashboard");
        } else if (decodedToken.role === "ADMIN") {
            redirect("/admin-dashboard");
        } else if (decodedToken.role === "TENANT") {
            redirect("/tenant-dashboard");
        }
        redirect('/')
    }

    return result
}

type RegisterState = {
    success: boolean;
    statusCode: number;
    message: string;
    data?: any;
}

export const registerAction = async (prevState: any, formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");


    const payload = {
        name,
        email,
        password,
        role,
        profilePhoto: ""
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {

        redirect("/login");
    }

    return result;
}
