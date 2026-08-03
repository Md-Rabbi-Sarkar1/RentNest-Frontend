import { getMe } from "@/service/getMe"; 
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MailIcon, ShieldCheckIcon, UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { EditProfileDialog } from "./_components/EditProfileDialog"; 
export const dynamic = "force-dynamic";
export default async function ProfilePage() {
  const user = await getMe();

  
  if (!user || !user.success) {
    redirect("/login");
  }

  const profile = user.data.profile;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="shadow-md">
        <CardHeader className="border-b bg-muted/30 pb-8 pt-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 w-full">
            
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
             
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={profile.profilePhoto || ""} alt={profile.name} />
                <AvatarFallback className="text-xl bg-primary/10 text-primary">
                  {profile.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
                  <Badge variant="secondary" className="font-semibold">
                    {profile.role}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
                  <MailIcon className="size-4" /> {profile.email}
                </p>
              </div>
            </div>

            
            <div className="shrink-0 mt-2 sm:mt-0">
               <EditProfileDialog currentProfile={profile} />
            </div>

          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
           
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Account Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <UserIcon className="size-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium text-gray-500 text-xs">User ID</p>
                    <p className="text-foreground font-mono text-xs break-all">{profile.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <ShieldCheckIcon className="size-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium text-gray-500 text-xs">Status</p>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {profile.activeStatus || "ACTIVE"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                History & Activity
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="size-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium text-gray-500 text-xs">Joined On</p>
                    <p className="text-foreground">
                      {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          
          {profile.profile?.bio !== undefined && (
            <div className="border-t pt-4 space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Biography
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {profile.profile?.bio || "No profile bio has been written yet."}
              </p>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
