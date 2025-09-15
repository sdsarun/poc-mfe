import { useInstanceTranslation } from "@shell_mfe/i18n";

const useI18n = useInstanceTranslation("shell_mfe", {
  en: {
    welcome: {
      title: "Welcome Naja",
      changeLanguageButtonLabel: "React Remote : change language"
    },
    nav: {
      home: "Home",
      profile: "Profile",
      settings: "Settings"
    }
  },
  th: {
    welcome: {
      title: "ยินดีต้อนรับ นะจ๊ะ",
      changeLanguageButtonLabel: "React Remote : Thai change language"
    },
    nav: {
      home: "หน้าหลัก",
      profile: "โปรไฟล์",
      settings: "การตั้งค่า"
    }
  }
});

export default useI18n;
