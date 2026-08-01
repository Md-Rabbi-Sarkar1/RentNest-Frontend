'use client';

import React, { useState, useTransition } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { submitPropertyReview } from '../_actions/tenantAction';


interface ReviewDialogProps {
    propertyId: string;
    propertyName: string;
}

export default function ReviewDialog({ propertyId, propertyName }: ReviewDialogProps) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = () => {
        if (!comment.trim()) {
            toast.error("Please add a short comment about your stay.");
            return;
        }

        const toastId = toast.loading("Publishing review...");
        startTransition(async () => {
            const res = await submitPropertyReview(propertyId, rating, comment);
            if (res?.success) {
                toast.success("Review published successfully! Thank you.", { id: toastId });
                setOpen(false);
                setComment("");
            } else {
                toast.error(res?.message || "Failed to register review.", { id: toastId });
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/5 h-8 gap-1">
                    <MessageSquare className="h-3.5 w-3.5" /> Leave Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogDescription>Share your experience staying at <span className="font-semibold text-foreground">{propertyName}</span>.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    
                    <div className="space-y-2">
                        <Label>Rating Score</Label>
                        <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none transition-transform active:scale-95">
                                    <Star className={`h-6 w-6 ${star <= rating ? "text-amber-500 fill-amber-500" : "text-muted border-muted"}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="comment">Your Comment</Label>
                        <Textarea id="comment" placeholder="What did you like or dislike about the property/landlord?" value={comment} onChange={(e) => setComment(e.target.value)} required className="min-h-24" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={isPending}>{isPending ? "Submitting..." : "Submit Feedback"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
