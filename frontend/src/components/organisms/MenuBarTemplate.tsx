import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomMenu from "components/atoms/CustomMenu";
import UserForm from "components/atoms/Users/UserForm";
import {
  Button,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Icon,
  Text,
  useDisclosure,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const email = Cookies.get("email");
  const history = useHistory();
  const [manager, setManager] = useState();
  const fetchUserData = async (customerEmail: string) => {
    const url = `${process.env.REACT_APP_SERVER}users/getUserByEmail/${customerEmail}`;
    const result = await axios.get(url, { withCredentials: true });
    setManager(result.data);
  };
  useEffect(() => {
    if (email) {
      fetchUserData(email);
    }
  }, []);
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    const logoutBackEnd = async () => {
      Cookies.remove("email");
      Cookies.remove("position");
      await axios.post(`${process.env.REACT_APP_SERVER}users/logout`, email, {
        withCredentials: true,
      });
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
          <MenuItem>
            <Box onClick={onOpen}>Profile</Box>
          </MenuItem>

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm
              type="manager"
              user={manager}
              closeModal={onClose}
              containPassword
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
export default MenuBarTemplate;
