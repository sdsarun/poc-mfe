import { useInstanceTranslation } from "@shell_mfe/i18n";

const useI18n = useInstanceTranslation("shell_mfe", {
  en: {
    welcome: {
      title: "Welcome Naja",
      changeLanguageButtonLabel: "React Remote : change language"
    },
    nav: {
      appName: "MyApp Shell",
      home: "Home",
      profile: "Profile",
      settings: "Settings",
      signOut: "Sign out",
    }
  },
  th: {
    welcome: {
      title: "ยินดีต้อนรับ นะจ๊ะ",
      changeLanguageButtonLabel: "React Remote : Thai change language"
    },
    nav: {
      appName: "แอพของฉัน Shell",
      home: "หน้าหลัก",
      profile: "โปรไฟล์",
      settings: "การตั้งค่า",
      signOut: "ออกจากระบบ"
    }
  }
});

export default useI18n;
