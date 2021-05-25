import React, { ReactNode } from "react";
import Cookies from "js-cookie";
import { Box } from "@chakra-ui/react";
import "layouts/layout.css";
import MenuBarContainer from "containers/Customer/MenuBarContainer";

type LayoutProps = {
  children?: ReactNode;
};

const CustomerLayout: React.FC<LayoutProps> = ({ children }) => {
  const position = Cookies.get("position");
  return (
    <>
      <Box className="body" w="100%">
        <Box bgColor="#3cc7bd" w="100%">
          <MenuBarContainer />
        </Box>

        {children}
      </Box>
    </>
  );
};

export default CustomerLayout;
