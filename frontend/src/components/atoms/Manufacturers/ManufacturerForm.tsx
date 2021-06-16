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
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

type Props = {
  action: string;
  selectedManufacturer?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    note: string;
  };
};
const ManufacturerForm: React.FC<Props> = ({
  action,
  selectedManufacturer,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(
    selectedManufacturer ? selectedManufacturer.name : ""
  );
  const [email, setEmail] = useState(
    selectedManufacturer ? selectedManufacturer.email : ""
  );
  const [phone, setPhone] = useState(
    selectedManufacturer ? selectedManufacturer.phone : ""
  );
  const [address, setAddress] = useState(
    selectedManufacturer ? selectedManufacturer.address : ""
  );
  const [note, setNote] = useState(
    selectedManufacturer ? selectedManufacturer.note : ""
  );
  const history = useHistory();
  const toast = useToast();

  // useEffect(() => {
  //   if (categoriesList) {
  //     if (selectedProduct) {
  //       const productCategories = selectedProduct.categories.map(
  //         (item) => item.id
  //       );
  //       // console.log(
  //       //   categoriesList.map((category) => ({
  //       //     id: category.id,
  //       //     name: category.name,
  //       //     isChecked: !!productCategories.includes(category.id),
  //       //   }))
  //       // );
  //       setCategories(
  //         categoriesList.map((category) => ({
  //           id: category.id,
  //           name: category.name,
  //           isChecked: !!productCategories.includes(category.id),
  //         }))
  //       );
  //     } else {
  //       setCategories(categoriesList);
  //     }
  //   }

  //   // console.log(image);
  // }, [categoriesList]);

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
  const changeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setNote(value);
  };

  // const changeManufacturer = (e: React.FormEvent<HTMLSelectElement>) => {
  //   const { value } = e.currentTarget;
  //   setManufacturer(value);
  // };
  // const changeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.currentTarget;
  //   setDiscount(value);
  // };
  // const changeStateId = (e: React.FormEvent<HTMLSelectElement>) => {
  //   const { value } = e.currentTarget;

  //   setStateId(value);
  // };
  // const changeOriginalPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.currentTarget;
  //   setOriginalPrice(value);
  // };
  // const changeSellPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.currentTarget;
  //   setSellPrice(value);
  // };
  // const changeCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.currentTarget;
  //   const newCategoriesState = categories.map((item) => {
  //     if (String(item.id) === value) {
  //       return {
  //         id: item.id,
  //         name: item.name,
  //         isChecked: !item.isChecked,
  //       };
  //     }
  //     return item;
  //   });
  //   setCategories(newCategoriesState);
  // };

  // const changeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const { value } = e.currentTarget;
  //   setNote(value);
  // };
  // const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // console.log(URL.createObjectURL(e.target.files[0]));
  //   if (e.target) {
  //     if (e.target.files) {
  //       setImage(e.target.files[0]);

  //       setImageLink(URL.createObjectURL(e.target.files[0]));
  //     }
  //   }
  // };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (name !== "" && originalPrice !== "" && sellPrice !== "") {
  //     const formData = new FormData();
  //     if (action === "edit" && selectedProduct) {
  //       formData.append("id", selectedProduct.id);
  //     }
  //     formData.append("name", name);
  //     formData.append("manufacturer", manufacturer);
  //     formData.append("discount", discount);
  //     formData.append("state_id", stateId);
  //     formData.append("original_price", originalPrice);
  //     formData.append("sell_price", sellPrice);
  //     // console.log(
  //     //   JSON.stringify(
  //     //     categories
  //     //       .filter((item) => item.isChecked === true)
  //     //       .map((item) => item.id)
  //     //   )
  //     // );
  //     formData.append(
  //       "categories",
  //       JSON.stringify(
  //         categories
  //           .filter((item) => item.isChecked === true)
  //           .map((item) => item.id)
  //       )
  //     );

  //     if (image !== undefined) {
  //       formData.append("image", image);
  //     }
  //     formData.append("note", note);

  //     try {
  //       const url = `http://localhost:8765/products/${action}`;
  // const result = await axios.post(url, formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //       });
  //       // console.log(result.data);
  //       if (result.data.status === "success") {
  //         console.log("a");
  //         alert("Add product successfull");
  //         window.location.reload(false);
  //       } else {
  //         console.log(result.data.status);
  //         alert("Fail");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name !== "") {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("note", note);
      if (selectedManufacturer) {
        formData.append("id", selectedManufacturer.id.toString());
      }
      const url = `${process.env.REACT_APP_SERVER}manufacturers/${action}`;
      const result = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.data.status === "success") {
        sessionStorage.setItem("action", action);
        window.location.reload(false);
      } else {
        toast({
          title: `${action === "add" ? "Add" : "Edit"} Manufacturer fail`,

          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Button
        className="button "
        onClick={onOpen}
        bgColor="#3399ff"
        color="white"
      >{`${
        action.charAt(0).toUpperCase() + action.slice(1)
      } Manufacturer`}</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="#ededed">
            {action === "add" ? "Add new Manufacturer" : "Edit Manufacturer"}
          </ModalHeader>
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
                      <Td fontWeight="bold">Email</Td>
                      <Td>
                        <Input
                          name="email"
                          type="email"
                          value={email}
                          onChange={changeEmail}
                          required
                        />
                      </Td>
                    </Tr>

                    <Tr>
                      <Td fontWeight="bold">Phone</Td>
                      <Td>
                        <Input
                          name="phone"
                          onChange={changePhone}
                          value={phone}
                          type="tel"
                          pattern="[0-9]{10}"
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Table>
                  <Tbody>
                    <Tr>
                      <Td fontWeight="bold">Address</Td>
                      <Td>
                        <Input
                          name="address"
                          onChange={changeAddress}
                          value={address}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="bold">Note</Td>
                      <Td>
                        <Textarea
                          name="Note"
                          onChange={changeNote}
                          value={note}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
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
      </Modal>
    </>
  );
};
export default ManufacturerForm;
