import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const HomeApp = lazy(() => import("@home_mfe/app"));

export const homeRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: HomePage
});

function HomePage() {
  return (
    <Suspense fallback={"Loading..."}>
      <HomeApp />
    </Suspense>
  );
}
