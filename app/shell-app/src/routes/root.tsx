import "../global.css";
import "../i18n/i18n";

import { createRootRoute, Link, Navigate, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { PrimeReactProvider } from "primereact/api";

export const rootRoute = createRootRoute({
  component: () => (
    <PrimeReactProvider>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <TanStackRouterDevtools />
      <Outlet />
    </PrimeReactProvider>
  )
});
