import React from "react";
import {
  Box,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import SearchResult from "components/atoms/Orders/SearchResult";

type Props = {
  type: string;
  keyword: string;
  changeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResult: any;
  handleResultClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};
const SearchModal: React.FC<Props> = ({
  type,
  keyword,
  changeKeyword,
  searchResult,
  handleResultClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            handleResultClick={handleResultClick}
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default SearchModal;
