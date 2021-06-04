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
  searchResult: any;
  handleResultClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};
const SearchResult: React.FC<Props> = ({
  type,
  searchResult,
  handleResultClick,
}) => {
  return (
    <Box bgColor="white" border="1px solid gray">
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
          return searchResult.map((item: any) => {
            return (
              <Box id={item.id} onClick={handleResultClick}>
                <Box>
                  <Text>{item.name}</Text>
                </Box>
                <Flex justifyContent="space-between">
                  <Box>
                    <Text>{`Email: ${item.email}`}</Text>
                  </Box>
                  <Box>
                    <Text>{`Phone: ${item.phone}`}</Text>
                  </Box>
                </Flex>
              </Box>
            );
          });
        }
        return <></>;
      })()}

      {/* {searchResult.map((item: any) => {
        return (
          <Box key={item.id} id={item.id} onClick={handleResultClick}>
            <Box>{item.name}</Box>
            <Box>
              <Text>ID: {item.id}</Text>
            </Box>
          </Box>
        );
      })} */}
    </Box>
  );
};
export default SearchResult;
