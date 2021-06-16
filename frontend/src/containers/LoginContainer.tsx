import React, { useState } from "react";
import CustomInput from "components/atoms/CustomInput";
import CustomButton from "components/atoms/CustomButton";
import axios from "axios";
import {
  Input,
  Button,
  Box,
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
  useToast,
} from "@chakra-ui/react";
import { css, SerializedStyles } from "@emotion/react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const loginCss = css`
  background-color: white;
  border-radius: 30px;
`;
const input = css`
  width: 500px;
`;
type User = {
  userName: string;
  password: string;
};

const LoginContainer: React.FC = () => {
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
        alert(`${result.data.email}/${result.data.position}`);

        Cookies.set("email", result.data.email);
        Cookies.set("position", result.data.position);
        if (result.data.position === 3) {
          history.push("/store");
        } else {
          history.push("/products");
        }
      } else {
        window.location.reload(false);
      }
    }
  };
  return (
    <Box css={loginCss}>
      <form onSubmit={handleSubmit}>
        <Table>
          <Tbody>
            <Tr>
              <Td>Email</Td>
              <Td>
                <Input
                  name="email"
                  value={email}
                  onChange={changeEmail}
                  required
                />
              </Td>
            </Tr>
            <Tr>
              <Td>Password</Td>
              <Td>
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={changePassword}
                  required
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>

        <Input type="submit" value="Manager" />
        <Button>Customer</Button>
      </form>
    </Box>
  );
};

export default LoginContainer;
