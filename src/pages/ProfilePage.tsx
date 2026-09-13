import { useState } from "react";
import { useParams } from "react-router-dom";

import { HeartIcon, PostIcon } from "../assets/icons";

import PostCard from "../components/cards/PostCard";
import RecommendedUserCard from "../components/cards/RecommendedUserCard";
import UserProfileCard from "../components/cards/UserProfileCard";
import EditProfileModal from "../components/modals/EditProfileModal";
import Container from "../components/ui/Container";

import { useFollowUser } from "../hooks/useFollowUser";
import { useUserLikes } from "../hooks/useLike";
import { useUserPosts } from "../hooks/usePost";
import { useSession } from "../hooks/useSession";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useUserProfile } from "../hooks/useUserProfile";

import type { Post } from "../types/post.types";
import {
  PostCardSkeleton,
  UserProfileCardSkeleton,
  PostsLikesTabsSkeleton,
} from "../components/ui/Skeleton";
import FollowListModal from "../components/modals/FollowListModal";
import { useFollowers } from "../hooks/useFollowers";
import { useFollowing } from "../hooks/useFollowing";

function Profile() {
  const { id } = useParams();

  const [showEditModal, setShowEditModal] = useState(false);
  const [section, setSection] = useState<"posts" | "likes">("posts");
  const [followList, setFollowList] = useState<
    "followers" | "following" | null
  >(null);

  const { data: session } = useSession();

  const currentUserId = session?.data?.user?.id;
  const isCurrentUser = id === currentUserId;

  const { data: user, isLoading, error } = useUserProfile(id ?? "");

  const {
    data: posts,
    isLoading: isPostsLoading,
    error: postsError,
  } = useUserPosts(id ?? "");

  const {
    data: likes,
    isLoading: isLikesLoading,
    error: likesError,
  } = useUserLikes(id ?? "");

  const updateProfileMutation = useUpdateProfile(id ?? "");
  const followMutation = useFollowUser(id ?? "");

  if (error) {
    return (
      <Container>
        <p>Failed to load profile.</p>
      </Container>
    );
  }

  const { data: followers = [], isLoading: isFollowersLoading } = useFollowers(
    id ?? "",
  );

  const { data: following = [], isLoading: isFollowingLoading } = useFollowing(
    id ?? "",
  );
  console.log("FOLLOWING:", following);

  return (
    <Container>
      <div className="col-span-5 flex flex-col gap-6 md:col-span-3">
        {isLoading || !user ? (
          <UserProfileCardSkeleton />
        ) : (
          <UserProfileCard
            user={user}
            isCurrentUser={isCurrentUser}
            isFollowing={user.followers?.some(
              (f: { followerId: string }) => f.followerId === currentUserId,
            )}
            isFollowLoading={followMutation.isPending}
            onEditClick={() => setShowEditModal(true)}
            onFollowClick={() => followMutation.mutate()}
            onFollowersClick={() => setFollowList("followers")}
            onFollowingClick={() => setFollowList("following")}
          />
        )}

        {isLoading ? (
          <PostsLikesTabsSkeleton />
        ) : (
          <div className="border-base-300 flex gap-4 border-b px-6">
            <button
              onClick={() => setSection("posts")}
              className={`text-base-content-secondary flex items-center gap-2 border-b-2 pb-3 ${
                section === "posts"
                  ? "text-base-content border-white"
                  : "text-base-content-secondary border-transparent"
              }`}
            >
              <PostIcon />
              Posts
            </button>

            <button
              onClick={() => setSection("likes")}
              className={`text-base-content-secondary -mb-px flex items-center gap-2 border-b-2 pb-3 ${
                section === "likes"
                  ? "text-base-content border-white"
                  : "text-base-content-secondary border-transparent"
              }`}
            >
              <HeartIcon />
              Likes
            </button>
          </div>
        )}

        {section === "posts" && (
          <div className="flex flex-col gap-4">
            {isPostsLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}

            {postsError && <p>Failed to load posts.</p>}

            {!isPostsLoading && !postsError && posts?.length === 0 && (
              <p>No posts yet.</p>
            )}

            {!isPostsLoading &&
              !postsError &&
              posts?.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        )}

        {section === "likes" && (
          <div className="flex flex-col gap-4">
            {isLikesLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))}

            {likesError && <p>Failed to load liked posts.</p>}

            {!isLikesLoading && !likesError && likes?.length === 0 && (
              <p>No liked posts yet.</p>
            )}

            {!isLikesLoading &&
              !likesError &&
              likes?.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        )}
      </div>

      {session && (
        <div className="hidden md:col-span-2 md:flex md:flex-col md:gap-6">
          <RecommendedUserCard />
        </div>
      )}

      {showEditModal && user && (
        <EditProfileModal
          user={user}
          isSaving={updateProfileMutation.isPending}
          onClose={() => setShowEditModal(false)}
          onSave={(data) => {
            updateProfileMutation.mutate(data, {
              onSuccess: () => setShowEditModal(false),
            });
          }}
        />
      )}
      {followList === "followers" && (
        <FollowListModal
          title="Followers"
          users={followers.map((item: { follower: any }) => item.follower)}
          isLoading={isFollowersLoading}
          onClose={() => setFollowList(null)}
        />
      )}

      {followList === "following" && (
        <FollowListModal
          title="Following"
          users={following.map((item: { following: any }) => item.following)}
          isLoading={isFollowingLoading}
          onClose={() => setFollowList(null)}
        />
      )}
    </Container>
  );
}

export default Profile;
