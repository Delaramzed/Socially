import api from "../lib/axios";
import type { user } from "../types";

export const getRecommendedUser = async (): Promise<user[]> => {
  const response = await api.get("/api/users/recommend");
  return response.data.data;
};

export const getUserPosts = async (userId: string) => {
  const res = await api.get(`/api/users/${userId}/posts`);

  return res.data.data;
};

export const getUserLikes = async (userId: string) => {
  const res = await api.get(`/api/users/${userId}/likes`);
  return res.data.data.map((like: any) => like.post);
};
