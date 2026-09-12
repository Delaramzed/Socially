import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  toggleLikePost,
  editPost,
   editComment,
} from "../api/postApi";

import { getUserPosts } from "../api/socialApi";
import type { Post, PostComment } from "../types/post.types";

const COMMENT_RECONCILIATION_DELAYS = [1500, 1500, 2500];

function updatePostInCache(
  queryClient: ReturnType<typeof useQueryClient>,
  postId: string,
  updatePost: (post: Post) => Post,
) {
  queryClient.setQueriesData<Post[]>({ queryKey: ["posts"] }, (oldPosts) =>
    oldPosts?.map((post) => (post.id === postId ? updatePost(post) : post)),
  );
}

export function useAllPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
}

export function useUserPosts(userId: string) {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getUserPosts(userId),
    enabled: Boolean(userId),
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}
export function useEditPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
}
export function useEditComment(){
  const queryClient =useQueryClient ();

  return useMutation ({
    mutationFn : editComment, 
    onSuccess : () =>{
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    }
  })
}

export function useToggleLikePost(currentUserId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLikePost,

    onMutate: async (postId) => {
      if (!currentUserId) return;

      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousPosts = queryClient.getQueriesData<Post[]>({
        queryKey: ["posts"],
      });

      queryClient.setQueriesData<Post[]>(
        {
          queryKey: ["posts"],
        },
        (oldPosts) => {
          if (!oldPosts) return oldPosts;

          return oldPosts.map((post) => {
            if (post.id !== postId) {
              return post;
            }

            const isAlreadyLiked = post.likes.some(
              (like) => like.userId === currentUserId,
            );

            return {
              ...post,

              likes: isAlreadyLiked
                ? post.likes.filter((like) => like.userId !== currentUserId)
                : [...post.likes, { userId: currentUserId }],

              _count: {
                ...post._count,
                likes: isAlreadyLiked
                  ? Math.max(0, post._count.likes - 1)
                  : post._count.likes + 1,
              },
            };
          });
        },
      );

      return {
        previousPosts,
      };
    },

    onError: (_error, _postId, context) => {
      context?.previousPosts?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["likes"],
      });
    },
  });
}
export function useCreateComment(currentUser?: {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,

    onMutate: async ({ postId, content }) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousPosts = queryClient.getQueriesData<Post[]>({
        queryKey: ["posts"],
      });

      const previousCommentIds = [
        ...new Set(
          previousPosts.flatMap(([, posts]) =>
            (posts?.find((post) => post.id === postId)?.comments ?? []).map(
              (comment) => comment.id,
            ),
          ),
        ),
      ];

      const temporaryCommentId = `temp-${Date.now()}`;
      const optimisticCreatedAt = new Date().toISOString();
      const optimisticComment: PostComment | undefined = currentUser
        ? {
            id: temporaryCommentId,
            content,
            createdAt: optimisticCreatedAt,
            author: {
              id: currentUser.id,
              name: currentUser.name,
              email: currentUser.email,
              image: currentUser.image ?? null,
            },
          }
        : undefined;

      if (optimisticComment) {
        updatePostInCache(queryClient, postId, (post) => ({
          ...post,
          comments: [...(post.comments ?? []), optimisticComment],
          _count: {
            ...post._count,
            comments: post._count.comments + 1,
          },
        }));
      }

      return {
        previousPosts,
        temporaryCommentId: optimisticComment ? temporaryCommentId : undefined,
        optimisticCreatedAt,
        previousCommentIds,
      };
    },

    onSuccess: (_response, { postId, content }, context) => {
      const temporaryCommentId = context?.temporaryCommentId;

      if (!temporaryCommentId || !currentUser) return;

      void (async () => {
        for (const delay of COMMENT_RECONCILIATION_DELAYS) {
          await new Promise((resolve) => setTimeout(resolve, delay));

          try {
            const serverPosts = await getAllPosts();
            const serverPost = serverPosts.find((post) => post.id === postId);
            const serverComment = (serverPost?.comments ?? [])
              .filter(
                (comment) =>
                  !context.previousCommentIds.includes(comment.id) &&
                  comment.content === content &&
                  comment.author?.email === currentUser.email,
              )
              .sort(
                (first, second) =>
                  Math.abs(
                    new Date(first.createdAt).getTime() -
                      new Date(context.optimisticCreatedAt).getTime(),
                  ) -
                  Math.abs(
                    new Date(second.createdAt).getTime() -
                      new Date(context.optimisticCreatedAt).getTime(),
                  ),
              )[0];

            if (!serverComment) continue;

            const syncedComment: PostComment = {
              ...serverComment,
              author: {
                ...serverComment.author,
                id: serverComment.author?.id ?? currentUser.id,
              },
            };

            updatePostInCache(queryClient, postId, (post) => ({
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === temporaryCommentId ? syncedComment : comment,
              ),
            }));

            return;
          } catch {
            // A later attempt retries reconciliation with the server.
          }
        }

        void queryClient.invalidateQueries({ queryKey: ["posts"] });
      })();
    },

    onError: (_error, _variables, context) => {
      context?.previousPosts?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,

    onMutate: async ({ postId, commentId }) => {
      await queryClient.cancelQueries({
        queryKey: ["posts"],
      });

      const previousPosts = queryClient.getQueriesData<Post[]>({
        queryKey: ["posts"],
      });

      updatePostInCache(queryClient, postId, (post) => {
        const commentExists = (post.comments ?? []).some(
          (comment) => comment.id === commentId,
        );

        if (!commentExists) return post;

        return {
          ...post,
          comments: post.comments.filter((comment) => comment.id !== commentId),
          _count: {
            ...post._count,
            comments: Math.max(0, post._count.comments - 1),
          },
        };
      });

      return { previousPosts };
    },

    onError: (_error, _variables, context) => {
      context?.previousPosts?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
  });
}
