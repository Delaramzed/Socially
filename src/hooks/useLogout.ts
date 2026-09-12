import { useMutation } from "@tanstack/react-query";
import { logoutRequest } from "../api/authApi";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutRequest,
  });
};
