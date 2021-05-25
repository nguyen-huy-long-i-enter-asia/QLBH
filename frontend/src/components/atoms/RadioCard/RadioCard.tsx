/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Box } from "@chakra-ui/react";
import "components/atoms/RadioCard/radioCard.css";

type Props = {
  options: {
    id: string;
    name: string;
  }[];
  handleClick: (e: React.MouseEvent<HTMLInputElement>) => void;
};
const RadioCard: React.FC<Props> = ({ options, handleClick }) => {
  return (
    <div className="radio-button-groups">
      <form>
        {options.map((option) => (
          <label className="radio-button">
            <input
              type="radio"
              name="toggle"
              id={option.name}
              value={option.id}
              onClick={handleClick}
            />
            <span>{option.name}</span>
          </label>
        ))}
      </form>
    </div>
  );
};
export default RadioCard;
