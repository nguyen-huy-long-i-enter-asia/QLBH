import React from "react";
import MainLayout from "layouts/MainLayout";
import StoreContainer from "containers/Customer/StoreContainer";

import { Redirect } from "react-router-dom";

const ProductListPage: React.FC = () => {
  return (
    <MainLayout>
      <StoreContainer />
    </MainLayout>
  );
};

export default ProductListPage;
