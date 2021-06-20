import React, { ReactNode } from "react";
import Cookies from "js-cookie";
import { Center } from "@chakra-ui/react";
import imageBg from "assets/images/shoe-background.jpg";

type LayoutProps = {
  children?: ReactNode;
};

const LoginLayout: React.FC<LayoutProps> = ({ children }) => {
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
