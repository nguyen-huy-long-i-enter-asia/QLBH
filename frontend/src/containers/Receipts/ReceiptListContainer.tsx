/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "components/atoms/Pagination";
import Cookies from "js-cookie";

import { useDisclosure, Box, Flex, VStack } from "@chakra-ui/react";
import MenuBarTemplate from "components/organisms/MenuBarTemplate";
import TableTemplate from "components/organisms/TableTemplate";
import FilterTemplate from "components/organisms/FilterTemplate";
import Header from "components/organisms/Receipts/Header";
import "layouts/layout.css";
import { TimePicker } from "@syncfusion/ej2-calendars";

type Filter = {
  filterName: string;
  filterConditions: {
    id: string;
    name: string;
    isChecked: boolean;
  }[];
};

const ReceiptListContainer: React.FC = () => {
  const position = Cookies.get("position");
  const [receipts, setReceipts] = useState<any[]>([]);
  const [keyWord, setKeyWord] = useState("");
  const [expandList, setExpandList] = useState<any>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [displayList, setDisplayList] = useState<any[]>([]);
  const [checkBoxFilters, setCheckBoxFilters] = useState<Filter[]>([]);
  const [staffs, setStaffs] = useState<any>([]);
  const [manufacturers, setManufacturers] = useState<any>([]);
  const [timeOption, setTimeOption] = useState<string>("datePicker");
  const [datePicker, setDatePicker] = useState<string>("This month");
  const [dateRange, setDateRange] = useState<any>({
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
  // Fetch ProductsList and CategoriesList, Manufacturers List
  useEffect(() => {
    const fetchData = async () => {
      const receiptsData = await axios.get(
        `${process.env.REACT_APP_SERVER}receipts/index`
      );

      const manufacturersData = await axios.get(
        `${process.env.REACT_APP_SERVER}manufacturers/index`
      );
      const staffsData = await axios.get(
        `${process.env.REACT_APP_SERVER}users/staffs`
      );
      setReceipts([...receiptsData.data]);
      setFilteredList(receiptsData.data);
      setManufacturers(manufacturersData.data);
      setStaffs(staffsData);
      const newCheckBoxFilters = [
        {
          filterName: "Staff",
          filterConditions: staffsData.data.map((staff: any) => ({
            id: staff.id,
            name: staff.name,
            isChecked: false,
          })),
        },
        {
          filterName: "Manufacturer",
          filterConditions: manufacturersData.data.map((manufacturer: any) => ({
            id: manufacturer.id,
            name: manufacturer.name,
            isChecked: false,
          })),
        },
      ];
      setCheckBoxFilters(newCheckBoxFilters);
      setExpandList(
        receiptsData.data.map((item: any) => ({ id: item.id, display: false }))
      );
    };
    fetchData();
  }, []);

  // Update DisplayList by Changing Filter

  useEffect(() => {
    // filter checked checkbox
    const checkedFilters = checkBoxFilters.map((item) => ({
      filterName: item.filterName,
      filterConditions: item.filterConditions
        .filter((condition) => condition.isChecked === true)
        .map((condition) => ({
          id: condition.id,
          name: condition.name,
        })),
    }));

    // CheckStaff
    let newFilteredList;
    if (checkedFilters.length !== 0) {
      if (checkedFilters[0].filterConditions.length === 0) {
        newFilteredList = receipts;
      } else {
        newFilteredList = receipts.filter((item) =>
          checkedFilters[0].filterConditions.some(
            (condition) => condition.id === item.staff.id
          )
        );
      }

      // Check Manufacturer
      if (checkedFilters[1].filterConditions.length !== 0) {
        newFilteredList = newFilteredList.filter((item) => {
          return checkedFilters[1].filterConditions.some(
            (condition) => condition.id === item.manufacturer.id
          );
        });
      }

      // Check created time
      if (newFilteredList.length > 0) {
        if (timeOption === "datePicker") {
          switch (datePicker) {
            case "This day": {
              const currentDay = new Date().getDate();
              newFilteredList = newFilteredList.filter((item) => {
                const itemDay = new Date(item.created).getDate();
                return currentDay === itemDay;
              });

              break;
            }

            case "This week": {
              const curDate = new Date();
              const firstDay = curDate.getDate() - curDate.getDay() + 1;
              const lastDay = firstDay + 6;

              newFilteredList = newFilteredList.filter((item) => {
                const itemDay = new Date(item.created).getDate();
                return firstDay <= itemDay && itemDay <= lastDay;
              });
              break;
            }

            case "This month": {
              const currentMonth = new Date().getMonth();
              newFilteredList = newFilteredList.filter((item) => {
                const itemMonth = new Date(item.created).getMonth();
                return currentMonth === itemMonth;
              });
              console.log(newFilteredList);

              break;
            }

            case "This year": {
              const currentYear = new Date().getFullYear();

              newFilteredList = newFilteredList.filter((item) => {
                const itemYear = new Date(item.created).getFullYear();
                return currentYear === itemYear;
              });
              break;
            }

            default:
              break;
          }
        } else {
          console.log("b");
        }
      }
      if (keyWord !== "") {
        newFilteredList = newFilteredList.filter((item) =>
          item.id.includes(keyWord)
        );
      }

      setFilteredList(newFilteredList);
    }
  }, [checkBoxFilters, timeOption, datePicker, dateRange]);

  const handleProductClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const newExpandList = expandList.map((item: any) =>
      String(item.id) === e.currentTarget.id
        ? { id: item.id, display: !item.display }
        : { id: item.id, display: false }
    );
    setExpandList(newExpandList);
  };

  const handlePagination = (newDisplayList: any) => {
    setDisplayList(newDisplayList);
  };
  const searchReceipts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.currentTarget.value);
  };
  const handleCheckBoxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const filterName = e.currentTarget.name;

    const newCBFilter = checkBoxFilters.map((filter) => {
      return filter.filterName !== filterName
        ? filter
        : {
            filterName: filter.filterName,
            filterConditions: filter.filterConditions.map((condition) => {
              return condition.name !== value
                ? condition
                : {
                    id: condition.id,
                    name: condition.name,
                    isChecked: !condition.isChecked,
                  };
            }),
          };
    });

    setCheckBoxFilters(newCBFilter);
  };
  const handleTimeOptionChange = (e: any) => {
    const { value } = e.currentTarget;
    setTimeOption(value);
  };
  const handleTimePicker = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    setTimeOption("datePicker");
    setDatePicker(e.currentTarget.value);
  };
  const handleRangeTimeChange = (args: any) => {
    console.log(args.startDate);
    setDateRange({ startDate: args.startDate, endDate: args.endDate });
  };
  return (
    <div>
      <Flex className="body">
        <Box className="left-column">
          <FilterTemplate
            pageTitle="Product"
            checkboxFilters={checkBoxFilters}
            handleOnclick={handleCheckBoxClick}
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
        <VStack className="right-column">
          <Header handleSearch={searchReceipts} />
          <TableTemplate
            fields={["id", "created", "manufacturer", "staff", "total"]}
            dataList={displayList}
            itemType="receipt"
          />
          <Pagination items={filteredList} onChangePage={handlePagination} />
        </VStack>
      </Flex>
    </div>
  );
};

export default ReceiptListContainer;
