import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/usersApi";

export const useUserProfile = (id: string) => {
  return useQuery({
    queryKey: ["Profile", id],
    queryFn: () => getUserProfile(id),
    enabled: !!id,
  });
};
