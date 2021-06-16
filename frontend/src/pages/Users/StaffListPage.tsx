import React from "react";
import MainLayout from "layouts/MainLayout";
import StaffListContainer from "containers/Users/StaffListContainer";

import { Redirect } from "react-router-dom";

const StaffListPage: React.FC = () => {
  return (
    <MainLayout>
      <StaffListContainer />
    </MainLayout>
  );
};

export default StaffListPage;
