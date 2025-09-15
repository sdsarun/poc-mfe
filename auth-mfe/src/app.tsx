import { useAuth } from "@/services/auth";
import "./styles.css";

import useI18n from "@/i18n/useI18n";
import { Button } from "@shell_mfe/components";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

function AppWrapper() {
  const { t, manager } = useI18n("auth");
  const { user, isLoading, isError, isAuthenticated, signin, signout } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <p>{t?.("loading") ?? "Loading..."}</p>;

  // Not authenticated -> show sign-in screen
  if (!isAuthenticated) {
    return (
      <div className="p-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{t?.("signin") ?? "Sign In"}</h1>
        <Button
          onClick={async () => {
            await signin();
            navigate({ to: "/" }); // redirect after login
          }}
        >
          {t?.("signin") ?? "Sign In"}
        </Button>
        <Button onClick={() => manager.switchLanguage()}>
          {manager.getCurrentLanguage() === "en" ? "TH" : "EN"}
        </Button>
      </div>
    );
  }

  // Authenticated (user may still be null if fetch failed)
  if (isError && !user) {
    return (
      <div className="p-4">
        <p>{t?.("error") ?? "Failed to load profile"}</p>
        <Button
          onClick={async () => {
            // try signing in again (or refetch)
            await signin();
            navigate({ to: "/" });
          }}
        >
          {t?.("retry") ?? "Retry"}
        </Button>
      </div>
    );
  }

  if (user) {
    return (
      <div className="p-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          {t?.("welcome", { name: user.name }) ?? `Welcome, ${user.name}`}
        </h1>
        <p>
          {t?.("email") ?? "Email"}: {user.email}
        </p>
        <Button
          onClick={async () => {
            await signout();
            navigate({ to: "/login" });
          }}
        >
          {t?.("signout") ?? "Sign Out"}
        </Button>
        <Button onClick={() => manager.switchLanguage()}>
          {manager.getCurrentLanguage() === "en" ? "TH" : "EN"}
        </Button>
      </div>
    );
  }

  return null;
}
let queryClient: QueryClient;

export default function App() {
  try {
    queryClient = useQueryClient();
    console.log("OKAY", queryClient.getDefaultOptions());
    return <AppWrapper />;
  } catch (error) {
    if (!queryClient) {
      queryClient = new QueryClient();
    }
    return (
      <QueryClientProvider client={queryClient}>
        <AppWrapper />
      </QueryClientProvider>
    );
  }
}
