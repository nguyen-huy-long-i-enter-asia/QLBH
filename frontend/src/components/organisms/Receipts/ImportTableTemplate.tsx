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
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import CustomThead from "components/atoms/CustomThead";
import ProductExpandContent from "components/molecules/Products/ProductExpandContent";

const tableStyle = css`
  border: groove;
`;

type Props = {
  colors: {
    id: string;
    name: string;
  }[];
  sizes: {
    id: string;
    name: string;
  }[];
  importList: {
    id: string;
    name: string;
    original_price: number;
    count: number;
    size_id: string;
    color_id: string;
    total: number;
  }[];
  handleSizeChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  handleColorChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  handleCountChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleDeleteRD: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ImportTableTemplate: React.FC<Props> = ({
  colors,
  sizes,
  importList,
  handleSizeChange,
  handleColorChange,
  handleCountChange,
  handleDeleteRD,
}) => {
  return (
    <Table bgColor="white">
      <Thead bgColor="#3cc7bd">
        <Th>ID</Th>
        <Th>Product</Th>
        <Th>Size</Th>
        <Th>Color</Th>
        <Th>Count</Th>
        <Th>Price</Th>
        <Th>Total</Th>
        <Th />
      </Thead>
      <Tbody>
        {importList.map((importItem, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tr key={index}>
            <Td>{importItem.id}</Td>
            <Td>{importItem.name}</Td>
            <Td>
              <Select
                id={index.toString()}
                name="size"
                onChange={handleSizeChange}
                value={importItem.size_id}
              >
                {sizes.map((sizeItem) => (
                  <option key={sizeItem.id} value={sizeItem.id}>
                    {sizeItem.name}
                  </option>
                ))}
              </Select>
            </Td>
            <Td>
              <Select
                id={index.toString()}
                name="color"
                onChange={handleColorChange}
                value={importItem.color_id}
              >
                {colors.map((colorItem) => (
                  <option key={colorItem.id} value={colorItem.id}>
                    {colorItem.name}
                  </option>
                ))}
              </Select>
            </Td>
            <Td>
              <Input
                id={index.toString()}
                name="count"
                value={importItem.count.toString()}
                type="number"
                onChange={handleCountChange}
              />
            </Td>
            <Td>{importItem.original_price}</Td>
            <Td>{importItem.total}</Td>
            <Td>
              <Button
                bgColor="transparent"
                id={index.toString()}
                onClick={handleDeleteRD}
              >
                <DeleteIcon />
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
export default ImportTableTemplate;
