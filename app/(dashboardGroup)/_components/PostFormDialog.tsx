
"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IPost } from "@/lib/types";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createPost, updatePost } from "../_actions/myPostsActions";

type PostFormDialogProps = {
    mode: "create" | "edit";
    post?: IPost;
    id?: string;
}

export function PostFormDialog({ mode, post }: PostFormDialogProps) {
    const [open, setOpen] = useState(false);

    const action = mode === "edit" && post
        ? updatePost.bind(null, post.id)
        : createPost;

    const [state, formAction, pending] = useActionState(action, null) as any;

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || (mode === "edit" ? "Post updated successfully" : "Post created successfully"));

            setOpen(false);
        } else {
            toast.error(state.message || "Something went wrong");
        }
    }, [state, mode]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    mode === "edit" ? (
                        <Button variant="outline" size="sm">
                            <PencilIcon data-icon="inline-start" className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    ) : (
                        <Button>
                            <PlusIcon data-icon="inline-start" className="mr-2 h-4 w-4" />
                            Create Post
                        </Button>
                    )
                }
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit Property Post" : "Create Property Post"}
                    </DialogTitle>
                </DialogHeader>
                <form action={formAction} className="space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={post?.title} placeholder="Cozy Apartment..." required />
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={post?.description}
                            placeholder="Describe your property..."
                            required
                            className="min-h-24"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="categoryName" className="text-sm font-medium">
                            Select Property Category
                        </label>
                        <select
                            id="categoryName"
                            name="categoryName"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="" disabled selected>Choose a category...</option>
                            <option value="HOUSE">House</option>
                            <option value="APPARTMENT">Appartment</option>
                            <option value="STUDIO">Studio</option>
                            <option value="HOMECAR">Homecar</option>
                            <option value="TENT">Tent</option>
                        </select>
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" defaultValue={post?.address} placeholder="123 Main St, New York" required />
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            defaultValue={post?.price}
                            placeholder="1200.00"
                            required
                        />
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            defaultValue={post?.imageUrl ?? ""}
                            placeholder="https://unsplash.com only"
                        />
                    </div>


                    <Label className="flex items-center gap-2 font-normal cursor-pointer pt-2">
                        <Checkbox id="isPremium" name="isPremium" defaultChecked={post?.isPremium} value="true" />
                        <span>Mark as premium content listing</span>
                    </Label>

                    <DialogFooter className="pt-4">
                        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
                            {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Post"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
