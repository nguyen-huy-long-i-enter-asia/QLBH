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
  keyword: string;
  changeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResult: any;
  handleCustomerClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  customer?: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
};
const SelectCustomerInput: React.FC<Props> = ({
  keyword,
  changeKeyword,
  searchResult,
  handleCustomerClick,
  customer,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (customer !== undefined) {
    console.log("xyz");
    return <Box>aaa</Box>;
  }
  return (
    <Box>
      <Input
        variant="flushed"
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
            handleResultClick={handleCustomerClick}
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default SelectCustomerInput;
