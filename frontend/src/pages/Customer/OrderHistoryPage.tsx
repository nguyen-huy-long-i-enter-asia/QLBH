import React from "react";
import CustomerLayout from "layouts/CustomerLayout";
import OrderHistoryContainer from "containers/Customer/OrderHistoryContainer";
import { Redirect } from "react-router-dom";

const OrderHistoryPage: React.FC = () => {
  return (
    <CustomerLayout>
      <OrderHistoryContainer />
    </CustomerLayout>
  );
};

export default OrderHistoryPage;
