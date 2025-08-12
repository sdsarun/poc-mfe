import { createRouter } from "@tanstack/react-router";
import { aboutRoute } from "./about";
import { homeRoute } from "./home";
import { rootRoute } from "../root";

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

const router = createRouter({
  routeTree,
  notFoundMode: "root"
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
