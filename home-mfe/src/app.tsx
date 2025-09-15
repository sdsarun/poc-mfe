import "./styles.css";

import { Button } from "@shell_mfe/components";
import useI18n from "@/i18n/useI18n";
import { i18nService } from "@shell_mfe/i18n";

function AppWrapper() {
  const { t } = useI18n("homepage");


  return (
    <div className="p-4 flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <Button
        onClick={() => {
          console.log("HELLO WORLD");
        }}
        className="mt-4"
      >
        {t("buttonLabel")}
      </Button>
      <Button
        onClick={() => {
          i18nService.switchLanguage();
        }}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
      >
        {i18nService.getCurrentLanguage() === "en" ? "TH" : "EN"}
      </Button>
    </div>
  );
}

export default function App() {
  return <AppWrapper />;
}
