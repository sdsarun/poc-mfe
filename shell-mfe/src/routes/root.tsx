import "../styles.css";

import NotFound from "@/components/errors/not-found";
import PageContent from "@/components/layout/page-content";
import RootLayout from "@/components/layout/root";
import ReactQueryProvider from "@/components/providers/react-query";
import { Button } from "@/components/remote-expose";
import Sidebar from "@/components/sidebar/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const Root = () => {
  const [expanded, setExpanded] = useState<boolean>(() => {
    const stored = localStorage.getItem("sidebarExpanded");
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(expanded));
  }, [expanded]);

  return (
    <ReactQueryProvider>
      <RootLayout>
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
        <PageContent>
          <Outlet />
        </PageContent>
        {/* <TanStackRouterDevtools /> */}
      </RootLayout>
    </ReactQueryProvider>
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
