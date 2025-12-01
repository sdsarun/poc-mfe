import Button from "@/components/button/button";
import useI18n from "@/i18n/useI18n";
import { i18nService } from "@shell_mfe/i18n";
import { Link } from "@tanstack/react-router";
import React from "react";
import { useAuth } from "@auth_mfe/services";

type SidebarProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ expanded, setExpanded }: SidebarProps) => {
  const { t } = useI18n("nav");
  const { signout } = useAuth();

  const navItems = [
    { label: t("home"), to: "/" },
    { label: t("profile"), to: "/about" },
    { label: t("settings"), to: "/settings" },
    { label: t("shell"), to: "/shell" }
  ];

  return (
    <aside
      className={`h-screen bg-gray-900 text-gray-100 flex flex-col transition-all duration-300
        ${expanded ? "w-64" : "w-20"}
      `}
    >
      {/* Header / Toggle */}
      <div
        className={`flex items-center p-4 border-b border-gray-800 relative
          ${expanded ? "justify-between" : "justify-center"}
        `}
      >
        {/* App name only visible when expanded */}
        {expanded && (
          <span className="text-lg font-bold tracking-wide transition-opacity duration-200">
            {t("appName")}
          </span>
        )}

        {/* Toggle button */}
        <Button
          onClick={() => setExpanded((prev) => !prev)}
          className={`p-2 rounded-lg hover:bg-gray-800 text-sm cursor-pointer z-20
            ${expanded ? "" : ""}  `}
        >
          {expanded ? "<<" : ">>"}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`
              flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium
              ${expanded ? "justify-start" : "justify-center"}
            `}
          >
            {expanded ? (
              <span className="ml-2">{item.label}</span>
            ) : (
              <span className="text-lg font-bold">{item.label.charAt(0)}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 flex flex-col items-center gap-2">
        {expanded && (
          <Button
            onClick={() => {
              i18nService.switchLanguage();
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
          >
            {i18nService.getCurrentLanguage() === "en" ? "TH" : "EN"}
          </Button>
        )}

        <Button
          onClick={signout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
        >
          {t("signOut")}
        </Button>

        <span
          className={`text-xs text-gray-400 transition-opacity duration-200 ${
            expanded ? "opacity-100" : "opacity-0"
          }`}
        >
          © 2025 MyApp
        </span>
      </div>
    </aside>
  );
};

export default React.memo(Sidebar);
