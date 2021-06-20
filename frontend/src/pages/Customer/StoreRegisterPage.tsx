import React from "react";
import LoginLayout from "layouts/LoginLayout";
import StoreRegisterContainer from "containers/Customer/StoreRegisterContainer";

const StoreRegisterPage: React.FC = () => {
  return (
    <LoginLayout>
      <StoreRegisterContainer />
    </LoginLayout>
  );
};

export default StoreRegisterPage;
