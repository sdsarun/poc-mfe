import React from "react";
import { VerifySesssion } from "@auth_mfe/components";
import { useLoadingFullscreen } from "@/components/providers/loading-fullscreen";
import { useNavigate } from "@tanstack/react-router";

type AuthProps = React.PropsWithChildren;

const Auth = ({ children }: AuthProps) => {
  const { showLoading, hideLoading } = useLoadingFullscreen();

  const navigate = useNavigate();

  return (
    <VerifySesssion
      onLoading={(isLoading: boolean) => {
        isLoading ? showLoading() : hideLoading();
      }}
      onAuthenticated={() => {
        console.log("AUTH");
      }}
      onUnAuthenticated={() => {
        console.log("UNAUTH");
        navigate({ to: "/login", replace: true });
      }}
      onError={() => {
        console.log("AUTH ERROR");
      }}
    >
      {children}
    </VerifySesssion>
  );
};

export default React.memo(Auth);
