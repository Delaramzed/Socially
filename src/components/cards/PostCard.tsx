import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChatIcon, HeartIcon, SendIcon, TrashIcon } from "../../assets/icons";

import {
  useCreateComment,
  useDeleteComment,
  useDeletePost,
  useToggleLikePost,
  useEditPost,
  useEditComment,
} from "../../hooks/usePost";

import { useSession } from "../../hooks/useSession";
import type { PostCardProps } from "../../types/post.types";
import { formatTimeAgo } from "../../utils/formatTimeAgo";

import Button from "../ui/Button";

import { getImageUrl } from "../../lib/getImageUrl";

import DeleteCommentModal from "../modals/DeleteCommentModal";
import DeletePostModal from "../modals/DeletePostModal";

function PostCard({ post }: PostCardProps) {
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const [postImageError, setPostImageError] = useState(false);

  const navigate = useNavigate();

  const postImageUrl = getImageUrl(post.image);

  const { data: session } = useSession();

  const currentUser = session?.data?.user;

  const currentUserId = currentUser?.id;
  const currentUserEmail = currentUser?.email;

  const { mutate: toggleLike, isPending: isLikePending } =
    useToggleLikePost(currentUserId);

  const { mutate: createComment, isPending: isCommentPending } =
    useCreateComment(currentUser);

  const { mutate: deletePost, isPending: isDeletePending } = useDeletePost();

  const { mutate: editPost, isPending: isEditPending } = useEditPost();

  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useDeleteComment();

  const isOwner = currentUserId === post.authorId;

  const isLiked = Boolean(
    currentUserId && post.likes?.some((like) => like.userId === currentUserId),
  );

  const isCommentDisabled = comment.trim().length < 5 || isCommentPending;

  const avatarLetter = post.author.name?.charAt(0).toUpperCase() || "U";

  function handleProfileNavigation() {
    navigate(`/profile/${post.authorId}`);
  }

  function handleLike() {
    toggleLike(post.id);
  }

  function handleComment() {
    const trimmedComment = comment.trim();

    if (!trimmedComment) return;

    createComment(
      {
        postId: post.id,
        content: trimmedComment,
      },
      {
        onSuccess: () => {
          setComment("");
        },
      },
    );
  }

  function handleDeletePost() {
    if (!isOwner) return;

    deletePost(post.id, {
      onSuccess: () => {
        setShowDeletePostModal(false);
      },
    });
  }

  function handleDeleteComment() {
    if (!commentToDelete) return;

    const commentId = commentToDelete;
    setCommentToDelete(null);

    deleteComment({
      postId: post.id,
      commentId,
    });
  }

  function handleEditPost() {
    setIsEditingPost(true);
  }

  function handleSaveEdit() {
    const trimmedContent = editedContent.trim();

    if (!trimmedContent) return;

    editPost(
      {
        postId: post.id,
        content: trimmedContent,
      },
      {
        onSuccess: () => {
          setIsEditingPost(false);
        },
      },
    );
  }

  return (
    <>
      <article className="border-base-300 bg-base-100 w-[550px] max-w-full rounded-xl border p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <button
            type="button"
            onClick={handleProfileNavigation}
            className="shrink-0 cursor-pointer"
            aria-label={`View ${post.author.name}'s profile`}
          >
            {post.author.image && !postImageError ? (
              <img
                src={post.author.image}
                alt={post.author.name}
                onError={() => setPostImageError(true)}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="bg-primary text-primary-content flex h-10 w-10 items-center justify-center rounded-full text-lg">
                {avatarLetter}
              </div>
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                onClick={handleProfileNavigation}
                className="text-base-content shrink-0 cursor-pointer text-base font-semibold"
              >
                {post.author.name}
              </button>

              <span className="text-base-content/50 truncate text-xs">
                {post.author.email}
              </span>

              <span className="text-base-content/50 mx-1 shrink-0 text-xs">
                •
              </span>

              <span className="text-base-content/50 shrink-0 text-xs">
                {formatTimeAgo(post.createdAt)}
              </span>
            </div>

            {isEditingPost ? (
              <div className="mt-2">
                <textarea
                  value={editedContent}
                  onChange={(event) => setEditedContent(event.target.value)}
                  className="border-base-300 text-base-content w-full resize-none rounded-md border bg-transparent p-3 text-sm outline-none focus:outline-none"
                  rows={3}
                />

                <div className="mt-2 flex justify-end gap-2">
                  <Button
                    onClick={() => {
                      setIsEditingPost(false);
                      setEditedContent(post.content);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={handleSaveEdit}
                    loading={isEditPending}
                    disabled={!editedContent.trim() || isEditPending}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-base-content mt-1 text-sm break-words">
                {post.content}
              </p>
            )}

            {postImageUrl && (
              <img
                src={postImageUrl}
                alt="Post attachment"
                className="mt-3 max-h-96 w-full rounded-lg object-cover"
              />
            )}
          </div>

          {isOwner && (
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={handleEditPost}
                className="text-base-content/60 hover:text-primary cursor-pointer"
                aria-label="Edit post"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => setShowDeletePostModal(true)}
                className="text-base-content/60 hover:text-error cursor-pointer"
                aria-label="Delete post"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <div className="mt-4 flex h-8 items-center gap-4">
          {/* Like */}
          <button
            type="button"
            onClick={handleLike}
            disabled={isLikePending}
            className={`flex h-8 items-center gap-2 rounded-md px-2 disabled:opacity-50 ${
              isLikePending ? "" : "cursor-pointer"
            } ${
              isLiked
                ? "bg-base-300 text-error"
                : "text-base-content hover:bg-base-300"
            }`}
            aria-label={isLiked ? "Unlike post" : "Like post"}
          >
            <HeartIcon
              className={`h-4 w-4 ${
                isLiked
                  ? "[&_path]:fill-current [&_path]:stroke-current"
                  : "[&_path]:fill-none [&_path]:stroke-current"
              }`}
            />

            <span className="text-sm">{post._count.likes}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowComments((current) => !current)}
            className={`flex h-8 cursor-pointer items-center gap-2 rounded-md px-2 ${
              showComments
                ? "bg-base-300 text-primary"
                : "text-base-content hover:bg-base-300"
            }`}
            aria-label="Toggle comments"
            aria-expanded={showComments}
          >
            <ChatIcon
              className={`h-4 w-4 ${
                showComments
                  ? "[&_path]:fill-current [&_path]:stroke-current"
                  : "[&_path]:fill-none [&_path]:stroke-current"
              }`}
            />

            <span className="text-sm">{post._count.comments}</span>
          </button>
        </div>

        {showComments && (
          <div className="border-base-300 mt-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              {!post.comments || post.comments.length === 0 ? (
                <p className="text-base-content/50 text-sm">No comments yet.</p>
              ) : (
                post.comments.map((postComment) => (
                  <CommentItem
                    key={postComment.id}
                    comment={postComment}
                    postId={post.id}
                    currentUserId={currentUserId}
                    currentUserEmail={currentUserEmail}
                    onNavigate={
                      postComment.author?.id
                        ? () => navigate(`/profile/${postComment.author.id}`)
                        : undefined
                    }
                    onDelete={(commentId) => setCommentToDelete(commentId)}
                  />
                ))
              )}
            </div>

            {session && (
              <div className="border-base-300 mt-4 border-t pt-4">
                <div className="flex h-25 w-full items-start gap-4">
                  <div className="bg-primary text-primary-content flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg">
                    {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Write a comment..."
                    className="border-base-300 text-base-content placeholder:text-base-content/50 h-25 min-w-0 flex-1 resize-none rounded-md border bg-transparent p-3 text-sm outline-none focus:outline-none"
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    icon={<SendIcon />}
                    disabled={isCommentDisabled}
                    loading={isCommentPending}
                    onClick={handleComment}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </article>

      {showDeletePostModal && (
        <DeletePostModal
          isPending={isDeletePending}
          onCancel={() => setShowDeletePostModal(false)}
          onDelete={handleDeletePost}
        />
      )}

      {commentToDelete && (
        <DeleteCommentModal
          isPending={isDeleteCommentPending}
          onCancel={() => setCommentToDelete(null)}
          onDelete={handleDeleteComment}
        />
      )}
    </>
  );
}

type CommentItemProps = {
  comment: PostCardProps["post"]["comments"][number];
  postId: string;
  currentUserId?: string;
  currentUserEmail?: string;
  onNavigate?: () => void;
  onDelete: (commentId: string) => void;
};

function CommentItem({
  comment,
  postId,
  currentUserId,
  currentUserEmail,
  onNavigate,
  onDelete,
}: CommentItemProps) {
  const [imageError, setImageError] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [editedCommentContent, setEditedCommentContent] = useState(
    comment.content,
  );

  const { mutate: editComment, isPending: isEditCommentPending } =
    useEditComment();
  const author = comment.author ?? {
    id: "",
    name: "Unknown user",
    email: "",
    image: null,
  };

  const avatarLetter = author.name?.charAt(0).toUpperCase() || "U";

  const isCommentOwner =
    author.id === currentUserId || author.email === currentUserEmail;
  const isTemporaryComment = comment.id.startsWith("temp-");

  function handleSaveEditComment() {
    const trimmedContent = editedCommentContent.trim();

    if (!trimmedContent) return;

    editComment(
      {
        postId,
        commentId: comment.id,
        content: trimmedContent,
      },
      {
        onSuccess: () => {
          setIsEditingComment(false);
        },
      },
    );
  }

  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        onClick={onNavigate}
        disabled={!onNavigate}
        className="shrink-0 enabled:cursor-pointer"
        aria-label={`View ${author.name}'s profile`}
      >
        {author.image && !imageError ? (
          <img
            src={author.image}
            alt={author.name}
            onError={() => setImageError(true)}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="bg-primary text-primary-content flex h-8 w-8 items-center justify-center rounded-full text-sm">
            {avatarLetter}
          </div>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onNavigate}
            disabled={!onNavigate}
            className="text-base-content shrink-0 text-sm font-semibold enabled:cursor-pointer"
          >
            {author.name}
          </button>

          <span className="text-base-content/50 truncate text-xs">
            {author.email}
          </span>

          <span className="text-base-content/50 mx-1 shrink-0 text-xs">•</span>

          <span className="text-base-content/50 shrink-0 text-xs">
            {formatTimeAgo(comment.createdAt)}
          </span>
        </div>

        {isEditingComment ? (
          <div className="mt-2">
            <textarea
              value={editedCommentContent}
              onChange={(e) => setEditedCommentContent(e.target.value)}
              className="border-base-300 text-base-content w-full resize-none rounded-md border bg-transparent p-2 text-sm outline-none"
              rows={2}
            />

            <div className="mt-2 flex justify-end gap-2">
              <Button
                onClick={() => {
                  setIsEditingComment(false);
                  setEditedCommentContent(comment.content);
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSaveEditComment}
                loading={isEditCommentPending}
                disabled={!editedCommentContent.trim() || isEditCommentPending}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-base-content/80 mt-1 text-sm break-words">
            {comment.content}
          </p>
        )}
      </div>

      {isCommentOwner && !isTemporaryComment && (
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setIsEditingComment(true)}
            className="text-base-content/50 hover:text-primary rounded-md px-2 text-xs"
            aria-label="Edit comment"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(comment.id)}
            className="text-base-content/50 hover:text-error flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
            aria-label="Delete comment"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default PostCard;
