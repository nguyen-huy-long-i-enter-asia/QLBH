import React from "react";
import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  menuName: string;
  childrenMenus?: string[];
  links?: any;
  buttonLink?: string;
  menuWidth: string;
};

const CustomMenu: React.FC<Props> = ({
  menuName,
  childrenMenus,
  links,
  buttonLink,
  menuWidth,
}) => {
  return (
    <Menu>
      {buttonLink ? (
        <Button
          w={menuWidth}
          bgColor="#3cc7bd"
          _hover={{ bg: "#3ca9c7" }}
          border="0px"
        >
          <Link to={buttonLink}>{menuName}</Link>
        </Button>
      ) : (
        <MenuButton
          bgColor="#3cc7bd"
          as={Button}
          _hover={{ bg: "#3ca9c7" }}
          border="0px"
        >
          {menuName}
        </MenuButton>
      )}

      {childrenMenus ? (
        <MenuList>
          {childrenMenus.map((childMenu) => (
            <MenuItem key={childMenu}>
              <Link to={links[childMenu]}> {childMenu}</Link>
            </MenuItem>
          ))}
        </MenuList>
      ) : null}
    </Menu>
  );
};
export default CustomMenu;
