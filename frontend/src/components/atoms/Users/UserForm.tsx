/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Image,
  FormLabel,
  VStack,
  Select,
  Checkbox,
  Table,
  Text,
  Tr,
  Td,
  FormControl,
  Tbody,
  Textarea,
} from "@chakra-ui/react";

type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];
type Props = {
  customerId?: number;
  modalButton: React.ReactNode;
};
const ProductForm: React.FC<Props> = ({ customerId, modalButton }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [name, setName] = useState(selectedProduct ? selectedProduct.name : "");
  // const [manufacturer, setManufacturer] = useState<string>(
  //   selectedProduct ? selectedProduct.manufacturer.id : "1"
  // );
  // const [discount, setDiscount] = useState<string>(
  //   selectedProduct ? selectedProduct.discount : ""
  // );
  // const [stateId, setStateId] = useState<string>(
  //   selectedProduct ? selectedProduct.state : "1"
  // );
  // const [originalPrice, setOriginalPrice] = useState<string>(
  //   selectedProduct ? selectedProduct.original_price : ""
  // );
  // const [sellPrice, setSellPrice] = useState<string>(
  //   selectedProduct ? selectedProduct.sell_price : ""
  // );
  // const [categories, setCategories] = useState<CategoriesList>([]);
  // const [note, setNote] = useState(selectedProduct ? selectedProduct.note : "");
  // const [image, setImage] = useState<File>();
  // const [imageLink, setImageLink] = useState<string>(
  //   selectedProduct
  //     ? selectedProduct.image
  //     : `${process.env.PUBLIC_URL}/image_upload.png`
  // );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<File>();
  const [imageLink, setImageLink] = useState("");

  // if (selectedProduct) {
  //   const [name,setName] = useState(selectedProduct.name);
  //   const[manufact](selectedProduct.manufacturer.id);
  //   setDiscount(selectedProduct.discount);
  //   setState(selectedProduct.state);
  //   setOriginalPrice(selectedProduct.original_price);
  //   setSellPrice(selectedProduct.sell_price);

  //   setNote(selectedProduct.note);

  //   setImageLink(selectedProduct.image);
  // }
  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:8765/users/find/${customerId}`;
    };
  }, [customerId]);
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setName(value);
  };
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setEmail(value);
  };
  const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPhone(value);
  };
  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setAddress(value);
  };
  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(URL.createObjectURL(e.target.files[0]));
    if (e.target) {
      if (e.target.files) {
        setImage(e.target.files[0]);

        setImageLink(URL.createObjectURL(e.target.files[0]));
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("a");
    // e.preventDefault();
    // if (name !== "" && originalPrice !== "" && sellPrice !== "") {
    //   const formData = new FormData();
    //   if (action === "edit" && selectedProduct) {
    //     formData.append("id", selectedProduct.id);
    //   }
    //   formData.append("name", name);
    //   formData.append("manufacturer", manufacturer);
    //   formData.append("discount", discount);
    //   formData.append("state_id", stateId);
    //   formData.append("original_price", originalPrice);
    //   formData.append("sell_price", sellPrice);
    //   // console.log(
    //   //   JSON.stringify(
    //   //     categories
    //   //       .filter((item) => item.isChecked === true)
    //   //       .map((item) => item.id)
    //   //   )
    //   // );
    //   formData.append(
    //     "categories",
    //     JSON.stringify(
    //       categories
    //         .filter((item) => item.isChecked === true)
    //         .map((item) => item.id)
    //     )
    //   );

    //   if (image !== undefined) {
    //     formData.append("image", image);
    //   }
    //   formData.append("note", note);

    //   try {
    //     const url = `http://localhost:8765/products/${action}`;
    //     const result = await axios.post(url, formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });
    //     // console.log(result.data);
    //     if (result.data.status) {
    //       alert("Add product successfull");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }

    //   window.location.reload(false);
    // }
  };

  return (
    <>
      {/* <Button
        className="button "
        onClick={onOpen}
        bgColor="#3399ff"
        color="white"
      >
        {modalButton}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="#ededed">Add new Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Flex>
                <Table>
                  <Tbody>
                    <Tr>
                      <Td fontWeight="bold">Name</Td>

                      <Td>
                        <Input
                          name="name"
                          value={name}
                          onChange={changeName}
                          required
                        />
                      </Td>
                    </Tr>

                    <Tr>
                      <Td fontWeight="bold">Manufacturer</Td>
                      <Td>
                        <Select
                          name="manufacturer"
                          onChange={changeManufacturer}
                          value={manufacturer}
                        >
                          {manufacturersList ? (
                            manufacturersList.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))
                          ) : (
                            <></>
                          )}
                        </Select>
                      </Td>
                    </Tr>

                    <Tr>
                      <Td fontWeight="bold">Discount</Td>
                      <Td>
                        <Input
                          name="discount"
                          type="number"
                          onChange={changeDiscount}
                          value={discount}
                        />
                      </Td>
                    </Tr>

                    <Tr>
                      <Td fontWeight="bold">State</Td>
                      <Td>
                        <Select
                          name="state"
                          onChange={changeStateId}
                          value={stateId}
                        >
                          {productStatesList !== undefined ? (
                            productStatesList.map((state) => (
                              <option value={state.id}>{state.name} </option>
                            ))
                          ) : (
                            <></>
                          )}
                        </Select>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Table>
                  <Tbody>
                    <Tr>
                      <Td fontWeight="bold">Original Price</Td>
                      <Td>
                        <Input
                          name="original_price"
                          type="number"
                          onChange={changeOriginalPrice}
                          value={originalPrice}
                          required
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Sell Price</Td>
                      <Td>
                        <Input
                          name="sell_price"
                          type="number"
                          onChange={changeSellPrice}
                          value={sellPrice}
                          required
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Categories</Td>
                      <Td>
                        <VStack>
                          {categories.map((item) => (
                            <Checkbox
                              key={item.id}
                              name="categories"
                              value={item.id}
                              isChecked={item.isChecked}
                              onChange={changeCategories}
                            >
                              {item.name}
                            </Checkbox>
                          ))}
                        </VStack>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Flex>
              <Box w="100%">
                <Box pl="1.5rem">
                  <Text fontWeight="bold">Note</Text>
                </Box>
                <Box pl="1.5rem" w="100%">
                  <Textarea name="note" onChange={changeNote} value={note} />
                </Box>
              </Box>
              <Flex>
                <Box pl="1.5rem">
                  <Text fontWeight="bold">Image</Text>
                </Box>
                <FormLabel pl="1.5rem">
                  <Input
                    display="none"
                    name="image"
                    type="file"
                    onChange={changeImage}
                    border="none"
                  />
                  <Image src={imageLink} cursor="pointer" boxSize="10rem" />
                </FormLabel>
              </Flex>
              <Box mt="3%">
                <Input
                  type="submit"
                  value="Submit"
                  w="10%"
                  m="auto"
                  display="block"
                  bgColor="#3399ff"
                  color="white"
                />
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  );
};
export default ProductForm;
