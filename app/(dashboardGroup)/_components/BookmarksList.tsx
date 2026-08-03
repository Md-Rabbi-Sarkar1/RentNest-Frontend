"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";


interface BookmarkItem {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  property: {
    id: string;
    title: string;
    description: string;
    address: string;
    price: number;
    imageUrl: string | null;
    isAvailable: boolean;
    isPremium: boolean;
  };
}

export default function BookmarksList({ initialData }: { initialData: BookmarkItem[] }) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(initialData);

  if (bookmarks.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center animate-fade-in">
        <div className="text-4xl text-muted-foreground">🔖</div>
        <h3 className="mt-4 text-lg font-medium">No saved properties found</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-xs">
          Explore listing details and bookmark listings to trace them seamlessly here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((item) => (
        <div 
          key={item.id} 
          className="group relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-md"
        >
          
          {item.property.isPremium && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              Premium
            </span>
          )}

          {/* Listing Thumbnail section */}
          <div className="relative aspect-video w-full bg-muted overflow-hidden">
            {item.property.imageUrl?.startsWith("http") ? (
              <Image
                src={item.property.imageUrl}
                alt={item.property.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400">
                🖼️ No Preview
              </div>
            )}
          </div>

         
          <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-1 font-bold text-lg leading-tight group-hover:text-primary">
                {item.property.title}
              </h3>
              <span className="text-xl font-extrabold text-primary shrink-0">
                ${item.property.price.toLocaleString()}
              </span>
            </div>

            <p className="mt-1 text-xs font-medium text-muted-foreground tracking-wide line-clamp-1 uppercase">
              📍 {item.property.address}
            </p>

            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
              {item.property.description}
            </p>

            
            <div className="mt-5 flex items-center gap-3">
              <Link href={`/tenant-dashboard/bookmark-properties/${item.property.id}`} className="w-full">
                <Button className="w-full font-medium" variant="default">
                  View Detail
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
