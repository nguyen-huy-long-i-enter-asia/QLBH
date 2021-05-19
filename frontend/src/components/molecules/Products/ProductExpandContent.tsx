/* eslint-disable camelcase */
import React from "react";
import {
  Box,
  Flex,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Button,
} from "@chakra-ui/react";
import ProductForm from "components/atoms/Products/ProductForm";
import axios from "axios";
import { useHistory } from "react-router-dom";

type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];
type ManufacturersList = {
  id: number;
  name: string;
}[];
type ProductExpandContentProps = {
  categoriesList: CategoriesList | undefined;
  manufacturersList: ManufacturersList | undefined;
  productStatesList: { id: string; name: string }[];
};
type Props = {
  product: {
    id: string;
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
    state: string;
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
  productExpandContentProps: ProductExpandContentProps | undefined;
};

const ProductExpandContent: React.FC<Props> = ({
  product,
  productExpandContentProps,
}) => {
  const {
    id,
    name,
    original_price,
    sell_price,
    discount,
    image,
    note,
    manufacturer,

    categories,
    inventory,
  } = product;

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER}products/delete`,
      { id }
    );

    if (result.data.status === "success") {
      // history.push("/products");
      window.location.reload(false);
    } else {
      alert(result.data.status);
    }
  };
  return (
    <Box>
      <Flex>
        <Box w="33.3%">
          <Image w="50%" src={image} alt="Error" />
        </Box>
        <Box>
          <Flex w="100%" bg="tomato">
            <Box>
              <Box>Id:</Box>
              <Box>Name:</Box>
              <Box>Original Price:</Box>
              <Box>Sell Price:</Box>
              <Box>Discount:</Box>
              <Box>Brand:</Box>
            </Box>
            <Box>
              <Box>{id}</Box>
              <Box>{name}</Box>
              <Box>{original_price}</Box>
              <Box>{sell_price}</Box>
              <Box>{discount}</Box>
              <Box>{manufacturer.name}</Box>
            </Box>
            <Box>
              <Box>Description</Box>
              <Box>{note}</Box>
              <Box>Categories</Box>
              {categories !== undefined ? (
                categories.map((category) => (
                  <Box key={category.name}>{category.name}</Box>
                ))
              ) : (
                <> </>
              )}
            </Box>
          </Flex>

          <Table>
            <Thead>
              <Td>Size</Td>
              <Td>Color</Td>
              <Td>Count</Td>
            </Thead>
            <Tbody>
              {inventory !== undefined ? (
                inventory.map((itemSize) => {
                  return itemSize.colors.map((itemColor) => {
                    return (
                      <Tr key={itemSize.size + itemColor.color}>
                        <td>{itemSize.size}</td>
                        <td>{itemColor.color}</td>
                        <td>{itemColor.count}</td>
                      </Tr>
                    );
                  });
                })
              ) : (
                <></>
              )}
            </Tbody>
          </Table>
        </Box>
      </Flex>
      <Flex>
        <Button>Import</Button>
        <ProductForm
          categoriesList={
            productExpandContentProps
              ? productExpandContentProps.categoriesList
              : undefined
          }
          manufacturersList={
            productExpandContentProps
              ? productExpandContentProps.manufacturersList
              : undefined
          }
          productStatesList={
            productExpandContentProps
              ? productExpandContentProps.productStatesList
              : undefined
          }
          action="edit"
          selectedProduct={product}
        />
        <Button onClick={handleDelete}>Delete</Button>
        <Button>Post FaceBook</Button>
        <Button>Stop Selling</Button>
      </Flex>
    </Box>
  );
};
export default ProductExpandContent;
