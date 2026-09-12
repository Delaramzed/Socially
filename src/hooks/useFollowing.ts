import { useQuery } from "@tanstack/react-query";
import { getFollowing } from "../api/usersApi";

export const useFollowing = (userId: string) => {
  return useQuery({
    queryKey: ["following", userId],
    queryFn: () => getFollowing(userId),
    enabled: !!userId,
  });
};
