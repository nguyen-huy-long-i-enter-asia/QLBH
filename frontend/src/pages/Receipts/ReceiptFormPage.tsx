import React from "react";
import MainLayout from "layouts/MainLayout";
import ReceiptFormContainer from "containers/Receipts/ReceiptFormContainer";

import { Redirect, useParams } from "react-router-dom";

type Props = {
  isAuth: boolean;
};
const ReceiptFormPage: React.FC<Props> = ({ isAuth }) => {
  const { id } = useParams<{ id: string }>();

  if (isAuth) {
    if (id) {
      return (
        <MainLayout>
          <ReceiptFormContainer receiptId={id} />
        </MainLayout>
      );
    }
    return (
      <MainLayout>
        <ReceiptFormContainer />
      </MainLayout>
    );
  }
  return <Redirect to="login" />;
};

export default ReceiptFormPage;
