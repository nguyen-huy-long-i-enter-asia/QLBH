import React, { ReactNode } from "react";
import Cookies from "js-cookie";
import MenuBarTemplate from "components/organisms/MenuBarTemplate";
import { Box } from "@chakra-ui/react";

type LayoutProps = {
  children?: ReactNode;
};
const managerMenuList = [
  {
    menuName: "OverView",

    buttonLink: "/login",
  },
  {
    menuName: "Product",
    buttonLink: "/login",
  },
  {
    menuName: "Transaction",
    buttonLink: "/login",
  },
  {
    menuName: "Warehouse",
    childrenMenus: ["Manufacture", "Import Management"],
    links: {
      Manufacture: "/login",
      "Import Management": "/login",
    },
  },
  {
    menuName: "Customer",
    buttonLink: "/login",
  },
  {
    menuName: "Staff",
    buttonLink: "/login",
  },
  {
    menuName: "History",
    buttonLink: "/login",
  },
  {
    menuName: "Statistic",
    buttonLink: "/login",
  },
  {
    menuName: "Sale",
    buttonLink: "/login",
  },
];
const staffMenuList = [
  {
    menuName: "OverView",

    buttonLink: "/login",
  },

  {
    menuName: "Transaction",
    buttonLink: "/login",
  },
  {
    menuName: "Warehouse",
    childrenMenus: ["Manufacture", "Import Management"],
    links: {
      Manufacture: "/login",
      "Import Management": "/login",
    },
  },
  {
    menuName: "Customer",
    buttonLink: "/login",
  },
  {
    menuName: "Staff",
    buttonLink: "/login",
  },
  {
    menuName: "History",
    buttonLink: "/login",
  },
  {
    menuName: "Sale",
    buttonLink: "/login",
  },
];

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const position = Cookies.get("position");
  return (
    <>
      <Box>
        <MenuBarTemplate
          menuList={position === "1" ? managerMenuList : staffMenuList}
          menuWidth="11.1%"
        />
      </Box>
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
