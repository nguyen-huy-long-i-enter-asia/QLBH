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

type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomerHeader: React.FC<Props> = ({ handleSearch }) => {
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

      <Button onClick={onOpen}>Add Customer</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm type="customer" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
export default CustomerHeader;
