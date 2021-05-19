import React, { ReactNode } from "react";
import Cookies from "js-cookie";
import MenuBarTemplate from "components/organisms/MenuBarTemplate";
import { Box } from "@chakra-ui/react";
import "layouts/layout.css";

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
    buttonLink: "/products",
  },
  {
    menuName: "Orders",
    buttonLink: "/orders",
  },
  {
    menuName: "Warehouse",
    childrenMenus: ["Manufacture", "Receipts Management"],
    links: {
      Manufacture: "/login",
      "Receipts Management": "/receipts",
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
    menuName: "Statistic",
    buttonLink: "/login",
  },
];
const staffMenuList = [
  {
    menuName: "OverView",

    buttonLink: "/login",
  },
  {
    menuName: "Product",
    buttonLink: "/products",
  },
  {
    menuName: "Orders",
    buttonLink: "/orders",
  },
  {
    menuName: "Warehouse",
    childrenMenus: ["Manufacture", "Receipts Management"],
    links: {
      Manufacture: "/login",
      "Receipts Management": "/receipts",
    },
  },
  {
    menuName: "Customer",
    buttonLink: "/login",
  },
];

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const position = Cookies.get("position");
  return (
    <>
      <Box className="body" w="100%">
        <Box bgColor="#3cc7bd" w="100%">
          <MenuBarTemplate
            menuList={position === "1" ? managerMenuList : staffMenuList}
            menuWidth="11.1%"
          />
        </Box>

        {children}
      </Box>
    </>
  );
};

export default MainLayout;
