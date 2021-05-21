/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Box,
  Flex,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios from "axios";
import CustomMenu from "components/atoms/CustomMenu";
import SearchResultTemplate from "components/organisms/Customer/SearchResultTemplate";

type searchResultType = {
  id: string;
  name: string;
  image: string;
}[];
const MenuBarTemplate: React.FC = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<searchResultType>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Box mr="2%">
        <Input
          placeholder="Type product id or name"
          value={keyword}
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
            <SearchResultTemplate searchResult={searchResult} />
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};
export default MenuBarTemplate;
