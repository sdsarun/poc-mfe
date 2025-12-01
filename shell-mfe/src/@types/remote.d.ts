// shell_mfe
declare module "@shell_mfe/i18n" {
  export const useInstanceTranslation: any;
  export const i18nService: any;
}

declare module "@shell_mfe/store" {
  export type ShellCounterState = import("@/store/use-shell-counter-store").ShellCounterState;
  export const useShellCounterStore: import("zustand").UseBoundStore<
    import("zustand").StoreApi<import("@/store/use-shell-counter-store").ShellCounterState>
  >;
}

// home_mfe
declare module "@home_mfe/app";

// auth_mfe
declare module "@auth_mfe/app";
declare module "@auth_mfe/services";
declare module "@auth_mfe/components";
