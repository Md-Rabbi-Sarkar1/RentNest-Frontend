"use client";

import { useState, useActionState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Tag } from "lucide-react";
import { toast } from "sonner";
import { createCategoryAction } from "../_actions/adminActions";


export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(createCategoryAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Property category saved successfully!");
      setOpen(false);
    } else {
      toast.error(state.message || "Unable to save unique category parameters.");
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 cursor-pointer">
          <Plus className="size-4" /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="size-5 text-primary" /> Create Structural Category
          </DialogTitle>
        </DialogHeader>

        <form action={action} className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Category Name</label>
            <Input
              name="name"
              placeholder="e.g. Modern Apartment, Luxury Duplex"
              required
            />
          </div>

          <Button type="submit" className="w-full mt-2" disabled={pending}>
            {pending ? "Adding to Datastore..." : "Confirm & Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
