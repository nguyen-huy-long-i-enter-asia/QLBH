/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { css, SerializedStyles } from "@emotion/react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Select,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";

type Props = {
  searchResult: {
    id: string;
    name: string;
    original_price: number;
    image: string;
    count: number;
  }[];
  handleProductClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};
const SearchResultTemplate: React.FC<Props> = ({
  searchResult,
  handleProductClick,
}) => {
  return (
    <Box
      position="absolute"
      top="100%"
      zIndex="1"
      bgColor="white"
      border="1px solid gray"
    >
      {searchResult.map((item) => {
        return (
          <Flex key={item.id} id={item.id} onClick={handleProductClick}>
            <Box w="33.3%">
              <Image
                w="50%"
                src={`http://localhost:8765/img/${item.image}`}
                alt="Error"
              />
            </Box>
            <Box>
              <Box>{item.name}</Box>
              <Flex>
                <Box>{item.id}</Box>
                <Box>{`  Price: ${item.original_price}`}</Box>
              </Flex>
              <Box>{`Inventory: ${item.count}`}</Box>
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
};
export default SearchResultTemplate;
