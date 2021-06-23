import React from "react";
import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  dataList: any;
};
const ProductStageTemplate: React.FC<Props> = ({ dataList }) => {
  return (
    <Flex wrap="wrap" w="100%">
      {dataList.map((item: any) => (
        <Link
          key={item.id}
          to={`/store/product/${item.id}`}
          style={{ width: "20%" }}
        >
          <Box border="1px solid gray" bgColor="white" position="relative">
            <Box>
              <Image src={item.image} display="block" w="100%" h="20rem" />
            </Box>{" "}
            <Box>
              <Text>{item.name}</Text>
              {item.discount > 0 ? (
                <Text>{(item.sell_price * (100 - item.discount)) / 100}</Text>
              ) : (
                <></>
              )}
              <Text
                textDecoration={item.discount > 0 ? "line-through" : "none"}
              >
                {item.sell_price}
              </Text>
            </Box>
            {item.discount > 0 ? (
              <Box position="absolute" top="0%" bgColor="red" m="auto" w="3rem">
                <Text color="white">{`- ${item.discount}%`}</Text>
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Link>
      ))}
    </Flex>
  );
};
export default ProductStageTemplate;
