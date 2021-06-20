import React, { useState } from "react";
import CustomInput from "components/atoms/CustomInput";
import CustomButton from "components/atoms/CustomButton";
import axios from "axios";
import {
  Input,
  Button,
  Box,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Image,
  InputGroup,
  InputLeftElement,
  Icon,
  FormLabel,
  VStack,
  Select,
  Checkbox,
  Table,
  Tr,
  Td,
  Tbody,
  Textarea,
  TabsProvider,
  Text,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, PhoneIcon } from "@chakra-ui/icons";
import { BiUser } from "react-icons/bi";
import { GiPositionMarker } from "react-icons/gi";
import { css, SerializedStyles } from "@emotion/react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const loginCss = css`
  background: rgba(255, 255, 255, 0.04);
  box-shadow: -1px 4px 28px 0px rgba(0, 0, 0, 0.75);
  width: 30%;
  margin: auto;
  border-radius: 30px;
  text-align: center;
  padding-top: 2rem;
`;
const input = css`
  width: 60%;
  margin-top: 1rem;
  margin-left: 20%;
  margin-right: 20%;
`;
type User = {
  userName: string;
  password: string;
};

const StoreRegisterContainer: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const history = useHistory();
  const toast = useToast();
  const msg = sessionStorage.getItem("msg");
  if (msg) {
    toast({
      title: msg,
      status: "error",
      duration: 1500,
      isClosable: true,
    });
    sessionStorage.removeItem("msg");
  }
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.currentTarget.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}users/login`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.data.email !== "") {
        if (result.data.position === 3) {
          Cookies.set("email", result.data.email);
          Cookies.set("position", result.data.position);

          history.push("/store");
        } else {
          toast({
            title: "Account not found",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: result.data.msg,
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      }
    }
  };
  return (
    <Box className="LongHuy" css={loginCss}>
      <Text color="Black" fontSize="20px" fontWeight="bold">
        Register
      </Text>
      <form onSubmit={handleSubmit}>
        <InputGroup css={input}>
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<Icon as={BiUser} color="black" boxSize="1.5em" />}
            t="10%"
          />
          <Input
            type="text"
            placeholder="Enter your Name"
            value={name === "" ? undefined : name}
            onChange={changeName}
            required
            bgColor="white"
            size="lg"
          />
        </InputGroup>
        <InputGroup css={input} d="flex" alignItems="center">
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<EmailIcon color="black" fontSize="1.5em" />}
            t="10%"
          />
          <Input
            type="email"
            placeholder="Enter your Email"
            value={email === "" ? undefined : email}
            onChange={changeEmail}
            required
            bgColor="white"
            size="lg"
            opacity={1}
          />
        </InputGroup>

        <InputGroup css={input}>
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<LockIcon color="black" boxSize="1.5em" />}
            t="10%"
          />
          <Input
            type="password"
            placeholder="Enter your Password"
            value={password === "" ? undefined : password}
            onChange={changePassword}
            required
            bgColor="white"
            size="lg"
          />
        </InputGroup>

        <InputGroup css={input}>
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<PhoneIcon color="black" boxSize="1.5em" />}
            t="10%"
          />
          <Input
            type="number"
            placeholder="Enter your Phone"
            value={phone === "" ? undefined : phone}
            onChange={changePhone}
            required
            bgColor="white"
            size="lg"
          />
        </InputGroup>
        <InputGroup css={input}>
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={
              <Icon as={GiPositionMarker} color="black" boxSize="1.5em" />
            }
            t="10%"
          />
          <Input
            as={Textarea}
            type="text"
            placeholder="Enter your Address"
            value={address === "" ? undefined : address}
            onChange={changeAddress}
            required
            bgColor="white"
            size="lg"
          />
        </InputGroup>

        <Input
          m="1rem 20%"
          type="submit"
          value="Sign Up"
          color="white"
          bgColor="#53c7bd"
          w="60%"
          //   m="auto"
          d="block"
          fontWeight="bold"
          size="lg"
        />
      </form>
    </Box>
  );
};

export default StoreRegisterContainer;
