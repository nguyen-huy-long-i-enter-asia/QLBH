import React from "react";
import { useHistory } from "react-router-dom";
import CustomMenu from "components/atoms/CustomMenu";
import { Button, Box, Flex } from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios from "axios";

type Props = {
  menuList: {
    menuName: string;
    childrenMenus?: string[];
    links?: any;
    buttonLink?: string;
  }[];
  menuWidth: string;
};
const MenuBarTemplate: React.FC<Props> = ({ menuList, menuWidth }) => {
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
    <Flex w="80%" m="auto" justify="space-between">
      <Box>
        {menuList.map((menu) => (
          <CustomMenu
            key={menu.menuName}
            menuName={menu.menuName}
            childrenMenus={menu.childrenMenus}
            links={menu.links}
            buttonLink={menu.buttonLink ? menu.buttonLink : undefined}
            menuWidth={menuWidth}
          />
        ))}
      </Box>
      <Button
        onClick={handleLogout}
        bgColor="#3cc7bd"
        _hover={{ bg: "#3ca9c7" }}
      >
        Log Out
      </Button>
    </Flex>
  );
};
export default MenuBarTemplate;
