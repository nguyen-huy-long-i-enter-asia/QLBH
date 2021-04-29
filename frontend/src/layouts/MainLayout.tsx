import React, { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

const MainLayout: React.FC<LayoutProps> = ({ children }) => (
  <div>{children}</div>
);

export default MainLayout;
