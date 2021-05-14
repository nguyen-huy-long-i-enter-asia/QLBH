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

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      alert(result.data.email);

      Cookies.set("email", result.data.email);
      Cookies.set("position", result.data.position);
      console.log(Cookies.get("email"));
      history.push("/products");
    } else {
      window.location.reload(false);
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
                <Input name="email" value={email} onChange={changeEmail} />
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
