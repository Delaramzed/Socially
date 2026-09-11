import { useEffect, useRef, useState } from "react";
import type { user } from "../../types/user.types";
import Button from "../ui/Button";
import { CalendarIcon, EditIcon } from "../../assets/icons";

type UserProfileCardProps = {
  user: user;
  isCurrentUser?: boolean;
  isFollowing?: boolean;
  isFollowLoading?: boolean;
  onEditClick?: () => void;
  onFollowClick?: () => void;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
};

function formatJoinDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function UserProfileCard({
  user,
  isCurrentUser = false,
  isFollowing = false,
  isFollowLoading = false,
  onEditClick,
  onFollowClick,
  onFollowersClick,
  onFollowingClick,
}: UserProfileCardProps) {
  const avatarLetter = user.name?.charAt(0).toUpperCase() || "U";

  const [localFollowing, setLocalFollowing] = useState(isFollowing);
  const followerCountRef = useRef(user._count?.followers ?? 0);

  useEffect(() => {
    const currentCount = user._count?.followers ?? 0;
    if (currentCount > followerCountRef.current) {
      setLocalFollowing(true);
    } else if (currentCount < followerCountRef.current) {
      setLocalFollowing(false);
    }
    followerCountRef.current = currentCount;
  }, [user._count?.followers]);

  return (
    <div className="border-base-300 bg-base-100 w-full max-w-2xl rounded-2xl border p-6">
      <div className="flex flex-col items-center text-center">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="bg-primary text-primary-content flex h-24 w-24 items-center justify-center rounded-full text-4xl font-semibold">
            {avatarLetter}
          </div>
        )}

        <h2 className="text-base-content mt-4 text-xl font-semibold">
          {user.name}
        </h2>
        <p className="text-base-content-secondary text-sm">{user.email}</p>

        <div className="mt-6 grid w-full grid-cols-3 gap-4">
          <button
            type="button"
            onClick={onFollowingClick}
            className="flex cursor-pointer flex-col items-center border-0 bg-transparent p-0"
          >
            <span className="text-base-content font-bold">
              {user._count?.followings ?? 0}
            </span>

            <span className="text-base-content-secondary text-sm">
              Following
            </span>
          </button>

          <button
            type="button"
            onClick={onFollowersClick}
            className="flex cursor-pointer flex-col items-center border-0 bg-transparent p-0"
          >
            <span className="text-base-content font-bold">
              {user._count?.followers ?? 0}
            </span>

            <span className="text-base-content-secondary text-sm">
              Followers
            </span>
          </button>

          <div className="flex flex-col items-center">
            <span className="text-base-content font-bold">
              {user._count?.posts ?? 0}
            </span>

            <span className="text-base-content-secondary text-sm">Posts</span>
          </div>
        </div>

        <div className="mt-6 w-full">
          {isCurrentUser ? (
            <Button
              variant="secondary"
              size="md"
              icon={<EditIcon className="h-4 w-4" />}
              onClick={onEditClick}
              className="w-full"
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              variant={localFollowing ? "secondary" : "primary"}
              size="md"
              onClick={onFollowClick}
              disabled={isFollowLoading}
              loading={isFollowLoading}
              className="w-full"
            >
              {localFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>

        {user.createdAt && (
          <div className="text-base-content-secondary mt-4 flex w-full items-center gap-2 text-sm">
            <CalendarIcon className="h-4 w-4" />
            <span>Joined {formatJoinDate(user.createdAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfileCard;
