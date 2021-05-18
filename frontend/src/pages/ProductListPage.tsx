import React from "react";
import MainLayout from "layouts/MainLayout";
import ProductListContainer from "containers/ProductListContainer";

import { Redirect } from "react-router-dom";

const ProductListPage: React.FC = () => {
  return (
    <MainLayout>
      <ProductListContainer />
    </MainLayout>
  );
};

export default ProductListPage;
