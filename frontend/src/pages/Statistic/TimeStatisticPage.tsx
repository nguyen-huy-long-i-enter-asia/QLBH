import React from "react";
import MainLayout from "layouts/MainLayout";
import TimeStatisticContainer from "containers/Statistic/TimeStatisticContainer";

import { Redirect } from "react-router-dom";

const TimeStatisticPage: React.FC = () => {
  return (
    <MainLayout>
      <TimeStatisticContainer />
    </MainLayout>
  );
};

export default TimeStatisticPage;
