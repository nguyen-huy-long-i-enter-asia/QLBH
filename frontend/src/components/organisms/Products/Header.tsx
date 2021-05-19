import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Input, Box, useDisclosure, Flex } from "@chakra-ui/react";
import ProductForm from "components/atoms/Products/ProductForm";

export type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];

type Props = {
  categoriesList: CategoriesList;
  manufacturersList: {
    id: number;
    name: string;
  }[];
  productStatesList: {
    id: string;
    name: string;
  }[];
  position: string | undefined;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header: React.FC<Props> = ({
  categoriesList,
  manufacturersList,
  productStatesList,
  position,
  handleSearch,
}) => {
  return (
    <Flex justify="space-between" w="100%">
      <Input
        className="header-input"
        placeholder="Type name of Product"
        onChange={handleSearch}
        w="33%"
        bgColor="white"
      />
      {position === "1" ? (
        <Box>
          <ProductForm
            categoriesList={categoriesList}
            manufacturersList={manufacturersList}
            productStatesList={productStatesList}
            action="add"
          />
        </Box>
      ) : (
        <> </>
      )}
    </Flex>
  );
};
export default Header;
