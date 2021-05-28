import React from "react";
import MainLayout from "layouts/MainLayout";
import OrderListContainer from "containers/Orders/OrderListContainer";
import { Redirect } from "react-router-dom";

const OrderListPage: React.FC = () => {
  return (
    <MainLayout>
      <OrderListContainer />
    </MainLayout>
  );
};

export default OrderListPage;
