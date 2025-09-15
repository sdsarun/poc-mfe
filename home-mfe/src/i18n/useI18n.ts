import { useInstanceTranslation } from "@shell_mfe/i18n";

const useI18n = useInstanceTranslation("home_mfe", {
  en: {
    homepage: {
      title: "HomePage",
      buttonLabel: "Button From Shell"
    }
  },
  th: {
    homepage: {
      title: "หน้าหลัก",
      buttonLabel: "ปุ่มจาก Shell"
    }
  }
});

export default useI18n;
