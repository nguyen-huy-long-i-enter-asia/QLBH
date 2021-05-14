import React from "react";
import MainLayout from "layouts/MainLayout";
import ReceiptListContainer from "containers/Receipts/ReceiptListContainer";

import { Redirect } from "react-router-dom";

type Props = {
  isAuth: boolean;
};
const ReceiptListPage: React.FC<Props> = ({ isAuth }) => {
  if (isAuth) {
    return (
      <MainLayout>
        <ReceiptListContainer />
      </MainLayout>
    );
  }
  return <Redirect to="login" />;
};

export default ReceiptListPage;
