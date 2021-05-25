import React from "react";
import CustomerLayout from "layouts/CustomerLayout";
import StoreProductContainer from "containers/Customer/StoreProductContainer";
import { useParams, Redirect } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const StoreProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <CustomerLayout>
      <StoreProductContainer id={id} />
    </CustomerLayout>
  );
};

export default StoreProductPage;
