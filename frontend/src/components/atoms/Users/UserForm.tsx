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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];
type Props = {
  type: string;
  user?: {
    id: number;
    name: string;
    email: string;
    password?: string;
    phone: string;
    address: string;
    image: string;
    orders?: any[];
  };
  closeModal?: any;
  handleAddNewCustomerToOrder?: (id: string) => void;
  containPassword?: boolean;
};
const UserForm: React.FC<Props> = ({
  type,
  user,
  closeModal,
  handleAddNewCustomerToOrder,
  containPassword,
}) => {
  const history = useHistory();
  const toast = useToast();
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [address, setAddress] = useState(user ? user.address : "");
  const [password, setPassword] = useState(
    user && user.password ? user.password : ""
  );
  const [passwordType, setPasswordType] = useState("password");
  const [image, setImage] = useState<File>();
  const [imageLink, setImageLink] = useState(
    user
      ? `${process.env.REACT_APP_IMG_SERVER}Avatar/${user.image}`
      : `${process.env.PUBLIC_URL}/image_upload.png`
  );

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setName(value);
  };
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setEmail(value);
  };
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPassword(value);
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

      if (user) {
        formData.append("id", user.id.toString());
      }
      formData.append("type", type);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      if (image !== undefined) {
        formData.append("image", image);
      }
      if (type === "staff" || type === "manager") {
        formData.append("password", password);
      }

      try {
        const url = `http://localhost:8765/users/${
          user === undefined ? "add" : "edit"
        }`;
        const result = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        // setCustomer of Order after add new Customer to DB
        if (result.data.status === "success") {
          if (handleAddNewCustomerToOrder !== undefined) {
            handleAddNewCustomerToOrder(
              user === undefined ? result.data.id : user.id
            );
          } else {
            sessionStorage.setItem("action", user ? "edit" : "add");
            window.location.reload(false);
          }
          if (closeModal) {
            closeModal();
          }

          toast({
            title: "Update User Infomation successful",
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        } else {
          alert("fail");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex>
          <FormLabel pl="1.5rem" w="20%">
            <Input
              display="none"
              name="image"
              type="file"
              onChange={changeImage}
              border="none"
            />
            <Image src={imageLink} cursor="pointer" boxSize="10rem" />
          </FormLabel>
          <Box w="37.5%">
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
                {containPassword ? (
                  <Tr>
                    <Td>
                      Password
                      <Text color="red" display="inline">
                        *
                      </Text>
                    </Td>
                    <Td position="relative">
                      {/* <Flex alignItems="center"> */}
                      <Input
                        value={password}
                        type={passwordType}
                        onChange={changePassword}
                        required
                      />
                      {passwordType === "password" ? (
                        <ViewIcon
                          onClick={() => {
                            setPasswordType("text");
                          }}
                          cursor="pointer"
                          position="absolute"
                          right="0px"
                          top="50%"
                          mt="-0.5em"
                          boxSize="1em"
                        />
                      ) : (
                        <ViewOffIcon
                          onClick={() => {
                            setPasswordType("password");
                          }}
                          cursor="pointer"
                          position="absolute"
                          right="0px"
                          top="50%"
                          mt="-0.5em"
                          boxSize="1em"
                        />
                      )}
                      {/* </Flex> */}
                    </Td>
                  </Tr>
                ) : (
                  <></>
                )}
              </Tbody>
            </Table>
          </Box>
          <Box w="42.5%">
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
          </Box>
        </Flex>
        <Input
          type="submit"
          value={user ? "Save" : "Add"}
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
