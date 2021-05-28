/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import {
  Icon,
  Button,
  Box,
  Flex,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

import Cookies from "js-cookie";
import axios from "axios";
import CustomMenu from "components/atoms/CustomMenu";
import SearchModal from "components/molecules/Customer/SearchModal";

type searchResultType = {
  id: string;
  name: string;
  image: string;
}[];
const MenuBarContainer: React.FC = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<searchResultType>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cart, setCart] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const cartString = sessionStorage.getItem("cart");
    // if (cartString !== null) {
    //   const carts = JSON.parse(cartString);
    //   console.log(carts[carts.length - 1].count);
    //   window.addEventListener("storage", () => {
    //     handleStorageChange();
    //   });
    // }
    if (cartString !== null) {
      setCart(JSON.parse(cartString));
      const productsCount = JSON.parse(cartString).reduce(
        (accumulator: number, currentValue: any) =>
          accumulator + currentValue.count,
        0
      );
      setTotalCount(productsCount);
    }

    window.addEventListener("storage", () => {
      handleStorageChange();
    });
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  useEffect(() => {
    const findData = async () => {
      // const formData = new FormData();
      // formData.append("keyword", keyword);
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}store/findByName/${keyword}`
        // formData,
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
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
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    const logoutBackEnd = async () => {
      const email = Cookies.get("email");
      Cookies.remove("email");
      Cookies.remove("position");
      await axios.post(`${process.env.REACT_APP_SERVER}users/logout`, email);
      history.push("/login");
    };
    logoutBackEnd();
  };
  const handleStorageChange = () => {
    console.log("Storage changed");
    const cartString = sessionStorage.getItem("cart");
    if (cartString !== null) {
      setCart(JSON.parse(cartString));
    }
    const productsCount = cart.reduce(
      (accumulator: number, currentValue: any) =>
        accumulator + currentValue.count,
      0
    );
    setTotalCount(productsCount);
  };
  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  return (
    <Flex w="80%" m="auto" justify="space-around">
      <Image
        src={`${process.env.PUBLIC_URL}/page-logo.png`}
        boxSize="4rem"
        display="block"
      />
      <SearchModal
        keyword={keyword}
        changeKeyword={changeKeyword}
        searchResult={searchResult}
      />
      <Flex>
        <Icon as={MdShoppingCart} />
        <Text>Your Cart has {totalCount} products</Text>
      </Flex>
    </Flex>
  );
};
export default MenuBarContainer;
