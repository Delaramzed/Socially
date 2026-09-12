import UserAvatar from "../ui/UserAvatar";
import { useRecommendedUser } from "../../hooks/useRecommendedUser";
import { RecommendedUserSkeleton } from "../ui/Skeleton";
import { useFollowUser } from "../../hooks/useFollowUser";
import { useNavigate } from "react-router-dom";

function RecommendedUserItem({ user }: { user: any }) {
  const { mutate, isPending } = useFollowUser(user.id);
  const navigate = useNavigate();

  return (
    <div className="flex min-w-0 items-center justify-between gap-3">

      <div
        className="flex min-w-0 cursor-pointer items-center gap-2 md:gap-3"
        onClick={() => navigate(`/profile/${user.id}`)}
      >

        <UserAvatar name={user.name} image={user.image} className="h-10 w-10" />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-base-content truncate text-sm">@{user.name}</p>

          <span className="text-base-content/60 hidden text-xs md:block">
            {user._count.followers} followers
          </span>
        </div>
      </div>

      <button
        onClick={() => mutate()}
        disabled={isPending}
        className={`bg-base-300 text-base-content shrink-0 rounded-md px-2 py-1 text-[10px] md:rounded-lg md:px-3 md:py-1.5 md:text-xs ${
          isPending ? "" : "cursor-pointer"
        }`}
      >
        {isPending ? "Following..." : "Follow"}
      </button>
    </div>
  );
}

function RecommendedUserCard() {
  const { data: recommendedUsers, error, isLoading } = useRecommendedUser();

  if (isLoading) {
    return <RecommendedUserSkeleton />;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!recommendedUsers || recommendedUsers.length === 0) {
    return (
      <div className="border-base-300 bg-base-100 rounded-xl border p-6 shadow-sm md:p-4">
        <h3 className="text-base-content mb-6 text-sm font-semibold">
          Who to Follow
        </h3>

        <p className="text-base-content/50 text-sm">No users to follow.</p>
      </div>
    );
  }

  return (
    <div className="border-base-300 bg-base-100 rounded-xl border p-6 shadow-sm md:p-4">
      <h3 className="text-base-content mb-6 truncate text-xs font-semibold md:text-base md:whitespace-nowrap">
        Who to Follow
      </h3>
      <div className="flex flex-col gap-5">
        {recommendedUsers?.map((user) => (
          <RecommendedUserItem key={user.id} user={user} />
        ))}
      </div>

      <div className="flex min-w-0 items-center justify-between"></div>
    </div>
  );
}

export default RecommendedUserCard;
