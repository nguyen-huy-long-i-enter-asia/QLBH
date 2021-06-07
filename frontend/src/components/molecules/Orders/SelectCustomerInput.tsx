import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
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
import SearchResult from "components/atoms/Orders/SearchResult";
import UserForm from "components/atoms/Users/UserForm";
import Pagination from "components/atoms/Pagination";

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
};
const SelectCustomerInput: React.FC<Props> = ({
  keyword,
  changeKeyword,
  searchResult,
  handleCustomerClick,
  customer,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayList, setDisplayList] = useState<any[]>([]);
  const handlePagination = (newDisplayList: any[]) => {
    setDisplayList(newDisplayList);
  };
  if (customer !== undefined) {
    console.log(customer);
    return (
      <Box>
        <Input
          onClick={onOpen}
          value={customer.name}
          isReadOnly
          variant="flushed"
          bgColor="white"
          color="#3cc7bd"
          cursor="pointer"
        />

        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
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
                    <UserForm customer={customer} />
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
