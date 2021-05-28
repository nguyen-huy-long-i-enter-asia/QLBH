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
const SelectCustomerInput: React.FC<Props> = ({
  keyword,
  changeKeyword,
  searchResult,
  handleResultClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Input
        placeholder="Type Customer Name"
        onClick={onOpen}
        bgColor="white"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Input
            placeholder="Type Customer Name"
            value={keyword}
            onChange={changeKeyword}
          />
          <SearchResult
            type="customer"
            searchResult={searchResult}
            handleResultClick={handleResultClick}
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default SelectCustomerInput;
