import React from "react";

type PageContentProps = React.PropsWithChildren;

const PageContent = ({ children }: PageContentProps) => {
  return <main className="w-full h-full flex-1 overflow-auto">{children}</main>;
};

export default PageContent;
