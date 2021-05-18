import React from "react";
import LoginLayout from "layouts/LoginLayout";
import LoginContainer from "containers/LoginContainer";

const LoginPage: React.FC = () => {
  return (
    <LoginLayout>
      <LoginContainer />
    </LoginLayout>
  );
};

export default LoginPage;
