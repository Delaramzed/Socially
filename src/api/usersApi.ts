import api from "../lib/axios";
import type { user } from "../types/user.types";

export const getUserProfile = async (id: string) => {
  const response = await api.get(`/api/users/${id}`, {
    params: { _t: Date.now() },
  });
  return response.data.data;
};

export const getUserProfileByUsername = async (username: string) => {
  const response = await api.get(`/api/users/${username}/profile`, {
    params: { _t: Date.now() },
  });
  return response.data;
};

export const followUnfollowUser = async (id: string) => {
  const response = await api.patch(`/api/users/${id}`);
  return response.data;
};

export const updateUserProfile = async (id: string, data: Partial<user>) => {
  const response = await api.put(`/api/users/${id}`, data);
  return response.data;
};

export const searchUsers = async (search: string) => {
  const response = await api.get(`/api/users/search?q=${search}`);

  return response.data.data;
};
export const getFollowers = async (id: string) => {
  const response = await api.get(`/api/users/${id}/followers`);
  return response.data.data;
};

export const getFollowing = async (id: string) => {
  const response = await api.get(`/api/users/${id}/following`);
  return response.data.data;
};
