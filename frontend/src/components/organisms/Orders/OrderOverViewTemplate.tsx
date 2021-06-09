/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { css, SerializedStyles } from "@emotion/react";
import {
  Select,
  VStack,
  Text,
  Box,
  Flex,
  Textarea,
  Button,
  Icon,
  Input,
} from "@chakra-ui/react";
import { MdPerson } from "react-icons/md";
import CustomThead from "components/atoms/CustomThead";
import ProductExpandContent from "components/molecules/Products/ProductExpandContent";
import SelectCustomerInput from "components/molecules/Orders/SelectCustomerInput";

const tableStyle = css`
  border: groove;
`;

type SearchResultType = {
  id: number;
  name: string;
  email: string;
  phone: string;
}[];
type Props = {
  customer?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    image: string;
    orders: any[];
  };

  staffEmail: string | undefined;
  pay: number;
  note: string;
  handleNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setCustomer: any;
  action: string;
  setOrderState: (value: number) => void;
};

const OrderOverViewTemplate: React.FC<Props> = ({
  customer,
  staffEmail,
  handleNoteChange,
  pay,
  note,
  handleSubmit,
  setCustomer,
  action,
  setOrderState,
}) => {
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResultType>([]);
  const [orderStates, setOrderStates] = useState([]);
  // get State List of Product
  useEffect(() => {
    const fetchStateList = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}transactionStates/index`
      );
      setOrderStates(result.data);
    };
  }, []);
  useEffect(() => {
    const findData = async () => {
      const formData = new FormData();
      formData.append("keyword", keyword);
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}users/findCustomerByKeyword`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const resultData = result.data;
      setSearchResult(resultData);
    };
    if (keyword !== "") {
      findData();
    } else {
      setSearchResult([]);
    }
    // findData();

    // console.log(resultData);
  }, [keyword]);
  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  const handleCustomerClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER}users/findCustomer/${id}`
    );

    setCustomer(result.data);
  };
  const changeState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderState(parseInt(e.currentTarget.value, 10));
  };
  return (
    <Box w="20%" bgColor="white" position="relative">
      <Flex alignItems="center" ml="2%" mt="8%">
        <Icon as={MdPerson} />
        <Text>{staffEmail}</Text>
      </Flex>
      <SelectCustomerInput
        customer={customer !== undefined ? customer : undefined}
        handleCustomerClick={handleCustomerClick}
        keyword={keyword}
        changeKeyword={changeKeyword}
        searchResult={searchResult}
        setCustomer={setCustomer}
        action={action}
      />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mt="8%"
        pl="2%"
        pr="2%"
      >
        <Text>Pay</Text>
        <Text>{pay}</Text>
      </Flex>
      {/* <Box>Note</Box> */}
      <Select onChange={changeState}>
        {orderStates.map((item: any) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </Select>
      <Textarea
        w="96%"
        name="note"
        onChange={handleNoteChange}
        value={note === "" ? undefined : note}
        variant="flushed"
        placeholder="Note"
        mt="8%"
        ml="2%"
        mr="2%"
      />
      <Box w="100%" textAlign="center" position="absolute" bottom="6%">
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
};
export default OrderOverViewTemplate;
