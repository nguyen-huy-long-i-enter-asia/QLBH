import React from "react";
import LoginLayout from "layouts/LoginLayout";
import LoginContainer from "containers/LoginContainer";

type Props = {
  isAuth: boolean;
};

const LoginPage: React.FC<Props> = ({ isAuth: bolean }) => {
  return (
    <LoginLayout>
      <LoginContainer />
    </LoginLayout>
  );
};

export default LoginPage;
