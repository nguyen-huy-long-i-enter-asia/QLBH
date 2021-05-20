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
} from "@chakra-ui/react";

import { MdPerson } from "react-icons/md";
import CustomThead from "components/atoms/CustomThead";
import ProductExpandContent from "components/molecules/Products/ProductExpandContent";

const tableStyle = css`
  border: groove;
`;
type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];
type ManufacturersList = {
  id: number;
  name: string;
}[];
type Props = {
  manufacturers: {
    id: string;
    name: string;
  }[];
  staffEmail: string | undefined;

  selectedManufacturer: string;

  handleManufacturerChange: (e: React.FormEvent<HTMLSelectElement>) => void;

  sum: number;
  note: string;
  handleNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ReceiptOverViewTemplate: React.FC<Props> = ({
  manufacturers,
  staffEmail,

  selectedManufacturer,

  handleManufacturerChange,

  handleNoteChange,
  sum,
  note,
  handleSubmit,
}) => {
  return (
    <Box w="20%" bgColor="white" position="relative">
      <Flex alignItems="center" ml="2%" mt="8%">
        <Icon as={MdPerson} />
        <Text>{staffEmail}</Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" mt="8%">
        <Text ml="2%">Manufacturer</Text>
        <Select
          mr="2%"
          w="40%"
          name="manufacturer"
          onChange={handleManufacturerChange}
          value={selectedManufacturer}
        >
          {manufacturers.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mt="8%"
        pl="2%"
        pr="2%"
      >
        <Text>Pay</Text>
        <Text>{sum}</Text>
      </Flex>
      {/* <Box>Note</Box> */}
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
export default ReceiptOverViewTemplate;
