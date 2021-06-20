import React from "react";
import LoginLayout from "layouts/LoginLayout";
import StoreLoginContainer from "containers/Customer/StoreLoginContainer";

const StoreLoginPage: React.FC = () => {
  return (
    <LoginLayout>
      <StoreLoginContainer />
    </LoginLayout>
  );
};

export default StoreLoginPage;
