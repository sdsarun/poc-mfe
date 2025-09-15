import { aboutRoute } from "@/routes/about";
import { homeRoute } from "@/routes/home";
import { rootRoute } from "@/routes/root";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

const router = createRouter({
  routeTree,
  notFoundMode: "root"
});

export default function Router() {
  return <RouterProvider router={router} />;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
