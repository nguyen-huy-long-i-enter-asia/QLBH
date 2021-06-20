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
  color,
  Link,
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
  const [selectedColor, setSelectedColor] = useState({ id: "0", name: "" });
  const [selectedSize, setSelectedSize] = useState({ id: "0", name: "" });
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}store/findById/${id}`
      );
      setProduct(result.data);
    };
    fetchData();
  }, [id]);
  const handleColorClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const colorId = e.currentTarget.value;
    const colorName = e.currentTarget.id;

    setSelectedColor({ id: colorId, name: colorName });
  };
  const handleSizeClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const sizeId = e.currentTarget.value;
    const sizeName = e.currentTarget.id;

    setSelectedSize({ id: sizeId, name: sizeName });
  };
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setCount(parseInt(value, 10));
  };
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const oldCart = sessionStorage.getItem("cart");
    if (product) {
      if (oldCart) {
        const newCart = JSON.parse(oldCart);
        const duplicateItemIndex = newCart.findIndex(
          (item: any) =>
            item.id === product.id &&
            item.color.id === selectedColor.id &&
            item.size.id === selectedSize.id
        );
        if (duplicateItemIndex === -1) {
          newCart.push({
            id: product.id,
            name: product.name,
            color: selectedColor,
            size: selectedSize,
            sellPrice: product.sell_price,
            count,
            image: product.image,
            discount: product.discount,
          });
        } else {
          newCart[duplicateItemIndex] = {
            ...newCart[duplicateItemIndex],
            count: newCart[duplicateItemIndex].count + count,
          };
        }

        sessionStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        const newCart = [
          {
            id: product.id,
            name: product.name,
            color: selectedColor,
            size: selectedSize,
            sellPrice: product.sell_price,
            count,
            image: product.image,
            discount: product.discount,
          },
        ];

        sessionStorage.setItem("cart", JSON.stringify(newCart));
      }
      window.location.reload();
    }
  };
  if (product === undefined) {
    return <></>;
  }
  return (
    <Box className="content">
      <Flex>
        <Box w="33.3%" pl="5">
          <Button bgColor="#3498fd" color="white" fontSize="16px">
            <Link href="http://localhost:3000/store">Back to Main page</Link>
          </Button>

          <Image
            w="90%"
            m="3rem 10% 0% 0%"
            src={`http://localhost:8765/img/${product.image}`}
          />
        </Box>
        <Box w="66.7%">
          <Box>
            <Text fontSize="2.5rem"> {product.name}</Text>
          </Box>
          <Box>
            <Text
              fontSize="25px"
              bgColor="#00FFFF"
              textAlign="center"
              d="inline-block"
              p="0.25rem 1rem"
            >
              {product.manufacturer.name}
            </Text>
          </Box>
          {product.discount > 0 ? (
            <Text fontSize="25px" mt="1rem">
              {((100 - product.discount) * product.sell_price) / 100}
            </Text>
          ) : (
            <></>
          )}
          <Box
            textDecoration={product.discount > 0 ? "line-through" : "none"}
            fontSize="25px"
          >
            {product.sell_price}
          </Box>
          <Table>
            <Tbody>
              <Tr>
                <Td pl="0px" fontSize="25px">
                  Color
                </Td>
                <Td>
                  <RadioCard
                    options={product.colors}
                    handleClick={handleColorClick}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td pl="0px" fontSize="25px">
                  Color
                </Td>
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
              w="3.4rem"
              placeholder="Count"
              type="number"
              value={count !== 0 ? count : undefined}
              onChange={handleCountChange}
              size="lg"
              mr="1rem"
            />
            <Button
              onClick={handleAddToCart}
              size="lg"
              bgColor="#3498fd"
              color="white"
            >
              Add to cart
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Box pl="2.3%">
          <Text fontSize="25px" fontWeight="bold">
            Description
          </Text>
        </Box>
        <Box pl="2.3%">
          <Text>{product.note}</Text>
        </Box>
      </Box>
    </Box>
  );
};
export default StoreProductContainer;
