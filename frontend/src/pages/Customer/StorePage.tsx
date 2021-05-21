import React from "react";
import CustomerLayout from "layouts/CustomerLayout";
import StoreContainer from "containers/Customer/StoreContainer";

import { Redirect } from "react-router-dom";

const StorePage: React.FC = () => {
  return (
    <CustomerLayout>
      <StoreContainer />
    </CustomerLayout>
  );
};

export default StorePage;
