import { useCounter } from "@host/store";
import { createRoute } from "@tanstack/react-router";
import { Button } from "primereact/button";
import { rootRoute } from "./root";
import { useTranslation } from "react-i18next";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage
});

export function HomePage() {
  const { count, increment, decrement } = useCounter();
  const {
    t,
    i18n: { changeLanguage, languages }
  } = useTranslation("home");
  console.log("[LOG] - home.tsx:18 - HomePage - languages:", languages);

  return (
    <div className="p-2">
      <h3>{t("title")}</h3>
      <p>Count: {count}</p>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
      <Button onClick={() => changeLanguage("en")} link>
        EN
      </Button>
      <Button onClick={() => changeLanguage("th")} link>
        TH
      </Button>
    </div>
  );
}
