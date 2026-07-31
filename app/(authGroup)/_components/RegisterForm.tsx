"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/authActions";

const RegisterForm = () => {
    const [state, action, pending] = useActionState(registerAction, null);
    
    useEffect(() => {
        if (!state) return;
       
        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={action} className="space-y-4">
            <Card className="p-5 space-y-4">
                <Input name="name" type="text" placeholder="Enter Your Full Name" required />
                <Input name="email" type="email" placeholder="Enter Your Email" required />
                <Input name="password" type="password" placeholder="Create a Password" required />
                
                {/* Role Selection Dropdown */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Register As</label>
                    <select 
                        name="role" 
                        required 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="TENANT">Tenant (Looking to Rent)</option>
                        <option value="LANDLORD">Landlord (Looking to Lease)</option>
                    </select>
                </div>

                <Button type="submit" className="w-full">
                    {pending ? "Creating Account..." : "Register"}
                </Button>
            </Card>
        </form>
    );
}

export default RegisterForm;
