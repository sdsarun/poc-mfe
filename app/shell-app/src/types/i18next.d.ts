import "i18next";
import { defaultNS } from "../i18n/i18n";

import common from "locales/en/common.json";
import home from "locales/en/home.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: {
      common: typeof common;
      home: typeof home;
    };
  }
}
