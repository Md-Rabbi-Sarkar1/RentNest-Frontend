"use client"

import { useState, useActionState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit3Icon } from "lucide-react";
import { toast } from "sonner";
import { updateProfileAction } from "@/service/updatedProfile";

export function EditProfileDialog({ currentProfile }: { currentProfile: any }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(updateProfileAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Profile updated successfully!");
      setOpen(false);
    } else {
      toast.error(state.message || "Something went wrong.");
    }
  }, [state]);

  
  const initialName = currentProfile?.name || "";
  const initialPhoto = currentProfile?.profile?.profilePhoto || currentProfile?.profilePhoto || "";
  const initialBio = currentProfile?.profile?.bio || "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit3Icon className="size-4" /> Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Information</DialogTitle>
        </DialogHeader>
        
        <form action={action} className="space-y-4 pt-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
            <Input 
              name="name" 
              defaultValue={initialName} 
              required 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground">Profile Photo URL</label>
            <Input 
              name="profilePhoto" 
              defaultValue={initialPhoto} 
              placeholder="https://images.com" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground">Bio</label>
            <Textarea 
              name="bio" 
              defaultValue={initialBio} 
              placeholder="Write a short summary about yourself..." 
              rows={4} 
            />
          </div>

          <Button type="submit" className="w-full mt-2" disabled={pending}>
            {pending ? "Saving Changes..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
