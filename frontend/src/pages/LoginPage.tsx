import React from "react";
import MainLayout from "layouts/MainLayout";
import LoginContainer from "containers/LoginContainer";
import { Redirect } from "react-router-dom";

type Props = {
  isAuth: boolean;
};
const LoginPage: React.FC<Props> = ({ isAuth: bolean }) => {
  return (
    <MainLayout>
      <LoginContainer />
    </MainLayout>
  );
};

export default LoginPage;
