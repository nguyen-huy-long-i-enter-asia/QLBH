/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Text,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import UserForm from "components/atoms/Users/UserForm";
import axios from "axios";
import { useHistory } from "react-router-dom";

type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];

type Props = {
  customer: any;
  isDisplay?: boolean;
};

const CustomerExpandContent: React.FC<Props> = ({ customer, isDisplay }) => {
  const [transactions, setTransactions] = useState<any[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}orders/findRecentByCustomer/${customer.id}`
      );

      setTransactions(result.data);
    };
    if (transactions === undefined) {
      fetchTransactions();
    }
  }, [isDisplay]);
  //   const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //     const result = await axios.post(
  //       `${process.env.REACT_APP_SERVER}products/delete`,
  //       { id }
  //     );

  //     if (result.data.status === "success") {
  //       // history.push("/products");
  //       window.location.reload(false);
  //     } else {
  //       alert(result.data.status);
  //     }
  //   };
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const url = `${process.env.REACT_APP_SERVER}users/deleteCustomer/${customer.id}`;
    const result = await axios.get(url);
    if (result.data.status === "success") {
      sessionStorage.setItem("action", "delete");
      window.location.reload(false);
    } else {
      toast({
        title: `Delete Customer fail`,

        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };
  if (isDisplay) {
    return (
      <Box>
        <Box>
          <Flex>
            <Box>
              <Image
                src={`${process.env.REACT_APP_IMG_SERVER}Avatar/${customer.image}`}
              />
            </Box>
            <Box>
              <Flex>
                <Text>Name</Text>
                <Text>{customer.name}</Text>
              </Flex>
              <Flex>
                <Text>Phone</Text>
                <Text>{customer.phone}</Text>
              </Flex>
              <Flex>
                <Text>Address</Text>
                <Text>{customer.address}</Text>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Text>Email</Text>
                <Text>{customer.email}</Text>
              </Flex>
              <Flex>
                <Text>Note</Text>
                <Text>{customer.note}</Text>
              </Flex>
              <Flex>
                <Text>Total Pay</Text>
                <Text>{customer.total_pay}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Table>
            <Thead>
              <Th>Id</Th>
              <Th>Time</Th>
              <Th>Staff</Th>
              <Th>Total</Th>
            </Thead>
            <Tbody>
              {transactions?.map((item) => (
                <Tr>
                  <Td>{item.id}</Td>
                  <Td>{item.created}</Td>
                  <Td>{item.Staff !== undefined ? item.Staff.name : ""}</Td>
                  <Td>{item.total}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Flex>
          <Button onClick={onOpen}>Edit Customer</Button>

          <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Customer</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <UserForm
                  type="customer"
                  user={customer}
                  closeModal={onClose}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Button onClick={handleDelete}>Delete</Button>
          {/* <Button onClick={handleDeleteManufacturer}>Delelte this Manufacturer</Button> */}
        </Flex>
      </Box>
    );
  }
  return <></>;
};
export default CustomerExpandContent;
