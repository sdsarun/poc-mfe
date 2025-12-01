import "./styles.css";

import pic1 from "../public/assets/images/pic1.jpg";

import { Button } from "@shell_mfe/components";
import useI18n from "@/i18n/useI18n";
import { i18nService } from "@shell_mfe/i18n";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@auth_mfe/services";
import { useShellCounterStore } from "@shell_mfe/store";

function AppWrapper() {
  const { t } = useI18n("homepage");
  const navigate = useNavigate();

  const { user, isLoading, isAuthenticated } = useAuth();
  const shellCounterStore = useShellCounterStore();
  console.log("[LOG] - app.tsx:16 - AppWrapper - isAuthenticated:", isAuthenticated);

  return (
    <div className="p-4 flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <Button
        onClick={() => {
          i18nService.switchLanguage();
        }}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
      >
        {i18nService.getCurrentLanguage() === "en" ? "TH" : "EN"}
      </Button>
      <Button onClick={() => navigate({ to: "/about" })}>To about page</Button>
      <hr />
      <h1>Home got using shell counter {shellCounterStore.count}</h1>
      <Button onClick={() => shellCounterStore.increment()}>Increment</Button>
      <Button onClick={() => shellCounterStore.decrement()}>Decrement</Button>
      <Button onClick={() => shellCounterStore.loadCount()}>Load from async task</Button>
      <img src={pic1} width={200} height={200} />
    </div>
  );
}

export default function App() {
  try {
    const client = useQueryClient();
    console.log("OKAY", client.getDefaultOptions());
    return <AppWrapper />;
  } catch (error) {
    console.log("NOT OKAY");
    const [queryClient] = useState(() => new QueryClient());
    return (
      <QueryClientProvider client={queryClient}>
        <AppWrapper />
      </QueryClientProvider>
    );
  }
}
