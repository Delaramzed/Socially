import { useQuery } from "@tanstack/react-query";
import { getRecommendedUser } from "../api/socialApi";

export const useRecommendedUser = () => {
  return useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUser,
  });
};
