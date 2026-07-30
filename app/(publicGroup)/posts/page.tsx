import { Suspense } from "react"
import { PostsSearchBar } from "../_components/posts/PostsSearchBar";
import { PostsSkeleton } from "../_components/posts/PostsSkeleton";
import { PublicPostsList } from "../_components/posts/PublicPostsList";


const PostsPage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Public News</h1>
              <p className="text-sm text-muted-foreground">
                Exclusive stories for our User.
              </p>
            </div>
    
            <PostsSearchBar />
          </div>
    
          <Suspense fallback={<PostsSkeleton />}>
            <PublicPostsList searchParams={searchParams} />
          </Suspense>
        </div>
  )
}

export default PostsPage