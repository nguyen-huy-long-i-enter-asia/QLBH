import React, { ReactNode } from "react";
import { Button } from "@chakra-ui/react";
import { css, SerializedStyles } from "@emotion/react";

const buttonStyle = css`
  width: 100px;
`;

type ButtonProps = {
  children?: ReactNode;
  isActive?: boolean;
  additionStyle?: SerializedStyles;
  handleClick?: any;
  test?: string;
  objectId?: string;
};

const CustomButton: React.FC<ButtonProps> = ({
  children,
  isActive,
  additionStyle,
  handleClick,
  test,
  objectId,
}) => {
  return (
    <>
      {test ? (
        <a href={test}>123</a>
      ) : (
        <Button
          isActive={isActive}
          css={[buttonStyle, additionStyle]}
          onClick={handleClick}
          id={objectId}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
