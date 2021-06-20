import React from "react";
import { useHistory } from "react-router-dom";
import CustomMenu from "components/atoms/CustomMenu";
import {
  Button,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
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
  const email = Cookies.get("email");
  const history = useHistory();
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    const logoutBackEnd = async () => {
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
      <Menu>
        <MenuButton>
          <Flex alignItems="center">
            <Icon as={FaUserCircle} color="white" boxSize="2rem" mr="1rem" />
            <Box>
              <Text>Hello </Text>
              <Text>{email}</Text>
            </Box>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem>View Profile</MenuItem>

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
export default MenuBarTemplate;
