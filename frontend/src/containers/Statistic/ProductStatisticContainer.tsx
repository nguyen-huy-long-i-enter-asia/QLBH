import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Box, Flex, Text } from "@chakra-ui/react";
import FilterTemplate from "components/organisms/FilterTemplate";
import "layouts/layout.css";

type DateRangeType = {
  startDate: Date;
  endDate: Date;
};
const ProductStatisticContainer: React.FC = () => {
  const [timeOption, setTimeOption] = useState<string>("datePicker");
  const [datePicker, setDatePicker] = useState<string>("This month");
  const [dateRange, setDateRange] = useState<DateRangeType>({
    startDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    endDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
  });
  const [incomeLabels, setIncomeLabels] = useState<string[]>([]);
  const [incomeData, setIncomeData] = useState<number[]>([]);
  const [sellCountLabels, setSellCountLabels] = useState<string[]>([]);
  const [sellCountData, setSellCountData] = useState<number[]>([]);
  const handleTimeOptionChange = (e: any) => {
    const { value } = e.currentTarget;
    setTimeOption(value);
  };
  const handleTimePicker = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTimeOption("datePicker");
    setDatePicker(e.currentTarget.value);
  };
  const handleRangeTimeChange = (args: any) => {
    setDateRange({ startDate: args.startDate, endDate: args.endDate });
  };
  useEffect(() => {
    const fetchData = async () => {
      let incomeUrl = "";
      let sellCountUrl = "";
      const incomeFormData = new FormData();
      const sellCountFormData = new FormData();
      if (timeOption === "datePicker") {
        incomeUrl = `${process.env.REACT_APP_SERVER}statistic/reportProductIncomeDatePicker`;
        sellCountUrl = `${process.env.REACT_APP_SERVER}statistic/reportProductSellCountDatePicker`;
        incomeFormData.append("datePicker", datePicker);
        sellCountFormData.append("datePicker", datePicker);
      } else {
        incomeUrl = `${process.env.REACT_APP_SERVER}statistic/reportProductIncomeDateRange`;
        sellCountUrl = `${process.env.REACT_APP_SERVER}statistic/reportProductSellCountDateRange`;

        // console.log(JSON.stringify(dateRange));
        incomeFormData.append("dateRange", JSON.stringify(dateRange));
        sellCountFormData.append("dateRange", JSON.stringify(dateRange));
      }
      const incomeResult = await axios.post(incomeUrl, incomeFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const sellCountResult = await axios.post(
        sellCountUrl,
        sellCountFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(incomeResult.data.map((item: any) => item.Name));

      setIncomeLabels(incomeResult.data.map((item: any) => item.Name));
      setIncomeData(incomeResult.data.map((item: any) => item.Income));
      setSellCountLabels(sellCountResult.data.map((item: any) => item.Name));
      setSellCountData(sellCountResult.data.map((item: any) => item.SellCount));
    };
    fetchData();
  }, [timeOption, datePicker, dateRange]);
  return (
    <Flex className="content">
      <Box className="left-column">
        <FilterTemplate
          pageTitle="Statistic"
          timeFilter={{
            datePicker,
            dateRange,
            option: timeOption,
            handleRangeTimeChange,
            handleTimeOptionChange,
            handleTimePicker,
          }}
        />
      </Box>
      <Box className="right-column" bgColor="white">
        <Text>Top 10 Products by Income</Text>
        <Bar
          type="bar"
          data={{
            labels: incomeLabels,
            datasets: [
              {
                label: `Count`,
                data: incomeData,
                backgroundColor: "#3cc7bd",
              },
            ],
          }}
          options={{ indexAxis: "y" }}
          height={100}
          width={200}
        />
        <Text>Top 10 Products By Sold Count</Text>
        <Bar
          type="bar"
          data={{
            labels: sellCountLabels,
            datasets: [
              {
                label: `Count`,
                data: sellCountData,
                backgroundColor: "#3cc7bd",
              },
            ],
          }}
          options={{ indexAxis: "y" }}
          height={100}
          width={200}
        />
      </Box>
    </Flex>
  );
};
export default ProductStatisticContainer;
