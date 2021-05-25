/* eslint-disable camelcase */
import React from "react";
import { Flex, Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  searchResult: {
    id: string;
    name: string;

    image: string;
  }[];
};
const SearchResultTemplate: React.FC<Props> = ({ searchResult }) => {
  const redirect = (url: string) => {
    window.location.href = url;
  };
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
          // <Box
          //   onClick={() => {
          //     redirect(`/store/product/${item.id}`);
          //   }}
          // >
          <Link to={`/store/product/${item.id}`}>
            <Flex key={item.id} id={item.id}>
              <Box w="33.3%">
                <Image
                  w="50%"
                  src={`http://localhost:8765/img/${item.image}`}
                  alt="Error"
                />
              </Box>
              <Box>
                <Box>{item.name}</Box>
              </Box>
            </Flex>
          </Link>
          // </Box>
        );
      })}
    </Box>
  );
};
export default SearchResultTemplate;
