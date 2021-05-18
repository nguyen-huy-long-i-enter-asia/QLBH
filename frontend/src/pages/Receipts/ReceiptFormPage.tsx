import React from "react";
import MainLayout from "layouts/MainLayout";
import ReceiptFormContainer from "containers/Receipts/ReceiptFormContainer";

import { Redirect, useParams } from "react-router-dom";

const ReceiptFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

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
};

export default ReceiptFormPage;
