import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checkAuthStatus, logoutUser } from "~/services/backendServices/authService";

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: username, isLoading } = useQuery({
    queryKey: ["authStatus"],
    queryFn: checkAuthStatus,
  });

  const { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authStatus"] });
    },
  });

  return { username, logout, isLoading };
}
