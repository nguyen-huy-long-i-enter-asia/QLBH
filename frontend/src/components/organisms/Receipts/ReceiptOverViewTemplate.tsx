/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { css, SerializedStyles } from "@emotion/react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Select,
  VStack,
  Flex,
  Box,
  Textarea,
  Button,
} from "@chakra-ui/react";
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
    <VStack>
      <Box>{staffEmail}</Box>
      <Select
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
      <Box>{`Sum:  ${sum}`}</Box>
      Note
      <Textarea name="note" onChange={handleNoteChange} value={note} />
      <Button onClick={handleSubmit}>Submit</Button>
    </VStack>
  );
};
export default ReceiptOverViewTemplate;
