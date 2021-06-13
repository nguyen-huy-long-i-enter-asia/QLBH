import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Text,
  FormControl,
  FormLabel,
  Flex,
  Input,
} from "@chakra-ui/react";
import "components/molecules/filter/filter.css";

type Props = {
  filterName: string;
  from: number;
  to: number;
  handleFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetRange: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleUnsetRange: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const CheckBoxFilter: React.FC<Props> = ({
  filterName,
  from,
  to,
  handleFromChange,
  handleToChange,
  handleSetRange,
  handleUnsetRange,
}) => {
  return (
    <Box className="filter-box" p="4% 0">
      <Box className="filter-name" p="0 4%">
        <Text fontSize="16px" fontWeight="bold">
          {filterName}
        </Text>
      </Box>
      <Box className="filter-conditions" p="4% 4% 0">
        <FormControl id="from">
          <Flex>
            <FormLabel>From</FormLabel>
            <Input type="number" value={from} onChange={handleFromChange} />
          </Flex>
        </FormControl>
        <FormControl id="to">
          <Flex>
            <FormLabel>To</FormLabel>
            <Input type="number" value={to} onChange={handleToChange} />
          </Flex>
        </FormControl>
        <Flex>
          <Button onClick={handleSetRange}>Set</Button>
          <Button onClick={handleUnsetRange}>UnSet</Button>
        </Flex>
      </Box>
    </Box>
  );
};
export default CheckBoxFilter;
