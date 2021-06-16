import React from "react";
import { Thead, Th, Tr, Button } from "@chakra-ui/react";

type Props = {
  fields: string[];
  handleSort: (e: React.MouseEvent<HTMLTableCaptionElement>) => void;
};
const CustomThead: React.FC<Props> = ({ fields, handleSort }) => {
  return (
    <Thead bgColor="#3399ff" fontWeight="bold">
      <Tr>
        {fields.map((item) => (
          <Th key={item} id={item} color="white" onClick={handleSort}>
            {item.charAt(0).toUpperCase() + item.slice(1).replace("_", " ")}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};

export default CustomThead;
