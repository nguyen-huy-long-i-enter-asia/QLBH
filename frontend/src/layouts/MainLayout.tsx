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
      Manufacture: "/manufacturers",
      "Receipts Management": "/receipts",
    },
  },
  {
    menuName: "Customer",
    buttonLink: "/customers",
  },
  {
    menuName: "Staff",
    buttonLink: "/login",
  },

  {
    menuName: "Statistic",
    childrenMenus: ["By Time Statistic", "By Product Statistic"],
    links: {
      "By Time Statistic": "/timeStatistic",
      "By Product Statistic": "/productStatistic",
    },
  },
];
const staffMenuList = [
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
    childrenMenus: ["Receipts Management"],
    links: {
      "Receipts Management": "/receipts",
    },
  },
  {
    menuName: "Customer",
    buttonLink: "/customers",
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
            menuWidth="13%"
          />
        </Box>

        {children}
      </Box>
    </>
  );
};

export default MainLayout;
