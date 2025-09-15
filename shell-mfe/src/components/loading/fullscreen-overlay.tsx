import React, { useEffect, useState } from "react";

type LoadingFullscreenOverlayProps = {
  isLoading?: boolean;
};

const LoadingFullscreenOverlay = ({ isLoading = false }: LoadingFullscreenOverlayProps) => {
  const [show, setShow] = useState(isLoading);

  // Smooth fade out effect
  useEffect(() => {
    if (isLoading) setShow(true);
    else {
      const timeout = setTimeout(() => setShow(false), 300); // Match transition duration
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin" />
        {/* Optional loading text */}
        <span className="text-white text-lg font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default React.memo(LoadingFullscreenOverlay);
