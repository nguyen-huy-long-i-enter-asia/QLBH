/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Flex } from "@chakra-ui/react";

type Product = {
  id: number;
  name: string;
  original_price: string;
  sell_price: string;
  discount: string;
  image: string;
  note: string;
  manufacturer: {
    id: string;
    name: string;
  };
  categories: {
    id: string;
    name: string;
  }[];
  inventory: {
    size: string;
    colors: {
      color: string;
      count: number;
    }[];
  }[];
};
type Props = {
  id: string;
};
const StoreProductContainer: React.FC<Props> = ({ id }) => {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}store/findById/${id}`
      );
      setProduct(result.data);
      console.log(result.data);
    };
    fetchData();
  }, []);
  return (
    <Box>
      <Flex>
        <Box>aaaa</Box>
        <Box>bbb</Box>
      </Flex>
      <Box>ccc</Box>
    </Box>
  );
};
export default StoreProductContainer;
