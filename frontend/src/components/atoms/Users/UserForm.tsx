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
  FormLabel,
  Image,
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

type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];
type Props = {
  customer?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    image: string;
    orders: any[];
  };
  closeModal: any;
  handleAddNewCustomerToOrder?: (id: string) => void;
};
const UserForm: React.FC<Props> = ({
  customer,
  closeModal,
  handleAddNewCustomerToOrder,
}) => {
  console.log(customer);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const toast = useToast();
  const [name, setName] = useState(customer ? customer.name : "");
  const [email, setEmail] = useState(customer ? customer.email : "");
  const [phone, setPhone] = useState(customer ? customer.phone : "");
  const [address, setAddress] = useState(customer ? customer.address : "");
  const [image, setImage] = useState<File>();
  const [imageLink, setImageLink] = useState(
    customer
      ? `${process.env.REACT_APP_IMG_SERVER}Avatar/${customer.image}`
      : `${process.env.PUBLIC_URL}/image_upload.png`
  );

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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const url = `http://localhost:8765/users/findCustomer/${customerId}`;
  //     const result = await axios.get(url);
  //     const customerData = result.data;
  //     setName(customerData.name);
  //     setEmail(customerData.email);
  //     setPhone(customerData.phone);
  //     setAddress(customerData.address);
  //     setImageLink(customerData.image);
  //   };
  // }, [customerId]);
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
    e.preventDefault();
    if (name !== "" && email !== "") {
      const formData = new FormData();

      if (customer) {
        formData.append("id", customer.id.toString());
      }
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      if (image !== undefined) {
        formData.append("image", image);
      }
      try {
        const url = `http://localhost:8765/users/${
          customer === undefined ? "add" : "edit"
        }`;
        const result = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(result.data);
        if (result.data.status === "success") {
          console.log(customer);
          if (
            customer === undefined &&
            handleAddNewCustomerToOrder !== undefined
          ) {
            console.log("add new User");
            handleAddNewCustomerToOrder(result.data.id);
          }
          closeModal();
          toast({
            title: "Update User Infomation successful",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          alert("fail");
        }
      } catch (error) {
        console.log(error);
      }
    }
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
      <form onSubmit={handleSubmit}>
        <Flex>
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
          <Table>
            <Tbody>
              <Tr>
                <Td>
                  Name
                  <Text color="red" display="inline">
                    *
                  </Text>
                </Td>
                <Td>
                  <Input value={name} onChange={changeName} required />
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Email
                  <Text color="red" display="inline">
                    *
                  </Text>
                </Td>
                <Td>
                  <Input
                    type="email"
                    value={email}
                    onChange={changeEmail}
                    required
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Table>
            <Tbody>
              <Tr>
                <Td>Phone</Td>
                <Td>
                  <Input value={phone} onChange={changePhone} />
                </Td>
              </Tr>
              <Tr>
                <Td>Address</Td>
                <Td>
                  <Input value={address} onChange={changeAddress} />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
        <Input
          type="submit"
          value={customer ? "Save" : "Add"}
          w="10%"
          m="auto"
          display="block"
          bgColor="#3399ff"
          color="white"
        />
      </form>
    </>
  );
};

export default UserForm;
