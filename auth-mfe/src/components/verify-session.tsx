import { useAuth } from "@/services/auth";
import React, { useEffect } from "react";

type VerifySesssionProps = React.PropsWithChildren<{
  onLoading?: (isLoading: boolean) => void;
  onUnAuthenticated?: () => void;
  onAuthenticated?: () => void;
  onError?: () => void;
}>;

const VerifySesssion = ({
  children,
  onLoading,
  onAuthenticated,
  onUnAuthenticated,
  onError
}: VerifySesssionProps) => {
  const { isAuthenticated, isLoading, isError } = useAuth();

  useEffect(() => {
    onLoading?.(isLoading);
    return () => {
      onLoading?.(false);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isError) {
      onError?.();
      return;
    }

    isAuthenticated ? onAuthenticated?.() : onUnAuthenticated?.();
  }, [isAuthenticated, isLoading, isError, onAuthenticated, onUnAuthenticated]);

  return children;
};

export default VerifySesssion;
