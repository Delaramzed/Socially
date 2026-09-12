import { useQuery } from "@tanstack/react-query";
import { getSessionRequest } from "../api/authApi";

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSessionRequest,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
