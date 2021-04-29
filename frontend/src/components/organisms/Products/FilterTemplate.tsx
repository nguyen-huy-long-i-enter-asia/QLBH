import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import CheckBoxFilter from "components/molecules/filter/CheckBoxFilter";
import TextFilter from "components/molecules/filter/TextFilter";

type Props = {
  checkboxFilters: {
    filterName: string;
    filterConditions: {
      name: string;
      isChecked: boolean;
    }[];
  }[];

  handleOnclick: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const FilterTemplate: React.FC<Props> = ({
  checkboxFilters,

  handleOnclick,
}) => {
  return (
    <VStack>
      {checkboxFilters.map((filter) => (
        <CheckBoxFilter
          key={filter.filterName}
          filterName={filter.filterName}
          filterConditions={filter.filterConditions}
          handleOnclick={handleOnclick}
        />
      ))}
      {/* {textFilters.map((filter) => (
        <TextFilter key={filter.filterName} filterName={filter.filterName} />
      ))} */}
    </VStack>
  );
};
export default FilterTemplate;
