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
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

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
    const url = `http://localhost:8765/orders/add/`;
    const customerEmail = Cookies.get("email");
    const formData = new FormData();
    console.log(JSON.stringify(cart));
    formData.append("order_details", JSON.stringify(cart));
    formData.append("total", (total - totalDiscount).toString(10));
    if (customerEmail !== undefined) {
      formData.append("customer_email", customerEmail);
    }
    formData.append("note", note);

    try {
      const result = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(result.data.status);
    } catch (error) {
      console.log(error);
    }
    // if (importList.length !== 0) {
    //   const formData = new FormData();
    //   formData.append("receipt_details", JSON.stringify(importList));
    //   if (staffEmail !== undefined) {
    //     formData.append("staff_email", staffEmail);
    //   }
    //   formData.append("manufacturer_id", selectedManufacturer);
    //   formData.append("total", sum.toString());
    //   formData.append("note", note);
    //   console.log(JSON.stringify(importList));
    //   try {
    //     if (receiptId) {
    //       formData.append("receipt_id", receiptId);
    //       url = `http://localhost:8765/receipts/edit/`;
    //     } else {
    //       url = `http://localhost:8765/receipts/import`;
    //     }

    //     const result = await axios.post(url, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });

    //     history.push("/receipts");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   toast({
    //     title: "Import at least 1 product.",

    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // }
  };
  if (cart !== undefined) {
    return (
      <Flex w="100%" justifyContent="center">
        <Box w="60%" mr="2%">
          <Flex justifyContent="space-between">
            <Button>
              <Link to="/store">Back To MainPage</Link>
            </Button>
            <Button onClick={deleteCart}>Delete Cart</Button>
          </Flex>
          <Table>
            <Tbody>
              {cart.map((item, index) => (
                <Tr bgColor="white">
                  <Td>
                    <Button
                      as={DeleteIcon}
                      onClick={() => deleteItemFromCart(index)}
                    />
                  </Td>
                  <Td>
                    {" "}
                    <Image src={`http://localhost:8765/img/${item.image}`} />
                  </Td>
                  <Td>
                    {" "}
                    <Box>
                      <Box>
                        <Text>{item.name}</Text>
                      </Box>
                      <Flex>
                        <Text>{`Size: ${item.size.name}`}</Text>
                        <Text>{`Color: ${item.color.name}`}</Text>
                      </Flex>
                    </Box>
                  </Td>
                  <Td>
                    {item.discount > 0 ? (
                      <Text>
                        {(item.sellPrice * item.count * (100 - item.discount)) /
                          100}
                      </Text>
                    ) : (
                      <Text>{item.sellPrice * item.count}</Text>
                    )}
                    <Text
                      textDecoration={
                        item.discount > 0 ? "line-through" : "none"
                      }
                    >
                      {item.sellPrice}
                    </Text>
                    <Text>{`(-${item.discount}%)`}</Text>
                  </Td>
                  <Td>
                    <Flex>
                      <Button
                        as={MinusIcon}
                        onClick={() => decreaseCount(index)}
                      />
                      <Box>{item.count}</Box>
                      <Button
                        as={AddIcon}
                        onClick={() => increaseCount(index)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box w="20%" bgColor="white">
          <Table>
            <Tbody>
              <Tr>
                <Td>Total:</Td>
                <Td>{total}</Td>
              </Tr>
              <Tr>
                <Td colSpan={2}>-</Td>
              </Tr>
              <Tr>
                <Td>Discount:</Td>
                <Td>{totalDiscount}</Td>
              </Tr>
              <Td colSpan={2}>
                <hr style={{ width: "100%" }} />
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
          <Button onClick={handleSubmit}> Submit</Button>
        </Box>
      </Flex>
    );
  }
  return (
    <Box>
      <Text>Empty cart</Text>
    </Box>
  );
};
export default CartContainer;
