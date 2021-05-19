import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { Input, Box, useDisclosure, Flex, Button } from "@chakra-ui/react";

export type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];

type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header: React.FC<Props> = ({ handleSearch }) => {
  return (
    <Flex justify="space-between" w="100%">
      <Input
        className="header-input"
        placeholder="Type name of Product"
        onChange={handleSearch}
        w="33%"
        bgColor="white"
      />

      <Button bgColor="#3399ff" color="white">
        <Link to="/receipts/add"> Import </Link>
      </Button>
    </Flex>
  );
};
export default Header;
