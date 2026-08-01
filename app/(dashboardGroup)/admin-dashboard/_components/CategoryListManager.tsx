"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, MapPin, Tag, Building } from "lucide-react";

interface Property {
    id: string;
    title: string;
    description: string;
    address: string;
    price: number;
    isAvailable: boolean;
}

interface CategoryItem {
    id: number;
    name: string;
    properties?: Property[];
}

export default function CategoryListManager({ initialCategories }: { initialCategories: CategoryItem[] }) {

    const [activeTabId, setActiveTabId] = useState<number | null>(
        initialCategories && initialCategories.length > 0 ? initialCategories[0].id : null
    );

    const activeCategory = initialCategories.find((c) => c.id === activeTabId);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mt-4">

            <div className="space-y-2 lg:col-span-1">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2">Ecosystem Filters</span>
                <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0">
                    {initialCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTabId(cat.id)}
                            className={`w-full text-left flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border cursor-pointer shrink-0 lg:shrink select-none ${activeTabId === cat.id
                                    ? "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/20 dark:border-purple-900"
                                    : "bg-card border-border hover:bg-muted text-foreground"
                                }`}
                        >
                            <div className="flex items-center gap-2 truncate">
                                <Tag className="h-4 w-4 shrink-0 opacity-70" />
                                <span className="truncate uppercase tracking-wide text-xs">{cat.name}</span>
                            </div>

                            <Badge
                                variant={activeTabId === cat.id ? "default" : "secondary"}
                                className="shrink-0 text-[10px] px-1.5 h-5"
                            >
                                {Array.isArray(cat.properties) ? cat.properties.length : 0}
                            </Badge>
                        </button>
                    ))}
                </div>
            </div>


            <div className="lg:col-span-3 space-y-4">
                {activeCategory ? (
                    <>
                        <div className="flex items-center gap-2 px-1">
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active Category:</span>
                            <Badge variant="outline" className="uppercase font-semibold tracking-wider text-xs">{activeCategory.name}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {activeCategory.properties?.map((post) => (
                                <Card key={post.id} className="shadow-none border flex flex-col justify-between">
                                    <CardHeader className="p-4 pb-2">
                                        <div className="flex justify-between items-start gap-2">
                                            <CardTitle className="text-sm font-semibold line-clamp-1">{post.title}</CardTitle>
                                            <Badge className={post.isAvailable ? "bg-emerald-500 text-white shrink-0 text-[10px] h-5" : "bg-muted text-muted-foreground shrink-0 text-[10px] h-5"}>
                                                {post.isAvailable ? "Available" : "Rented"}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center text-xs text-muted-foreground gap-1 mt-0.5">
                                            <MapPin className="h-3 w-3 shrink-0" />
                                            <span className="truncate">{post.address}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="px-4 pb-3 pt-0">
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {post.description || "No description text summary provided."}
                                        </p>
                                    </CardContent>
                                    <div className="p-3 bg-muted/30 border-t flex justify-between items-center text-xs">
                                        <span className="font-bold text-primary">৳{post.price.toLocaleString()} / mo</span>
                                        <span className="text-muted-foreground font-mono text-[10px] truncate max-w-[120px]">ID: {post.id.slice(0, 8)}</span>
                                    </div>
                                </Card>
                            ))}
                        </div>


                        {(!activeCategory.properties || activeCategory.properties.length === 0) && (
                            <div className="text-center py-16 border border-dashed rounded-xl space-y-2 bg-card">
                                <Home className="h-8 w-8 text-muted-foreground/30 mx-auto" />
                                <h4 className="font-semibold text-sm text-foreground">No Properties Found</h4>
                                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                                    Landlords haven't assigned any active marketplace listings to the {activeCategory.name} classifier yet.
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16 border border-dashed rounded-xl space-y-2 bg-card">
                        <Building className="h-8 w-8 text-muted-foreground/30 mx-auto" />
                        <h4 className="font-semibold text-sm text-foreground">Select a Classification</h4>
                        <p className="text-xs text-muted-foreground">Please choose a category from the left menu to audit its properties.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
