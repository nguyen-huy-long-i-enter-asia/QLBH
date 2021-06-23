import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Image,
  Text,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "layouts/layout.css";

type CartType = {
  id: string;
  name: string;
  image: string;
  color: { id: string; name: string };
  size: { id: string; name: string };
  sellPrice: number;
  count: number;
  discount: number;
}[];

const CartContainer: React.FC = () => {
  const [cart, setCart] = useState<CartType>();
  const [total, setTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [note, setNote] = useState("");
  const history = useHistory();
  useEffect(() => {
    const cartString = sessionStorage.getItem("cart");
    if (cartString) {
      setCart(JSON.parse(cartString));
    }
  }, []);
  useEffect(() => {
    if (cart !== undefined) {
      const newTotal = cart?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.sellPrice,
        0
      );
      const newTotalDiscount = cart?.reduce(
        (accumulator, currentValue) =>
          (currentValue.sellPrice * currentValue.discount) / 100 + accumulator,
        0
      );
      setTotal(newTotal);
      setTotalDiscount(newTotalDiscount);
    }
  }, [cart]);
  const deleteCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    sessionStorage.removeItem("cart");
    setCart(undefined);
  };
  const deleteItemFromCart = (index: number) => {
    if (cart !== undefined) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      sessionStorage.setItem("cart", JSON.stringify(newCart));
    }
    window.location.reload(false);
  };
  const decreaseCount = (index: number) => {
    if (cart !== undefined) {
      const newCart = [...cart];
      newCart[index] = { ...newCart[index], count: newCart[index].count - 1 };
      setCart(newCart);
      sessionStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  const increaseCount = (index: number) => {
    if (cart !== undefined) {
      const newCart = [...cart];
      newCart[index] = { ...newCart[index], count: newCart[index].count + 1 };
      setCart(newCart);
      sessionStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  const handleChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setNote(value);
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const url = `http://localhost:8765/orders/addByCustomer/`;
    const customerEmail = Cookies.get("email");
    const formData = new FormData();
    console.log(JSON.stringify(cart));
    formData.append("order_details", JSON.stringify(cart));
    formData.append("pay", (total - totalDiscount).toString(10));
    if (customerEmail !== undefined) {
      formData.append("customer_email", customerEmail);
    }
    formData.append("note", note);

    try {
      const result = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      alert(result.data.status);
      sessionStorage.removeItem("cart");
      history.push("/store");
    } catch (error) {
      console.log(error);
    }
  };
  if (cart !== undefined) {
    return (
      <Box className="content">
        <Flex w="100%" justifyContent="center">
          <Box w="60%" mr="2%">
            <Flex justifyContent="space-between" m="1rem 0px">
              <Button bgColor="#3498fd" fontSize="16px" color="white">
                <Link to="/store">Back To MainPage</Link>
              </Button>
              <Button
                onClick={deleteCart}
                bgColor="#3498fd"
                fontSize="16px"
                color="white"
              >
                Delete Cart
              </Button>
            </Flex>
            <Table>
              <Tbody>
                {cart.map((item, index) => (
                  <Tr bgColor="white">
                    <Td w="2%">
                      <DeleteIcon
                        fontSize="16px"
                        cursor="pointer"
                        onClick={() => deleteItemFromCart(index)}
                      />
                    </Td>
                    <Td w="28%">
                      <Image
                        w="10rem"
                        src={`http://localhost:8765/img/${item.image}`}
                      />
                    </Td>
                    <Td w="20%">
                      {" "}
                      <Box>
                        <Box>
                          <Text>{item.name}</Text>
                        </Box>

                        <Text>{`${item.size.name}     ${item.color.name}`}</Text>
                      </Box>
                    </Td>
                    {item.discount > 0 ? (
                      <Td w="30%">
                        <Text d="inline-block">
                          {(item.sellPrice *
                            item.count *
                            (100 - item.discount)) /
                            100}
                        </Text>
                        <Text
                          ml="1rem"
                          d="inline-block"
                          textDecoration={
                            item.discount > 0 ? "line-through" : "none"
                          }
                        >
                          {item.sellPrice * item.count}
                        </Text>
                        <Text d="inline-block">{`(-${item.discount}%)`}</Text>
                      </Td>
                    ) : (
                      <Td>
                        <Text d="inline-block">
                          {(item.sellPrice *
                            item.count *
                            (100 - item.discount)) /
                            100}
                        </Text>
                      </Td>
                    )}

                    <Td w="20%">
                      <Flex>
                        <IconButton
                          borderRadius="0px"
                          border=" 1px solid #e7e7e7"
                          aria-label="increase"
                          fontSize="16px"
                          icon={<MinusIcon />}
                          onClick={() => increaseCount(index)}
                        />
                        <Box
                          border=" 1px solid #e7e7e7"
                          w="2.5rem"
                          h="2.5rem"
                          d="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          {item.count}
                        </Box>

                        <IconButton
                          borderRadius="0px"
                          border=" 1px solid #e7e7e7"
                          aria-label="increase"
                          fontSize="16px"
                          icon={<AddIcon />}
                          onClick={() => increaseCount(index)}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Box
            position="relative"
            w="20%"
            bgColor="white"
            d="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Table>
              <Tbody>
                <Tr>
                  <Td>Total:</Td>
                  <Td>{total}</Td>
                </Tr>
                <Tr>
                  <Td colSpan={2} fontWeight="bold">
                    -
                  </Td>
                </Tr>
                <Tr>
                  <Td>Discount:</Td>
                  <Td>{totalDiscount}</Td>
                </Tr>
                <Td colSpan={2}>
                  <hr style={{ width: "100%", border: "1px solid black" }} />
                </Td>

                <Tr>
                  <Td>Pay</Td>
                  <Td>{total - totalDiscount}</Td>
                </Tr>
              </Tbody>
            </Table>
            <Textarea
              placeholder="Type address and phone number,time"
              value={note === "" ? undefined : note}
              onChange={handleChangeNote}
            />
            <Button
              position="absolute"
              onClick={handleSubmit}
              bgColor="#3498fd"
              color="white"
              bottom="1rem"
            >
              Submit
            </Button>
          </Box>
        </Flex>
      </Box>
    );
  }
  return (
    <Box>
      <Text>Empty cart</Text>
    </Box>
  );
};
export default CartContainer;
