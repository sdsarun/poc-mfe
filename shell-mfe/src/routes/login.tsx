import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const LoginApp = lazy(() => import("@auth_mfe/app"));

export const loginRoute = createRoute({
  path: "/login",
  getParentRoute: () => rootRoute,
  component: HomePage,
});

function HomePage() {
  return (
    <Suspense fallback={"Loading..."}>
      <LoginApp />
    </Suspense>
  );
}
