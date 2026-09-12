import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginRequest } from "../api/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: () => {
      toast.success("Login successful!", {
        className:
          "!bg-white/90 dark:!bg-black/80 backdrop-blur-3xl border border-black/20 dark:border-white/20 rounded-xl !text-black dark:!text-white text-[14px] px-4 py-3",
      });
    },
    onError: () => {
      toast.error("Invalid email or password", {
        className:
          "!bg-white/90 dark:!bg-black/80 backdrop-blur-3xl border border-black/20 dark:border-white/20 rounded-xl !text-black dark:!text-white text-[14px] px-4 py-3",
      });
    },
  });
};
