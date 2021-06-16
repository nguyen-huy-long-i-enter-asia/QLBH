/* eslint-disable camelcase */
import React from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";

import { useHistory, Link } from "react-router-dom";

type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];
type ManufacturersList = {
  id: number;
  name: string;
}[];

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
  receiptExpandContentProps:
    | {
        handleDeleteReceipt: (e: React.MouseEvent<HTMLButtonElement>) => void;
      }
    | undefined;
};

const ProductExpandContent: React.FC<Props> = ({
  receipt,
  receiptExpandContentProps,
}) => {
  return (
    <Tabs>
      <TabList bgColor="#51cdc426">
        <Tab _selected={{ bgColor: "white", color: "black" }}>Info</Tab>
        <Tab _selected={{ bgColor: "white", color: "black" }}>Detail</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex w="100%">
            <Box w="31%" mr="2%">
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Id:</Td>
                    <Td>{receipt.id}</Td>
                  </Tr>
                  <Tr>
                    <Td>Staff:</Td>
                    <Td>{receipt.staff.name}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
            <Box w="31%" mr="2%">
              <Table>
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
              </Table>
            </Box>
            <Box w="33%">
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Note:</Td>
                    {/* <Td>{receipt.note}</Td> */}
                  </Tr>
                  <Box ml="1.5rem" minH="5rem">
                    {receipt.note}
                  </Box>
                </Tbody>
              </Table>
            </Box>
          </Flex>
          <Flex justifyContent="flex-end" mt="1vh">
            <Button
              id={receipt.id}
              onClick={
                receiptExpandContentProps
                  ? receiptExpandContentProps.handleDeleteReceipt
                  : undefined
              }
              bgColor="#3399ff"
              color="white"
              m="0vh 1vw"
            >
              Return Products
            </Button>
            <Button bgColor="#3399ff" color="white" m="0vh 1vw">
              <Link to={`/receipts/update/${receipt.id}`}>Update Receipt</Link>
            </Button>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Table w="80%" m="auto" border="1px solid #dce6ef">
            <Thead backgroundColor="#3399ff" border="1px solid #dce6ef">
              {["Id", "Name", "Size", "Color", "Count", "Price", "Total"].map(
                (item) => (
                  <Th
                    textAlign="center"
                    color="white"
                    border="1px solid #dce6ef"
                  >
                    {item}
                  </Th>
                )
              )}
              {/* //{" "}
              <Td textAlign="center" color="white" border="1px solid #dce6ef">
                Id
              </Td>
              //{" "}
              <Td textAlign="center" color="white" border="1px solid #dce6ef">
                Name
              </Td>
              //{" "}
              <Td textAlign="center" color="white" border="1px solid #dce6ef">
                Size
              </Td>
              // <Td>Color</Td>
              // <Td>Count</Td>
              // <Td>Price</Td>
              // <Td>Total</Td> */}
            </Thead>
            <Tbody border="1px solid #dce6ef">
              {receipt.receipt_details.map((detail) => (
                <Tr>
                  <Td textAlign="center" border="1px solid #dce6ef">
                    {detail.product.id}
                  </Td>
                  <Td textAlign="center" border="1px solid #dce6ef">
                    {detail.product.name}
                  </Td>
                  <Td textAlign="center" border="1px solid #dce6ef">
                    {detail.size.name}
                  </Td>
                  <Td textAlign="center" border="1px solid #dce6ef">
                    {detail.color.name}
                  </Td>
                  <Td textAlign="center" border="1px solid #dce6ef">
                    {detail.count}
                  </Td>
                  <Td textAlign="center" border="1px solid #dce6ef">
                    {detail.product.original_price}
                  </Td>
                  <Td textAlign="center" border="1px solid #dce6ef">
                    {detail.product.original_price * detail.count}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Box textAlign="center" fontSize="18px" mt="1.5rem">
            <Text fontWeight="bold" d="inline">
              Sum
            </Text>
            : {receipt.total}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default ProductExpandContent;
