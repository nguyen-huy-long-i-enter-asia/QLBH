import React from "react";
import { Bar } from "react-chartjs-2";

const TimeStatisticContainer: React.FC = () => {
  return (
    <>
      <Bar
      type="bar"
        data={{
          labels: ["NIKE", "ADIDAS", "Thuong Dinh", "Bitis", "Vans", "Guccis"],
        }}
        height={400}
        width={600}
      />
    </>
  );
};
export default TimeStatisticContainer;
