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
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import "components/molecules/filter/filter.css";

type Props = {
  rangeFilterStates: {
    smallest: number;
    biggest: number;
  };
  rangeFilterConst: {
    filterName: string;
    handleSet: (e: React.MouseEvent<HTMLInputElement>) => void;
    handleUnset: (e: React.MouseEvent<HTMLInputElement>) => void;
    handleSmallestChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBiggestChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

const RangeFilter: React.FC<Props> = ({
  rangeFilterStates,
  rangeFilterConst,
}) => {
  return (
    <Box className="filter-box" p="4% 0">
      <Box className="filter-name" p="0 4%">
        <Text fontSize="16px" fontWeight="bold">
          {rangeFilterConst.filterName}
        </Text>
      </Box>
      <Box className="filter-conditions" p="4% 4% 0">
        <InputGroup>
          <InputLeftAddon w="30%">From</InputLeftAddon>
          <Input
            type="number"
            value={rangeFilterStates.smallest}
            onChange={rangeFilterConst.handleSmallestChange}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon w="30%">To</InputLeftAddon>
          <Input
            type="number"
            value={rangeFilterStates.biggest}
            onChange={rangeFilterConst.handleBiggestChange}
          />
        </InputGroup>
        <RadioGroup>
          <Stack direction="row">
            <Radio value="false" onClick={rangeFilterConst.handleUnset}>
              Unset
            </Radio>
            <Radio value="true" onClick={rangeFilterConst.handleSet}>
              Set
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default RangeFilter;
