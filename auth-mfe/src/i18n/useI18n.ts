import { useInstanceTranslation } from "@shell_mfe/i18n";

const useI18n = useInstanceTranslation("auth_mfe", {
  en: {
    auth: {
      title: "HomePage MFE",
      buttonLabel: "Button From Shell",
      signin: "Sign In",
      signout: "Sign Out",
      loading: "Loading...",
      welcome: "Welcome, {{name}}",
      email: "Email"
    }
  },
  th: {
    auth: {
      title: "หน้าหลัก MFE",
      buttonLabel: "ปุ่มจาก Shell",
      signin: "เข้าสู่ระบบ",
      signout: "ออกจากระบบ",
      loading: "กำลังโหลด...",
      welcome: "ยินดีต้อนรับ, {{name}}",
      email: "อีเมล"
    }
  }
});

export default useI18n;
