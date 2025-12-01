// shell_auth
declare module "@shell_mfe/components";
declare module "@shell_mfe/styles";
declare module "@shell_mfe/i18n" {
  export const useInstanceTranslation: any;
  export const i18nService: any;
}

declare module "@shell_mfe/store" {
  export type ShellCounterState = {
    count: number;
    isLoading: boolean;
    error: string | null;
    increment: (by?: number) => void;
    decrement: (by?: number) => void;
    reset: () => void;
    loadCount: () => Promise<void>;
  };
  export const useShellCounterStore: import("zustand").UseBoundStore<
    import("zustand").StoreApi<ShellCounterState>
  >;
}

// auth_mfe
declare module "@auth_mfe/app";
declare module "@auth_mfe/services";
