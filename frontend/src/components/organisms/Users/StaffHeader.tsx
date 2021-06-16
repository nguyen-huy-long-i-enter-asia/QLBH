import React from "react";
import {
  Input,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import UserForm from "components/atoms/Users/UserForm";

export type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];

type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StaffHeader: React.FC<Props> = ({ handleSearch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex justify="space-between" w="100%">
      <Input
        className="header-input"
        placeholder="Type name of Product"
        onChange={handleSearch}
        w="33%"
        bgColor="white"
      />
    </Flex>
  );
};
export default StaffHeader;
