import FullscreenOverlay from "@/components/loading/fullscreen-overlay";
import { createContext, type ReactNode, useContext, useState, useCallback } from "react";

type LoadingFullscreenContextType = {
  showLoading: () => void;
  hideLoading: () => void;
};

const LoadingFullscreenContext = createContext<LoadingFullscreenContextType | undefined>(undefined);

type LoadingFullscreenProviderProps = {
  children: ReactNode;
};

export const LoadingFullscreenProvider = ({ children }: LoadingFullscreenProviderProps) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoading = useCallback(() => {
    setLoadingCount((prev) => prev + 1);
  }, []);

  const hideLoading = useCallback(() => {
    setLoadingCount((prev) => Math.max(prev - 1, 0));
  }, []);

  const isLoading = loadingCount > 0;

  return (
    <LoadingFullscreenContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      <FullscreenOverlay isLoading={isLoading} />
    </LoadingFullscreenContext.Provider>
  );
};

export const useLoadingFullscreen = (): LoadingFullscreenContextType => {
  const context = useContext(LoadingFullscreenContext);
  if (!context) {
    throw new Error("useLoadingFullscreen must be used within a LoadingFullscreenProvider");
  }
  return context;
};
