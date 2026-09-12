import api from "../lib/axios";

import type {
  CreateCommentResponse,
  CreatePostResponse,
  DeleteCommentParams,
  Post,
  PostsResponse,
} from "../types/post.types";

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await api.get<PostsResponse>("/api/posts");

  return response.data.data;
};

export const createPost = async ({
  content,
  image,
}: {
  content: string;
  image: string | null;
}) => {
  const response = await api.post<CreatePostResponse>("/api/posts", {
    content,
    ...(image ? { image } : {}),
  });

  return response.data.data;
};

export const deletePost = async (postId: string) => {
  const response = await api.delete(`/api/posts/${postId}`);

  return response.data;
};

export const toggleLikePost = async (postId: string) => {
  const response = await api.patch(`/api/posts/${postId}`);

  return response.data;
};

export const createComment = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) => {
  const response = await api.post<CreateCommentResponse>(
    `/api/posts/${postId}/comment`,
    {
      content,
    },
  );

  return response.data;
};

export const deleteComment = async ({
  postId,
  commentId,
}: DeleteCommentParams) => {
  const response = await api.delete(
    `/api/posts/${postId}/comment/${commentId}`,
  );

  return response.data;
};

export const editPost = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) => {
  const response = await api.put(`/api/posts/${postId}`, {
    content,
  });

  return response.data;
};

export const editComment = async ({
  postId,
  commentId,
  content,
}: {
  postId: string;
  commentId: string;
  content: string;
}) => {
  const response = await api.put(`/api/posts/${postId}/comment/${commentId}`, {
    content,
  });

  return response.data;
};
