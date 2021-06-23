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
const TimeStatisticContainer: React.FC = () => {
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
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
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
      let url = "";
      const formData = new FormData();
      if (timeOption === "datePicker") {
        url = `${process.env.REACT_APP_SERVER}statistic/reportDatePicker`;
        formData.append("datePicker", datePicker);
      } else {
        url = `${process.env.REACT_APP_SERVER}statistic/reportDateRange`;
        // console.log(JSON.stringify(dateRange));
        formData.append("dateRange", JSON.stringify(dateRange));
      }
      const result = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(result.data.map((item: any) => item.Label));
      setLabels(result.data.map((item: any) => item.Label));
      setData(result.data.map((item: any) => item.Income));
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
        <Text>
          {timeOption === "datePicker"
            ? datePicker
            : `${dateRange.startDate.toLocaleDateString(
                "en-GB"
              )} -> ${dateRange.endDate.toLocaleDateString("en-GB")}`}
        </Text>
        <Bar
          type="bar"
          data={{
            labels,
            datasets: [
              {
                label: `Income`,
                data,
                backgroundColor: "#3cc7bd",
              },
            ],
          }}
          // options={{ maintainAspectRatio: false }}
          height={100}
          width={200}
        >
          {" "}
        </Bar>
      </Box>
    </Flex>
  );
};
export default TimeStatisticContainer;
