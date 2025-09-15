import "../styles.css";

import NotFound from "@/components/errors/not-found";
import PageContent from "@/components/layout/page-content";
import RootLayout from "@/components/layout/root";
import { LoadingFullscreenProvider } from "@/components/providers/loading-fullscreen";
import ReactQueryProvider from "@/components/providers/react-query";
import { Button } from "@/components/remote-expose";
import Sidebar from "@/components/sidebar/sidebar";
import Auth from "@/components/wrapper/auth";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@auth_mfe/services";

const Root = () => {
  return (
    <ReactQueryProvider>
      <LoadingFullscreenProvider>
        <Auth>
          <RootContent />
        </Auth>
      </LoadingFullscreenProvider>
    </ReactQueryProvider>
  );
};

const RootContent = () => {
  const { isAuthenticated } = useAuth();
  const [expanded, setExpanded] = useState<boolean>(() => {
    const stored = localStorage.getItem("sidebarExpanded");
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(expanded));
  }, [expanded]);

  return (
    <RootLayout>
      {isAuthenticated && <Sidebar expanded={expanded} setExpanded={setExpanded} />}
      <PageContent>
        <Outlet />
      </PageContent>
      {/* <TanStackRouterDevtools /> */}
    </RootLayout>
  );
};

export const rootRoute = createRootRoute({
  component: Root,
  onError: (error) => {
    console.error("ROOT ERROR:", error);
  },
  errorComponent: ({ error, reset, info }) => (
    <div>
      <h1>Error</h1>
      <p>{JSON.stringify(error)}</p>
      <p>{JSON.stringify(info)}</p>
      <Button onClick={reset}>Reset</Button>
    </div>
  ),
  notFoundComponent: NotFound
});
