import { getUserBookmarksApi } from "../../_actions/tenantAction";
import BookmarksList from "../../_components/BookmarksList";


export default async function BookmarksPage() {
  const response = await getUserBookmarksApi();

  if (!response?.success) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-semibold text-destructive">Error Loading Bookmarks</h2>
        <p className="mt-1 text-sm text-muted-foreground">{response?.message || "Something went wrong."}</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto min-h-screen px-4 py-8 max-w-7xl">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Saved Bookmarks</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage the real estate listings you saved for later review.
        </p>
      </div>

      {/* Renders client-side layout for handling dynamic animations/removals */}
      <BookmarksList initialData={response.data} />
    </main>
  );
}
