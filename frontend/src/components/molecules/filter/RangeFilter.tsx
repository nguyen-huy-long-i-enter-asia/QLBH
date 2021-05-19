import React from "react";
import {
  Box,
  Checkbox,
  Button,
  Flex,
  Text,
  InputGroup,
  Input,
  InputLeftAddon,
} from "@chakra-ui/react";
import "components/molecules/filter/filter.css";

type Props = {
  filterName: string;
  smallest: number;
  biggest: number;
  handleSet: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleUnset: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleSmallestChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBiggestChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RangeFilter: React.FC<Props> = ({
  filterName,
  smallest,
  biggest,
  handleSet,
  handleUnset,
  handleSmallestChange,
  handleBiggestChange,
}) => {
  return (
    <Box className="filter-box" p="4% 0">
      <Box className="filter-name" p="0 4%">
        <Text fontSize="16px" fontWeight="bold">
          {filterName}
        </Text>
      </Box>
      <Box className="filter-conditions" p="4% 4% 0">
        <InputGroup>
          <InputLeftAddon>From</InputLeftAddon>
          <Input
            type="number"
            value={smallest}
            onChange={handleSmallestChange}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon>From</InputLeftAddon>
          <Input type="number" value={biggest} onChange={handleBiggestChange} />
        </InputGroup>
        <Flex>
          <Button onClick={handleUnset}>Unset</Button>
          <Button onClick={handleSet}>Set</Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RangeFilter;
