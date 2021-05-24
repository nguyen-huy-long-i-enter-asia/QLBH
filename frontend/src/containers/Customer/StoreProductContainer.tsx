/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Image,
  Tbody,
  Text,
  Tr,
  Td,
  Table,
  Input,
  Button,
} from "@chakra-ui/react";
import "layouts/layout.css";
import RadioCard from "components/atoms/RadioCard/RadioCard";

type Product = {
  id: number;
  name: string;
  original_price: number;
  sell_price: number;
  discount: number;
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
  colors: {
    id: string;
    name: string;
  }[];
  sizes: {
    id: string;
    name: string;
  }[];
};
type Props = {
  id: string;
};
const StoreProductContainer: React.FC<Props> = ({ id }) => {
  const [product, setProduct] = useState<Product>();
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}store/findById/${id}`
      );
      setProduct(result.data);
    };
    fetchData();
  }, []);
  const handleColorClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const colorId = e.currentTarget.id;

    setSelectedColor(parseInt(colorId, 10));
  };
  const handleSizeClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const sizeId = e.currentTarget.id;

    setSelectedSize(parseInt(sizeId, 10));
  };
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setCount(parseInt(value, 10));
  };
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const oldCart = localStorage.getItem("cart");
    if (product) {
      if (oldCart) {
        const newCart = JSON.parse(oldCart);
        console.log(newCart);
        newCart.push({
          productId: product.id,
          colorId: selectedColor,
          sizeId: selectedSize,
          count,
        });
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        const newCart = [
          {
            productId: product.id,
            colorId: selectedColor,
            sizeId: selectedSize,
            count,
          },
        ];
        console.log(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    }
  };
  if (product === undefined) {
    return <></>;
  }
  return (
    <Box className="content">
      <Flex>
        <Box w="33.3%" pl="5">
          <Image
            h="20rem"
            w="14rem"
            src={`http://localhost:8765/img/${product.image}`}
          />
        </Box>
        <Box w="66.7%">
          <Box>
            <Text fontSize="2.25rem"> {product.name}</Text>
          </Box>
          <Box>
            <Box
              bgColor="#00FFFF"
              textAlign="center"
              w="35%"
              borderRadius="1rem"
            >
              <Text>{product.manufacturer.name}</Text>
            </Box>
          </Box>
          {product.discount > 0 ? (
            <Box>
              <Text>
                {((100 - product.discount) * product.sell_price) / 100}
              </Text>
            </Box>
          ) : (
            <></>
          )}
          <Box textDecoration={product.discount > 0 ? "line-through" : "none"}>
            {product.sell_price}
          </Box>
          <Table>
            <Tbody>
              <Tr>
                <Td>Color</Td>
                <Td>
                  <RadioCard
                    options={product.colors}
                    handleClick={handleColorClick}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Color</Td>
                <Td>
                  <RadioCard
                    options={product.sizes}
                    handleClick={handleSizeClick}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Flex>
            <Input
              placeholder="Count"
              type="number"
              value={count !== 0 ? count : undefined}
              onChange={handleCountChange}
            />
            <Button onClick={handleAddToCart}>Add to cart</Button>
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Box>
          <Text>Description</Text>
        </Box>
        <Box>
          <Text>{product.note}</Text>
        </Box>
      </Box>
    </Box>
  );
};
export default StoreProductContainer;
