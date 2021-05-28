import React from "react";
import MainLayout from "layouts/MainLayout";
import OrderFormContainer from "containers/Orders/OrderFormContainer";

import { Redirect, useParams } from "react-router-dom";

const OrderFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (id) {
    return (
      <MainLayout>
        <OrderFormContainer orderId={id} />
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <OrderFormContainer />
    </MainLayout>
  );
};

export default OrderFormPage;
