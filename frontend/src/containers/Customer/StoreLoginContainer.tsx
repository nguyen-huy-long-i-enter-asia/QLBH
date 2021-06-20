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
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
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

const StoreLoginContainer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <form onSubmit={handleSubmit}>
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
            fontSize="1.5em"
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
            fontSize="1.5em"
          />
        </InputGroup>

        <Input
          m="1rem 20%"
          type="submit"
          value="Login"
          color="white"
          bgColor="#53c7bd"
          w="60%"
          //   m="auto"
          d="block"
          fontWeight="bold"
          size="lg"
        />

        <Text m="auto">
          Dont have account?
          <Link href="http://localhost:3000/store/register" color="#329a91">
            SignUp Now
          </Link>
        </Text>
      </form>
    </Box>
  );
};

export default StoreLoginContainer;
