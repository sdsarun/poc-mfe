import { rootRoute } from "@/routes/root";
import { createRoute } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";
import { useShellCounterStore } from "@shell_mfe/store";
import { Button } from "@/components/remote-expose";

export const shellRoute = createRoute({
  path: "/shell",
  getParentRoute: () => rootRoute,
  component: HomePage
});

function HomePage() {
  const counterStore = useShellCounterStore();

  useEffect(() => {
    counterStore.loadCount();
  }, []);

  return (
    <div>
      <h1>Shell counter: {counterStore.count}</h1>
      {counterStore.isLoading && <p>Loading count...</p>}
      {counterStore.error && <p>Error: {counterStore.error}</p>}
      <Button onClick={() => counterStore.increment()}>Increment</Button>
      <Button onClick={() => counterStore.decrement()}>Decrement</Button>
      <Button onClick={() => counterStore.loadCount()}>Load from async task</Button>
    </div>
  );
}
