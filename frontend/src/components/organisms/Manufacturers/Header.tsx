import React from "react";
import { Input, Box, Flex } from "@chakra-ui/react";
import ManufacturerForm from "components/atoms/Manufacturers/ManufacturerForm";

export type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];

type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header: React.FC<Props> = ({ handleSearch }) => {
  return (
    <Flex justify="space-between" w="100%">
      <Input
        className="header-input"
        placeholder="Manufacturer's Name, Email, Phone"
        onChange={handleSearch}
        w="33%"
        bgColor="white"
      />

      <Box>
        <ManufacturerForm action="add" />
      </Box>
    </Flex>
  );
};
export default Header;
