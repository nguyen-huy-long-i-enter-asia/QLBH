import React from "react";
import MainLayout from "layouts/MainLayout";
import WareHouseContainer from "containers/WareHouses/WareHouseContainer";

import { Redirect } from "react-router-dom";

type Props = {
  isAuth: boolean;
};
const WareHousePage: React.FC<Props> = ({ isAuth }) => {
  if (isAuth) {
    return (
      <MainLayout>
        <WareHouseContainer />
      </MainLayout>
    );
  }
  return <Redirect to="login" />;
};

export default WareHousePage;
