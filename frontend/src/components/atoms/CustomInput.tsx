import React from "react";
import { SerializedStyles } from "@emotion/react";
import { Input } from "@chakra-ui/react";

type InputProps = {
  isInvalid?: boolean;
  additionStyle?: SerializedStyles;
  read: (e: React.ChangeEvent<HTMLInputElement>) => void;
  user?: string;
};
const CustomIput: React.FC<InputProps> = ({
  isInvalid,
  additionStyle,
  read,
  user,
}) => {
  return (
    <Input
      isInvalid={isInvalid}
      value={user}
      css={[additionStyle]}
      onChange={(e) => read(e)}
      text="text"
    />
  );
};

export default CustomIput;
