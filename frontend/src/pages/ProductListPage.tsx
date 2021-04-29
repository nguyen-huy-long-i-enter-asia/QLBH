import React from "react";
import MainLayout from "layouts/MainLayout";
import ProductListContainer from "containers/ProductListContainer";

import { Redirect } from "react-router-dom";

type Props = {
  isAuth: boolean;
};
const ProductListPage: React.FC<Props> = ({ isAuth }) => {
  if (isAuth) {
    return (
      <MainLayout>
        <ProductListContainer />
      </MainLayout>
    );
  }
  return <Redirect to="login" />;
};

export default ProductListPage;
