import React, { ReactNode } from "react";
import Cookies from "js-cookie";
import MenuBarTemplate from "components/organisms/MenuBarTemplate";
import { Box, Center, Flex } from "@chakra-ui/react";
import imageBg from "assets/images/clark-street-mercantile-P3pI6xzovu0-unsplash.jpg";

// const imageBg = require("assets/images/clark-street-mercantile-P3pI6xzovu0-unsplash.jpg");

type LayoutProps = {
  children?: ReactNode;
};

const LoginLayout: React.FC<LayoutProps> = ({ children }) => {
  const position = Cookies.get("position");
  const url = `url(${imageBg})`;
  return (
    <Center
      w="100%"
      h="100vh"
      backgroundRepeat="no-repeat"
      backgroundImage={url}
      bgSize="cover"
    >
      {children}
    </Center>
  );
};

export default LoginLayout;
