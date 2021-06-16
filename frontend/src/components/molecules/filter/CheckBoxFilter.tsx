import React from "react";
import { Box, Checkbox, Text, Stack } from "@chakra-ui/react";
import "components/molecules/filter/filter.css";

type Props = {
  filterName: string;
  filterConditions: {
    name: string;
    isChecked: boolean;
  }[];
  handleOnclick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CheckBoxFilter: React.FC<Props> = ({
  filterName,
  filterConditions,
  handleOnclick,
}) => {
  return (
    <Box className="filter-box" p="4% 0">
      <Text fontSize="16px" fontWeight="bold" p="0 4%">
        {filterName}
      </Text>

      <Stack className="filter-conditions" p="4% 4% 0">
        {filterConditions.map((condition) => (
          <Checkbox
            className="checkbox"
            key={`condition${condition.name}`}
            name={filterName}
            isChecked={condition.isChecked}
            onChange={handleOnclick}
            value={condition.name}
          >
            {condition.name}
          </Checkbox>
        ))}
      </Stack>
    </Box>
  );
};
export default CheckBoxFilter;
