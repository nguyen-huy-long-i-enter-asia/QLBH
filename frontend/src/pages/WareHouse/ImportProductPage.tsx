import React from "react";
import MainLayout from "layouts/MainLayout";
import ImportProductContainer from "containers/WareHouses/ImportProductContainer";

import { Redirect } from "react-router-dom";

type Props = {
  isAuth: boolean;
};
const ImportProductPage: React.FC<Props> = ({ isAuth }) => {
  if (isAuth) {
    return (
      <MainLayout>
        <ImportProductContainer />
      </MainLayout>
    );
  }
  return <Redirect to="login" />;
};

export default ImportProductPage;
