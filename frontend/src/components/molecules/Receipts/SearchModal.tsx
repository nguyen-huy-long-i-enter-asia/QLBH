import React from "react";
import {
  Box,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import SearchResult from "components/atoms/Receipts/SearchResult";

type Props = {
  keyword: string;
  changeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResult: any;
  handleProductClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};
const SearchModal: React.FC<Props> = ({
  keyword,
  changeKeyword,
  searchResult,
  handleProductClick,
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
            searchResult={searchResult}
            handleProductClick={handleProductClick}
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default SearchModal;
