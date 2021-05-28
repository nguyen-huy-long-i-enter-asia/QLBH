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
  Text,
} from "@chakra-ui/react";

type Props = {
  type: string;
  searchResult:
    | {
        id: string;
        name: string;
        sell_price: number;
        image: string;
      }[]
    | {
        id: string;
        name: string;
      }[];
  handleResultClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};
const SearchResult: React.FC<Props> = ({
  type,
  searchResult,
  handleResultClick,
}) => {
  return (
    <Box
      position="absolute"
      top="100%"
      zIndex="1"
      bgColor="white"
      border="1px solid gray"
    >
      {(() => {
        if (type === "product") {
          return searchResult.map((item: any) => {
            return (
              <Flex key={item.id} id={item.id} onClick={handleResultClick}>
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
                    <Box>{`  Price: ${item.sell_price}`}</Box>
                  </Flex>
                </Box>
              </Flex>
            );
          });
        }
        if (type === "customer") {
          return searchResult;
        }
        return <></>;
      })()}

      {searchResult.map((item: any) => {
        return (
          <Box key={item.id} id={item.id} onClick={handleResultClick}>
            <Box>{item.name}</Box>
            <Box>
              <Text>ID: {item.id}</Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
export default SearchResult;
