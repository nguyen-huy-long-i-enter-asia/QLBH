/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import {
  Box,
  Flex,
  Image,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useToast,
} from "@chakra-ui/react";
import ProductForm from "components/atoms/Products/ProductForm";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "components/molecules/Products/ProductExpandContent.css";

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
  };
  productExpandContentProps: ProductExpandContentProps | undefined;
  isDisplay?: boolean;
};
type inventoryType = {
  size: string;
  colors: {
    color: string;
    count: number;
  }[];
}[];
const ProductExpandContent: React.FC<Props> = ({
  product,
  productExpandContentProps,
  isDisplay,
}) => {
  const [inventory, setInventory] = useState<inventoryType>([]);
  const [nullFlag, setNullFlag] = useState(0);
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
  } = product;
  const fetchInventory = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER}products/getInventoryById/${product.id}`,
      { withCredentials: true }
    );
    console.log(result.data.inventory);
    setInventory(result.data.inventory);
  };
  useEffect(() => {
    if (inventory.length === 0 && nullFlag === 0 && isDisplay === true) {
      fetchInventory();
      setNullFlag(1);
    }
  }, [isDisplay]);
  const toast = useToast();
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = await axios.post(
      `${process.env.REACT_APP_SERVER}products/delete`,
      { id },
      { withCredentials: true }
    );

    if (result.data.status === "success") {
      sessionStorage.setItem("action", "delete");
      window.location.reload(false);
    } else {
      toast({
        title: `Delete Product fail`,

        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };
  return (
    <Tabs className="longhuy" w="100%" p="0px">
      <TabList bgColor="#51cdc426">
        <Tab _selected={{ bgColor: "white", color: "black" }}>Info</Tab>
        <Tab _selected={{ bgColor: "white", color: "black" }}>Inventory</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Flex mb="1vh">
            <Box w="33.3%">
              <Image w="90%" src={image} alt="Error" />
            </Box>
            <Box w="66.7%">
              <Flex w="100%">
                <Box w="50%">
                  <Table w="80%">
                    <Tbody>
                      <Tr>
                        <Td>Id:</Td>
                        <Td>{id}</Td>
                      </Tr>
                      <Tr>
                        <Td>Name:</Td>
                        <Td>{name}</Td>
                      </Tr>
                      <Tr>
                        <Td>Original Price:</Td>
                        <Td>{original_price}</Td>
                      </Tr>
                      <Tr>
                        <Td>Sell Price:</Td>
                        <Td>{sell_price}</Td>
                      </Tr>
                      <Tr>
                        <Td>Discount:</Td>
                        <Td>{discount}</Td>
                      </Tr>
                      <Tr>
                        <Td>Manufacturer: </Td>
                        <Td>{manufacturer.name}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
                <Box w="50%">
                  <Table>
                    <Tbody>
                      <Tr>
                        <Td colSpan={2}>Note:</Td>
                      </Tr>
                      <Box ml="1.5rem" minH="5rem">
                        {note}
                      </Box>
                      <Tr>
                        <Td colSpan={2}>Categories:</Td>
                      </Tr>
                      {categories !== undefined ? (
                        categories.map((category) => (
                          <Box ml="1.5rem" key={category.name}>
                            {category.name}
                          </Box>
                        ))
                      ) : (
                        <></>
                      )}
                    </Tbody>
                  </Table>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Flex justifyContent="flex-end" mt="1vh">
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
              buttonStyle={css`
                margin: 0vh 1vw;
              `}
            />
            <Button
              className="button"
              bgColor="#3399ff"
              color="white"
              onClick={handleDelete}
              m="0vh 1vw"
            >
              Delete
            </Button>
            <Button
              className="button"
              bgColor="#3399ff"
              color="white"
              m="0vh 1vw"
            >
              Stop Selling
            </Button>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Table w="60%" m="auto" border="1px solid #dce6ef">
            <Thead backgroundColor="#3399ff" border="1px solid #dce6ef">
              <Th textAlign="center" color="white" border="1px solid #dce6ef">
                Size
              </Th>
              <Th textAlign="center" color="white" border="1px solid #dce6ef">
                Color
              </Th>
              <Th textAlign="center" color="white" border="1px solid #dce6ef">
                Count
              </Th>
            </Thead>
            <Tbody>
              {inventory.map((itemSize: any) => {
                return (
                  <>
                    <Tr border="1px solid #dce6ef">
                      <Td
                        textAlign="center"
                        rowSpan={itemSize.colors.length}
                        border="1px solid #dce6ef"
                      >
                        {itemSize.size}
                      </Td>
                      <Td border="1px solid #dce6ef" textAlign="center">
                        {itemSize.colors[0].color}
                      </Td>

                      <Td border="1px solid #dce6ef" textAlign="center">
                        {itemSize.colors[0].count}
                      </Td>
                    </Tr>
                    {itemSize.colors.slice(1).map((itemColor: any) => {
                      return (
                        <Tr
                          key={itemSize.size + itemColor.color}
                          border="1px solid #dce6ef"
                        >
                          <Td border="1px solid #dce6ef" textAlign="center">
                            {itemColor.color}
                          </Td>
                          <Td border="1px solid #dce6ef" textAlign="center">
                            {itemColor.count}
                          </Td>
                        </Tr>
                      );
                    })}
                  </>
                );
                // return itemSize.colors.map((itemColor: any) => {
                //   return (
                //     <Tr key={itemSize.size + itemColor.color}>
                //       <Td>{itemSize.size}</Td>
                //       <Td>{itemColor.color}</Td>
                //       <Td>{itemColor.count}</Td>
                //     </Tr>
                //   );
                // });
              })}
            </Tbody>
          </Table>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default ProductExpandContent;
