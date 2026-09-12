import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUnfollowUser } from "../api/usersApi";

export const useFollowUser = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => followUnfollowUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Profile"] });
       queryClient.invalidateQueries({ queryKey: ["recommendedUsers"] });
    },
  });
};
