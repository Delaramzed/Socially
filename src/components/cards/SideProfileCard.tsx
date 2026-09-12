import { LinkIcon, LocationIcon } from "../../assets/icons";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useSession } from "../../hooks/useSession";

import { SideProfileCardSkeleton } from "../ui/Skeleton";

import UserAvatar from "../ui/UserAvatar";


function SideProfileCard() {
  const { data: session } = useSession();
  const {
    data: user,
    isLoading,
    error,
  } = useUserProfile(session?.data?.user?.id ?? "");

  if (isLoading) {
    return <SideProfileCardSkeleton />;
  }

  if (error || !user) {
    return (
      <div className="card bg-base-100 border-base-300 w-full border px-6 py-6">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="card bg-base-100 border-base-300 hidden w-full border px-6 shadow-sm lg:block lg:max-w-5xl">
      <div className="card-body flex flex-col items-center gap-4 p-0 py-6 text-center">
        <div className="avatar">
          <div className="ring-base-content/50 ring-offset-base-100 rounded-full ring-2 ring-offset-2">
            <UserAvatar
              name={user.name}
              image={user.image}
              className="h-20 w-20 text-2xl"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="card-title text-lg font-bold">{user.name}</h2>
          <p className="text-base-content/50">{user.email}</p>
        </div>

        <div className="divider my-0 w-full"></div>

        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center text-center">
          <div className="min-w-0">
            <div className="text-lg font-bold">
              {user._count?.followings ?? 0}
            </div>

            <div className="text-base-content/50 text-xs">Followings</div>
          </div>

          <div className="divider divider-horizontal mx-0 h-10"></div>

          <div className="min-w-0">
            <div className="text-lg font-bold">
              {user._count?.followers ?? 0}
            </div>

            <div className="text-base-content/50 text-xs">Followers</div>
          </div>
        </div>

        <div className="divider my-0 w-full"></div>

        <div className="mt-2 w-full space-y-3 text-left">
          <div className="text-base-content/70 flex items-center gap-2 text-sm">
            <LocationIcon className="text-base-content/70" />
            <span>{user.location ?? "No Location"}</span>
          </div>
          <div className="text-base-content/70 flex items-center gap-2 text-sm">
            <LinkIcon className="text-base-content/70" />
            <span>{user.website?.trim() || "No Website"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideProfileCard;
