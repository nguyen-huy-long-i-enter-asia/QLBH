/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import SearchResult from "components/atoms/Orders/SearchResult";

type importListType = {
  id: number; // id san pham
  name: string;
  sell_price: number;
  count: number;
  size_id: string;
  color_id: string;
  total: number;
  inventory: number;
}[];
type Props = {
  type: string;
  importList: importListType;
  setImportList: (value: importListType) => void;
};
const SearchModal: React.FC<Props> = ({ type, importList, setImportList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  useEffect(() => {
    const findData = async () => {
      const formData = new FormData();
      formData.append("keyword", keyword);
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}products/findByKeyword`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result.data);
      setSearchResult(result.data);
    };
    if (keyword !== "") {
      findData();
    } else {
      setSearchResult([]);
    }
  }, [keyword]);
  const handleProductClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;
    const selectedProduct = searchResult.filter((item) => {
      console.log(`${item.id}||${id}`);
      console.log(item.id === parseInt(id, 10));
      return item.id === parseInt(id, 10);
    });
    console.log(id);
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("size_id", "1");
    formData.append("color_id", "1");
    const result = await axios.post(
      `http://localhost:8765/colorsProductsSizes/getInventory/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    let inventory = 0;
    if (result.data !== null) {
      inventory = result.data.count;
    }
    console.log([
      ...importList,
      {
        ...selectedProduct[0],
        count: 0,
        size_id: "1",
        color_id: "1",
        total: 0,
        inventory,
      },
    ]);
    setImportList([
      ...importList,
      {
        ...selectedProduct[0],
        count: 0,
        size_id: "1",
        color_id: "1",
        total: 0,
        inventory,
      },
    ]);
  };
  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  return (
    <Box mr="2%">
      <Input
        placeholder="Type product id or name"
        onClick={onOpen}
        bgColor="white"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Input
            placeholder="Type product id or name"
            value={keyword}
            onChange={changeKeyword}
          />
          <SearchResult
            type="product"
            searchResult={searchResult}
            handleResultClick={handleProductClick}
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default SearchModal;
