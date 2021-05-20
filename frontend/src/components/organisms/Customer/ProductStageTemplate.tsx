import React from "react";
import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  dataList: any;
};
const ProductStageTemplate: React.FC<Props> = ({ dataList }) => {
  return (
    <Flex wrap="wrap">
      {dataList.map((item: any) => (
        <Link to="/products" style={{ width: "20%" }}>
          <Box border="1px solid gray">
            <Box>
              <Image src={item.image} display="block" w="100%" h="20rem" />
            </Box>{" "}
            <Box>
              <Text>{item.name}</Text>
              <Text>{item.sell_price}</Text>
              <Text>{item.discount}</Text>
            </Box>
          </Box>
        </Link>
      ))}
    </Flex>
  );
};
export default ProductStageTemplate;
