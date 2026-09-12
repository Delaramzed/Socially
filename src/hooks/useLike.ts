import { useQuery } from "@tanstack/react-query";
import { getUserLikes } from "../api/socialApi";

export function useUserLikes(userId: string) {
  return useQuery({
    queryKey: ["likes", userId],
    queryFn: () => getUserLikes(userId),
    enabled: Boolean(userId),
  });
}