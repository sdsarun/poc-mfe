import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export interface User {
  id: number;
  name: string;
  email: string;
}

// Mock API function
export const fetchUserProfile = async (): Promise<User> => {
  const token = Cookies.get("access_token");
  if (!token) throw new Error("Not authenticated");
  await new Promise((r) => setTimeout(r, 1300));
  return { id: 1, name: "John Doe", email: "john@example.com" };
};

export function useAuth() {
  const qc = useQueryClient();
  const isAuthenticated = Boolean(Cookies.get("access_token"));

  // query the user profile when token present
  const userQuery = useQuery<User, Error>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: isAuthenticated
  });

  // SIGNIN: mutationFn performs the side-effect, onSuccess updates cache
  const signinMutation = useMutation<User, Error, void>({
    mutationFn: async () => {
      // 1) set token synchronously
      Cookies.set("access_token", "mock_token", { expires: 1 });
      // 2) optionally fetch profile immediately and return it
      //    use fetchQuery so react-query dedupes properly
      return fetchUserProfile();
    },
    onSuccess: (data) => {
      // populate cache for queries that rely on this data
      qc.setQueryData(["userProfile"], data);
    },
    onError: (_err) => {
      // rollback token if profile fetch failed
      Cookies.remove("access_token");
    }
  });

  // SIGNOUT: mutation that clears cookie and clears cache
  const signoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      Cookies.remove("access_token");
      // cancel inflight user request then remove cached data
      await qc.cancelQueries({ queryKey: ["userProfile"] });
      qc.resetQueries({ queryKey: ["userProfile"] });
      qc.removeQueries({ queryKey: ["userProfile"] });
    }
  });

  return {
    user: userQuery.data ?? null,
    isLoading: userQuery.isLoading || signinMutation.isPending || signoutMutation.isPending,
    isError: userQuery.isError,
    isAuthenticated,
    signin: () => signinMutation.mutateAsync(),
    signout: () => signoutMutation.mutateAsync()
  };
}
