import React from "react";
import { Box, VStack, Checkbox } from "@chakra-ui/react";

type Props = {
  filterName: string;
  filterConditions: {
    name: string;
    isChecked: boolean;
  }[];
  handleOnclick: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CheckBoxFilter: React.FC<Props> = ({
  filterName,
  filterConditions,
  handleOnclick,
}) => {
  return (
    <Box>
      <Box bg="#99ffff">{filterName}</Box>
      <VStack>
        {filterConditions.map((condition) => (
          <Checkbox
            key={`condition${condition.name}`}
            name={filterName}
            isChecked={condition.isChecked}
            onChange={handleOnclick}
            value={condition.name}
          >
            {condition.name}
          </Checkbox>
        ))}
      </VStack>
    </Box>
  );
};
export default CheckBoxFilter;
