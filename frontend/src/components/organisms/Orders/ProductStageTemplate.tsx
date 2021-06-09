import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Button,
  Image,
  Text,
  Icon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Pagination from "components/atoms/Pagination";
import { RiFilterFill } from "react-icons/ri";
import ProductFilterDraw from "components/molecules/Orders/ProductFilterDraw";
import CheckBoxFilter from "components/molecules/filter/CheckBoxFilter";
import { NavItem } from "react-bootstrap";

type Filter = {
  filterName: string;
  filterConditions: {
    id: string;
    name: string;
    isChecked: boolean;
  }[];
};
type Props = {
  dataList: any;
  checkboxFilters: Filter[];
  handleCheckBoxClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProductClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};
const ProductStageTemplate: React.FC<Props> = ({
  dataList,
  checkboxFilters,
  handleCheckBoxClick,
  handleProductClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayList, setDisplayList] = useState(dataList);
  const handlePagination = (newDisplayList: any) => {
    setDisplayList(newDisplayList);
  };
  return (
    <>
      <Flex justifyContent="space-between" w="100%">
        <Box>
          <Icon as={RiFilterFill} onClick={onOpen} />
        </Box>
        <Pagination
          items={dataList}
          onChangePage={handlePagination}
          pageSizeProp={7}
        />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Filter</DrawerHeader>

            <DrawerBody>
              <ProductFilterDraw
                checkboxFilters={checkboxFilters}
                handleCheckBoxClick={handleCheckBoxClick}
              />
            </DrawerBody>

            {/* <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter> */}
          </DrawerContent>
        </Drawer>
      </Flex>
      <Flex wrap="wrap">
        {displayList.map((item: any) => (
          <Box
            key={item.id}
            id={item.id}
            border="1px solid gray"
            bgColor="white"
            position="relative"
            w="14.28%"
            h="20vh"
            onClick={handleProductClick}
          >
            <Box h="70%">
              <Image src={item.image} display="block" w="100%" h="100%" />
            </Box>
            <Box>
              <Text fontSize="sm">{item.name}</Text>
              {item.discount > 0 ? (
                <Text fontSize="sm">
                  {(item.sell_price * (100 - item.discount)) / 100}
                </Text>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        ))}
      </Flex>
    </>
  );
};
export default ProductStageTemplate;
