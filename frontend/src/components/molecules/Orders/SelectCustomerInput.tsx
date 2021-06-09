import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Table,
  Tbody,
  Thead,
  Th,
  Tr,
  Td,
} from "@chakra-ui/react";
import { SmallCloseIcon, SmallAddIcon } from "@chakra-ui/icons";
import SearchResult from "components/atoms/Orders/SearchResult";
import UserForm from "components/atoms/Users/UserForm";
import Pagination from "components/atoms/Pagination";
import axios from "axios";

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
    address: string;
    image: string;
    orders: any[];
  };
  setCustomer: any;
  action: string;
};
const SelectCustomerInput: React.FC<Props> = ({
  keyword,
  changeKeyword,
  searchResult,
  handleCustomerClick,
  customer,
  setCustomer,
  action,
}) => {
  const {
    isOpen: isOpenSearchModal,
    onOpen: onOpenSearchModal,
    onClose: onCloseSearchModal,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdateModal,
    onOpen: onOpenUpdateModal,
    onClose: onCloseUpdateModal,
  } = useDisclosure();
  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal,
  } = useDisclosure();
  const [displayList, setDisplayList] = useState<any[]>([]);
  const handlePagination = (newDisplayList: any[]) => {
    setDisplayList(newDisplayList);
  };
  const handleAddNewCustomerToOrder = async (id: string) => {
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER}users/findCustomer/${id}`
    );
    setCustomer(result.data);
  };
  const removeSelectedUser = () => {
    onCloseSearchModal();
    setCustomer(undefined);
  };
  if (customer !== undefined) {
    return (
      <Box>
        <Flex alignItems="center">
          <Input
            onClick={onOpenUpdateModal}
            value={customer.name}
            isReadOnly
            variant="flushed"
            bgColor="white"
            color="#3cc7bd"
            cursor="pointer"
          />
          <SmallCloseIcon
            onClick={removeSelectedUser}
            cursor="pointer"
            color="red"
            display={action === "edit" ? "none" : "block"}
          />
        </Flex>

        <Modal
          isOpen={isOpenUpdateModal}
          onClose={onCloseUpdateModal}
          size="5xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Tabs size="md" variant="enclosed">
                <TabList>
                  <Tab>Info</Tab>
                  <Tab>Transaction History</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <UserForm
                      customer={customer}
                      closeModal={onCloseUpdateModal}
                      handleAddNewCustomerToOrder={handleAddNewCustomerToOrder}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Table>
                      <Thead>
                        <Th>Id</Th>
                        <Th>Staff</Th>
                        <Th>Created</Th>
                        <Th>Pay</Th>
                        <Th>State</Th>
                      </Thead>
                      <Tbody>
                        {displayList.map((order) => (
                          <Tr>
                            <Td>{order.id}</Td>
                            <Td>
                              {order.staff === null ? "" : order.staff.name}
                            </Td>

                            <Td>
                              {new Date(order.created).toLocaleDateString(
                                "en-GB"
                              )}
                            </Td>

                            <Td>{order.pay}</Td>
                            <Td>{order.transaction_state.name}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                    <Pagination
                      items={customer.orders}
                      onChangePage={handlePagination}
                      pageSizeProp={1}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <ModalCloseButton />
            </ModalBody>

            {/* <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </Box>
    );
  }
  return (
    <Box>
      <Flex alignItems="center">
        <Input
          className="abc"
          variant="flushed"
          placeholder="Type Customer Name"
          onClick={onOpenSearchModal}
          bgColor="white"
          value={undefined}
        />
        <SmallAddIcon cursor="pointer" onClick={onOpenAddModal} />
        <Modal isOpen={isOpenAddModal} onClose={onCloseAddModal} size="5xl">
          <ModalOverlay />
          <ModalContent>
            <UserForm
              closeModal={onCloseAddModal}
              handleAddNewCustomerToOrder={handleAddNewCustomerToOrder}
            />
          </ModalContent>
        </Modal>
      </Flex>

      <Modal isOpen={isOpenSearchModal} onClose={onCloseSearchModal}>
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
