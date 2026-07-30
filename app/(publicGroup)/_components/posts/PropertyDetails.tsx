"use client"
import React, { useTransition } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  User, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Crown 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { rentalRequest } from '../../-actions/rentalRequest';
import { toast } from 'sonner';

interface Landlord {
  id: string;
  name: string;
  email: string;
}

interface PropertyData {
  id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  categoryName: string | null;
  landlordId: string;
  categoryId: string | null;
  category: string | null;
  landlord: Landlord;
  reviews: any[];
}

interface PropertyDetailsProps {
  data: PropertyData;
}

export default function PropertyDetails({ data }: PropertyDetailsProps) {
  // Format dates cleanly
  const formattedDate = new Date(data.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Fallback for avatar initials
  const landlordInitials = data.landlord?.name
    ? data.landlord.name.split(' ').map((n) => n[0]).join('').toUpperCase()
    : 'U';

  // Strict check to filter out literal dummy strings like "imageUrl" or empty strings
  const isValidImage = 
    data.imageUrl && 
    data.imageUrl !== 'imageUrl' && 
    (data.imageUrl.startsWith('/') || data.imageUrl.startsWith('http'));
   
    const [isPending, startTransition] = useTransition();
const handleRentalRequest = () => {
const toastId = toast.loading("Submitting your rental request...");
startTransition(async () => {
      try {
        const result = await rentalRequest(data.id);

        if (result?.success) {
          toast.success("Request Sent! 🎉", {
            id: toastId, // Smoothly replaces the loading spinner card
            description: result.message || "Rental request completed successfully.",
          });
        } else {
          toast.error("Request Failed", {
            id: toastId,
            description: result?.message || "The application rejected your booking.",
          });
        }
      } catch (error) {
        toast.error("Network Error", {
          id: toastId,
          description: "Failed to establish a network connection.",
        });
      }
    });
}
  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8">
      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Column: Image & Core Details */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Visual Header / Image Container */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
            {isValidImage ? (
              <Image
                src={data.imageUrl}
                alt={data.title || "Property Image"}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground bg-secondary/30">
                <p className="text-sm font-medium">No preview image available</p>
              </div>
            )}
            
            {/* Overlay Badges */}
            <div className="absolute left-4 top-4 flex gap-2">
              {data.isPremium && (
                <Badge className="bg-amber-500 text-white hover:bg-amber-600 gap-1 shadow-md">
                  <Crown className="h-3 w-3" /> Premium
                </Badge>
              )}
              <Badge variant={data.isAvailable ? "default" : "destructive"} className="shadow-md gap-1">
                {data.isAvailable ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" /> Available
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3" /> Unavailable
                  </>
                )}
              </Badge>
            </div>
          </div>

          {/* Listing Information Card */}
          <Card>
            <CardHeader className="space-y-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
                  {data.title || "Untitled Property Listing"}
                </CardTitle>
                <div className="flex items-center text-muted-foreground text-sm gap-1">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span>{data.address || "No address provided"}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Separator />
              
              {/* Description Section */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">About this property</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {data.description || "No description provided for this listing."}
                </p>
              </div>

              <Separator />

              {/* Dynamic Metadata Fields */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-1 p-3 rounded-lg bg-secondary/40">
                  <span className="text-xs text-muted-foreground font-medium">Listed on</span>
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formattedDate}
                  </div>
                </div>

                <div className="flex flex-col gap-1 p-3 rounded-lg bg-secondary/40">
                  <span className="text-xs text-muted-foreground font-medium">Category</span>
                  <div className="text-sm font-semibold capitalize">
                    {data.categoryName || 'Uncategorized'}
                  </div>
                </div>

                <div className="flex flex-col gap-1 p-3 rounded-lg bg-secondary/40 col-span-2 sm:col-span-1">
                  <span className="text-xs text-muted-foreground font-medium">Reviews</span>
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    {data.reviews && data.reviews.length > 0 
                      ? `${data.reviews.length} total` 
                      : "No reviews yet"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Pricing & Landlord Actions Sticky Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-8 h-fit">
          
          {/* Action / Pricing Box */}
          <Card className="shadow-lg border-primary/20">
            <CardHeader>
              <CardDescription>Price</CardDescription>
              <CardTitle className="text-3xl font-extrabold flex items-baseline tracking-tight">
                <DollarSign className="h-6 w-6 self-center text-primary -mr-1" />
                {data.price?.toLocaleString() || "0"}
                <span className="text-sm font-normal text-muted-foreground ml-1">/ month</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full text-base font-medium py-6" 
                size="lg" 
                disabled={!data.isAvailable}
                onClick={data.isAvailable ? handleRentalRequest : undefined} 
              >
                {data.isAvailable ? "Rental Request" : "Currently Unavailable"}
              </Button>

              <Button variant="outline" className="w-full py-6" size="lg">
                Save to Bookmarks
              </Button>
            </CardContent>
          </Card>

          {/* Landlord Info Profile Box */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
                Listed By Landlord
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {landlordInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 overflow-hidden">
                  <h4 className="font-semibold text-base truncate flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    {data.landlord?.name || "Unknown Landlord"}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {data.landlord?.email || "No email available"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
