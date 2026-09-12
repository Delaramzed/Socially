export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-base-300 animate-pulse rounded-md ${className}`} />
  );
}

export function PostCardSkeleton() {
  return (
    <div className="border-base-300 bg-base-100 w-[550px] max-w-full rounded-xl border p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      <div className="mt-5 flex gap-4">
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
      </div>
    </div>
  );
}

export function AddPostCardSkeleton() {
  return (
    <div className="border-base-300 bg-base-100 w-[550px] max-w-full rounded-xl border p-6 shadow-sm">
      <div className="flex h-25 items-start gap-4">
        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

        <Skeleton className="h-full min-w-0 flex-1 rounded-md" />
      </div>

      <div className="border-base-300 mt-4 border-t pt-4">
        <div className="flex justify-end">
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function RecommendedUserSkeleton() {
  return (
    <div className="border-base-300 bg-base-100 rounded-xl border p-6 shadow-sm md:p-4">
      <Skeleton className="mb-6 h-5 w-32" />

      <div className="flex flex-col gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />

              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="hidden h-3 w-20 md:block" />
              </div>
            </div>

            <Skeleton className="h-7 w-16 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function UserProfileCardSkeleton() {
  return (
    <div className="border-base-300 bg-base-100 w-full max-w-2xl rounded-2xl border p-6">
      <div className="flex flex-col items-center text-center">
        <Skeleton className="h-24 w-24 rounded-full" />

        <Skeleton className="mt-4 h-5 w-32" />
        <Skeleton className="mt-2 h-4 w-40" />

        <div className="mt-6 flex w-full justify-around">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Skeleton className="h-4 w-6" />
              <Skeleton className="h-3 w-14" />
            </div>
          ))}
        </div>

        <Skeleton className="mt-6 h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function NotificationCardSkeleton() {
  return (
    <section className="border-base-300 relative flex items-start gap-3 border-b px-4 py-5">
      {/* Avatar */}
      <Skeleton className="h-10 w-10 shrink-0 !rounded-full" />

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-3 pr-5">
        {/* Username + Message */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded-full" /> {/* Icon */}
          <Skeleton className="h-4 w-2/3" /> {/* Text */}
        </div>

        {/* Post Title Placeholder */}
        <Skeleton className="ml-6 h-9 w-3/4 rounded-md" />

        {/* Comment Placeholder */}
        <Skeleton className="ml-6 h-9 w-11/12 rounded-md" />

        {/* Timestamp */}
        <Skeleton className="h-3 w-20" />
      </div>

      {/* Unread Indicator */}
      <Skeleton className="h-2 w-2 shrink-0 rounded-full" />
    </section>
  );
}

export function NotificationPageSkeleton() {
  return (
    <div className="bg-base-100 border-base-300 mb-20 flex max-w-233 flex-col overflow-hidden rounded-xl border shadow-sm">
      {/* Header */}
      <div className="border-base-300 flex items-center justify-between border-b px-5 py-4">
        <Skeleton className="h-6 w-32" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>

      {/* Notification Cards */}
      <div className="divide-base-300 divide-y">
        {Array.from({ length: 6 }).map((_, index) => (
          <NotificationCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="mx-auto flex h-16 w-full max-w-[1248px] items-center justify-between px-2 md:px-4 lg:px-6">
      <Skeleton className="h-6 w-24" />

      <div className="flex items-center gap-4">
        <Skeleton className="h-9 w-9 rounded-[6px]" />
        <Skeleton className="h-9 w-20 rounded-[6px]" />
        <Skeleton className="h-9 w-32 rounded-[6px]" />
        <Skeleton className="h-9 w-24 rounded-[6px]" />
        <Skeleton className="h-9 w-9 rounded-[6px]" />
      </div>
    </div>
  );
}

export function SideProfileCardSkeleton() {
  return (
    <div className="card bg-base-100 border-base-300 hidden w-full border px-6 shadow-sm lg:block lg:max-w-5xl">
      <div className="card-body flex flex-col items-center gap-4 p-0 py-6 text-center">
        {/* Avatar */}
        <div className="avatar">
          <div className="ring-base-content/50 ring-offset-base-100 w-20 rounded-full ring-2 ring-offset-2">
            <Skeleton className="h-20 w-20 rounded-full" />
          </div>
        </div>

        {/* Name and Email */}
        <div className="flex flex-col items-center justify-center gap-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="divider my-0 w-full"></div>

        {/* Follow Section */}
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
          <div className="min-w-0">
            <Skeleton className="mx-auto h-6 w-8" /> {/* Followings count */}
            <Skeleton className="mx-auto mt-2 h-3 w-20" />{" "}
            {/* Followings label */}
          </div>

          <div className="divider divider-horizontal mx-0 h-10"></div>

          <div className="min-w-0">
            <Skeleton className="mx-auto h-6 w-8" /> {/* Followers count */}
            <Skeleton className="mx-auto mt-2 h-3 w-16" />{" "}
            {/* Followers label */}
          </div>
        </div>

        <div className="divider my-0 w-full"></div>

        {/* Info Section */}
        <div className="mt-2 w-full space-y-3 text-left">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 shrink-0 rounded-sm" />{" "}
            {/* Location Icon */}
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 shrink-0 rounded-sm" />{" "}
            {/* Website Icon */}
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostsLikesTabsSkeleton() {
  return (
    <div className="border-base-300 flex gap-4 border-b px-6">
      <Skeleton className="h-12 w-24 rounded-t-md" />
      <Skeleton className="h-12 w-24 rounded-t-md" />
    </div>
  );
}

export function PostsLikesContentSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  );
}
