"use client"; 

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() { // 👈 নাম পরিবর্তন করে ContactForm করা হয়েছে
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please populate all text fields before hitting submit.");
      return;
    }

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success("Support ticket logged! We will email you back within 24 hours. 🎉");
      setFormData({ name: "", email: "", message: "" });
    });
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight">Get in Touch</h1>
            <p className="text-muted-foreground leading-relaxed">
              Have questions regarding application statuses, processing gateways, or landlord contracts? Drop us a line!
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl border bg-card/50">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs text-muted-foreground font-medium">Email Support</p>
                <p className="text-sm font-semibold truncate">support@rentnest.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border bg-card/50">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">Hotline Desk</p>
                <p className="text-sm font-semibold">+1 (555) 736-8637</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border bg-card/50">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground font-medium">Headquarters</p>
                <p className="text-sm font-semibold">Silicon Valley, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form Card */}
        <Card className="lg:col-span-2 shadow-md border-muted/70">
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>Fill out this form and our automated ticketing parser will route it to the right department.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                  <Input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="John Doe" disabled={isPending} className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                  <Input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="john@example.com" disabled={isPending} className="h-10" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detailed Inquiry</label>
                <Textarea name="message" value={formData.message} onChange={handleFormChange} placeholder="Describe your issue or custom property specification requirements..." disabled={isPending} rows={5} className="resize-none" />
              </div>
              <Button type="submit" className="w-full sm:w-auto h-11 px-6 gap-2 font-medium cursor-pointer" disabled={isPending}>
                {isPending ? "Submitting Inquiry..." : <><Send className="h-4 w-4" /> Dispatch Ticket</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
