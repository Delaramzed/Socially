import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/usersApi";

export const useSearchUsers = (search: string) => {
  return useQuery({
    queryKey: ["users", "search", search],
    queryFn: () => searchUsers(search),
    enabled: search.trim().length > 0,
  });
};