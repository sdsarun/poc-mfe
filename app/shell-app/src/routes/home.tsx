import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage
});

export function HomePage() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
