import React from "react";

type RootLayoutProps = React.PropsWithChildren;

const RootLayout = ({ children }: RootLayoutProps) => {
  return <div className={"h-dvh flex"}>{children}</div>;
};

export default React.memo(RootLayout);
