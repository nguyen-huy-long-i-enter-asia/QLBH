import React from "react";
import CartContainer from "containers/Customer/CartContainer";
import CustomerLayout from "layouts/CustomerLayout";

const CartPage: React.FC = () => {
  return (
    <CustomerLayout>
      <CartContainer />
    </CustomerLayout>
  );
};

export default CartPage;
