import React from "react";
import { useHistory } from "react-router-dom";
import CustomMenu from "components/atoms/CustomMenu";
import { Button, Box, Flex, Image } from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios from "axios";

const MenuBarTemplate: React.FC = () => {
  const history = useHistory();
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    const logoutBackEnd = async () => {
      const email = Cookies.get("email");
      Cookies.remove("email");
      Cookies.remove("position");
      await axios.post(`${process.env.REACT_APP_SERVER}users/logout`, email);
      history.push("/login");
    };
    logoutBackEnd();
  };
  return (
    <Flex w="80%" m="auto" justify="space-around">
      <Image
        src={`${process.env.PUBLIC_URL}/page-logo.png`}
        boxSize="4rem"
        display="block"
      />
    </Flex>
  );
};
export default MenuBarTemplate;
