import React from "react";
import { Input, Box } from "@chakra-ui/react";

type Props = {
  filterName: string;
};
const TextFilter: React.FC<Props> = ({ filterName }) => {
  return (
    <Box>
      <Box bg="#99ffff">{filterName}</Box>
      <Input placeholder={`By${filterName}`} />
    </Box>
  );
};
export default TextFilter;
