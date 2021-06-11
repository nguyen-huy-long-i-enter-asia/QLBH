import React from "react";
import MainLayout from "layouts/MainLayout";
import ManufacturerListContainer from "containers/ManufacturerListContainer";

import { Redirect } from "react-router-dom";

const ManufacturerListPage: React.FC = () => {
  return (
    <MainLayout>
      <ManufacturerListContainer />
    </MainLayout>
  );
};

export default ManufacturerListPage;
