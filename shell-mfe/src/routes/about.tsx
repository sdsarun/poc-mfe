import Button from "@/components/button/button";
import useI18n from "@/i18n/useI18n";
import { rootRoute } from "@/routes/root";
import { i18nService } from "@shell_mfe/i18n";
import { createRoute, useNavigate } from "@tanstack/react-router";

export const aboutRoute = createRoute({
  path: "/about",
  getParentRoute: () => rootRoute,
  component: AboutPage
});

function AboutPage() {
  const { t } = useI18n("welcome");
  const navigate = useNavigate();

  const switchLanguage = () => {
    i18nService.switchLanguage();
  };

  return (
    <div>
      <h1>About Page</h1>
      <p>{t("title")}</p>
      <Button onClick={() => navigate({ to: "/" })}>Back to Home</Button>
      <Button onClick={() => switchLanguage()}>{t("changeLanguageButtonLabel")}</Button>
    </div>
  );
}
