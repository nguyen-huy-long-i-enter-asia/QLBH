import React from "react";
import MainLayout from "layouts/MainLayout";
import ProductStatisticContainer from "containers/Statistic/ProductStatisticContainer";

import { Redirect } from "react-router-dom";

const ProductStatisticPage: React.FC = () => {
  return (
    <MainLayout>
      <ProductStatisticContainer />
    </MainLayout>
  );
};

export default ProductStatisticPage;
