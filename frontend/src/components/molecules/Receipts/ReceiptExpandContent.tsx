/* eslint-disable camelcase */
import React, { useState } from "react";
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
import { useHistory, Redirect } from "react-router-dom";

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
  categoriesList: CategoriesList;
  manufacturersList: ManufacturersList;
};
type Props = {
  receipt: {
    id: string;
    total: number;
    note: string;
    created: string;
    modified: string;
    receipt_details: {
      id: string;
      count: number;
      product: {
        id: string;
        name: string;
        original_price: number;
      };
      size: {
        id: string;
        name: string;
      };
      color: {
        id: string;
        name: string;
      };
    }[];
    staff: {
      id: string;
      name: string;
    };
    manufacturer: {
      id: string;
      name: string;
    };
  };
};

const ProductExpandContent: React.FC<Props> = ({ receipt }) => {
  const history = useHistory();

  const handleReceiptUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("a");
  };
  return (
    <Box>
      <Flex w="100%" bg="tomato">
        <Tbody w="33%">
          <Tr>
            <Td>Id:</Td>
            <Td>{receipt.id}</Td>
          </Tr>
          <Tr>
            <Td>Staff:</Td>
            <Td>{receipt.staff.name}</Td>
          </Tr>
        </Tbody>
        <Tbody>
          <Tr>
            <Td>Manufacturer:</Td>
            <Td>{receipt.manufacturer.name}</Td>
          </Tr>
          <Tr>
            <Td>Created:</Td>
            <Td>{receipt.created}</Td>
          </Tr>
        </Tbody>
        <Tbody>
          <Tr>
            <Td>Note:</Td>
            <Td>{receipt.note}</Td>
          </Tr>
        </Tbody>
      </Flex>

      <Table>
        <Thead>
          <Td>Id</Td>
          <Td>Name</Td>
          <Td>Size</Td>
          <Td>Color</Td>
          <Td>Count</Td>
          <Td>Price</Td>
          <Td>Total</Td>
        </Thead>
        <Tbody>
          {receipt.receipt_details.map((detail) => (
            <Tr>
              <Td>{detail.product.id}</Td>
              <Td>{detail.product.name}</Td>
              <Td>{detail.size.name}</Td>
              <Td>{detail.color.name}</Td>
              <Td>{detail.count}</Td>
              <Td>{detail.product.original_price}</Td>
              <Td>{detail.product.original_price * detail.count}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box>{receipt.total}</Box>

      <Flex>
        <Button>Return Products</Button>
        <Button onClick={handleReceiptUpdate}>Update</Button>
      </Flex>
    </Box>
  );
};
export default ProductExpandContent;
