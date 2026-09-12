import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { registerRequest } from "../api/authApi";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      toast.success("Account created successfully!", {
        className:
          "!bg-white/90 dark:!bg-black/80 backdrop-blur-3xl border border-black/20 dark:border-white/20 rounded-xl !text-black dark:!text-white text-[14px] px-4 py-3",
      });
    },
    onError: () => {
      toast.error("ّFaild! try again.", {
        className:
          "!bg-white/90 dark:!bg-black/80 backdrop-blur-3xl border border-black/20 dark:border-white/20 rounded-xl !text-black dark:!text-white text-[14px] px-4 py-3",
      });
    },
  });
};
