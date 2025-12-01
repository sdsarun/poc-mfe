import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const AuthApp = lazy(() => import("@auth_mfe/app"));

export const authRoute = createRoute({
  path: "/auth",
  getParentRoute: () => rootRoute,
  component: HomePage
});

function HomePage() {
  return (
    <Suspense fallback={"Loading..."}>
      <AuthApp />
    </Suspense>
  );
}
