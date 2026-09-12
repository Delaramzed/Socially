import api from "../lib/axios";
import type { loginTypes, registerTypes } from "../types/authTypes";

export const loginRequest = (data: loginTypes) => {
  return api.post("api/authentication/login", data);
};

export const registerRequest = (data: registerTypes) => {
  return api.post("api/authentication/register", data);
};

export const getSessionRequest = async () => {
  const response = await api.get("api/authentication/session");
  return response.data;
};

export const logoutRequest = () => {
  return api.post("api/authentication/logout");
};
