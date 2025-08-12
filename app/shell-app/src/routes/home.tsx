import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { useCounter } from "@host/store";
import { Button } from "primereact/button";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage
});

export function HomePage() {
  const { count, increment, decrement } = useCounter();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <p>Count: {count}</p>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
    </div>
  );
}
