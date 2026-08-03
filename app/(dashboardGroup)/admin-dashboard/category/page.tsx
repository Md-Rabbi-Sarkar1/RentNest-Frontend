import React from "react";
import { Grid2X2 } from "lucide-react";

import { getAdminCategoriesWithPropertiesAction } from "../_actions/adminActions";
import { CreateCategoryDialog } from "../_components/CreateCategoryDialog";
import CategoryListManager from "../_components/CategoryListManager";

export const dynamic = "force-dynamic";
export default async function AdminCategoryDashboardPage() {
   
    const res = await getAdminCategoriesWithPropertiesAction();
    const categoriesData = res?.data || [];

    return (
        <div className="p-6 md:p-10 space-y-6 max-w-7xl mx-auto w-full">
           
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-50 text-purple-600 dark:bg-purple-950/30 rounded-xl">
                        <Grid2X2 className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Property Categories</h1>
                        <p className="text-muted-foreground text-sm mt-0.5">
                            Manage structural real estate category variables to regulate search filters on the marketplace.
                        </p>
                    </div>
                </div>
                
              
                <div className="shrink-0">
                    <CreateCategoryDialog />
                </div>
            </div>

            
            <CategoryListManager initialCategories={categoriesData} />
        </div>
    );
}
