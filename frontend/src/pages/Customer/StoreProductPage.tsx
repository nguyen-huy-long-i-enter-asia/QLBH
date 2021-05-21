import React from "react";
import CustomerLayout from "layouts/CustomerLayout";
import StoreProductContainer from "containers/Customer/StoreProductContainer";
import { useParams, Redirect } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const StoreProductPage: React.FC = () => {
  console.log("aa");
  // const { id } = useParams<{ id: string }>();

  return (
    <CustomerLayout>
      <StoreProductContainer id="1" />
    </CustomerLayout>
  );
};

export default StoreProductPage;
