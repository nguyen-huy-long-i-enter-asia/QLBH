/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Box, Select, Text } from "@chakra-ui/react";
import CheckBoxFilter from "components/molecules/filter/CheckBoxFilter";

import "layouts/layout.css";

type Props = {
  checkboxFilters?: {
    filterName: string;
    filterConditions: {
      name: string;
      isChecked: boolean;
    }[];
  }[];

  handleCheckBoxClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const ProductFilterDraw: React.FC<Props> = ({
  checkboxFilters,
  handleCheckBoxClick,
}) => {
  return (
    <Box className="filter-list">
      {checkboxFilters !== undefined ? (
        checkboxFilters.map((filter) => (
          <CheckBoxFilter
            key={filter.filterName}
            filterName={filter.filterName}
            filterConditions={filter.filterConditions}
            handleOnclick={handleCheckBoxClick}
          />
        ))
      ) : (
        <> </>
      )}

      {/* {textFilters.map((filter) => (
        <TextFilter key={filter.filterName} filterName={filter.filterName} />
      ))} */}
    </Box>
  );
};
export default ProductFilterDraw;
