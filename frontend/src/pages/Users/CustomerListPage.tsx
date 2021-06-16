import React from "react";
import MainLayout from "layouts/MainLayout";
import CustomerListContainer from "containers/Users/CustomerListContainer";

import { Redirect } from "react-router-dom";

const CustomerListPage: React.FC = () => {
  return (
    <MainLayout>
      <CustomerListContainer />
    </MainLayout>
  );
};

export default CustomerListPage;
