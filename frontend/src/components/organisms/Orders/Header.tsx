import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { Input, Box, useDisclosure, Flex, Button } from "@chakra-ui/react";
import Cookies from "js-cookie";

export type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];

type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header: React.FC<Props> = ({ handleSearch }) => {
  const position = Cookies.get("position");
  return (
    <Flex justify="space-between" w="100%">
      <Input
        className="header-input"
        placeholder="Type Order Id or Customer Name"
        onChange={handleSearch}
        w="33%"
        bgColor="white"
      />
      {position !== undefined && parseInt(position, 10) === 3 ? (
        <Box />
      ) : (
        <Button bgColor="#3399ff" color="white">
          <Link to="/orders/new"> Create Order </Link>
        </Button>
      )}
    </Flex>
  );
};
export default Header;
