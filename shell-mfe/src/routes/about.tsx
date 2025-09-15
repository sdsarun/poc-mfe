import Button from "@/components/button/button";
import useI18n from "@/i18n/useI18n";
import { rootRoute } from "@/routes/root";
import { createRoute, useNavigate } from "@tanstack/react-router";

export const aboutRoute = createRoute({
  path: "/about",
  getParentRoute: () => rootRoute,
  component: AboutPage
});

function AboutPage() {
  const { t, manager } = useI18n("welcome");
  const navigate = useNavigate();

  return (
    <div>
      <h1>About Page</h1>
      <p>{t("title")}</p>
      <Button onClick={() => navigate({ to: "/" })}>Back to Home</Button>
      <Button onClick={() => manager.switchLanguage()}>{t("changeLanguageButtonLabel")}</Button>
    </div>
  );
}
