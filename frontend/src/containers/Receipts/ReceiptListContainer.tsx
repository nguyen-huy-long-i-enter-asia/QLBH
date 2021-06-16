/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "components/atoms/Pagination";
import Cookies from "js-cookie";

import { useDisclosure, Box, Flex, VStack, useToast } from "@chakra-ui/react";
import MenuBarTemplate from "components/organisms/MenuBarTemplate";
import TableTemplate from "components/organisms/TableTemplate";
import FilterTemplate from "components/organisms/FilterTemplate";
import Header from "components/organisms/Receipts/Header";
import "layouts/layout.css";

type Filter = {
  filterName: string;
  filterConditions: {
    id: string;
    name: string;
    isChecked: boolean;
  }[];
};
type dateRangeType = {
  startDate: Date;
  endDate: Date;
};
const ReceiptListContainer: React.FC = () => {
  const toast = useToast();
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
  const [dateRange, setDateRange] = useState<dateRangeType>({
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
  const fields = ["id", "created", "manufacturer", "staff", "total"];
  const [sortState, setSortState] = useState(fields.map((item) => false));

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
    const action = sessionStorage.getItem("action");
    if (action) {
      toast({
        title: `${action} receipt successful`,

        status: "success",
        duration: 1500,
        isClosable: true,
      });
    }
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
    console.log(receipts);
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
      console.log(newFilteredList);

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
              // console.log(newFilteredList);

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
          newFilteredList = newFilteredList.filter((item) => {
            const itemTime = new Date(item.created);
            return (
              dateRange.startDate <= itemTime && dateRange.endDate >= itemTime
            );
          });
        }
      }
      if (keyWord !== "") {
        newFilteredList = newFilteredList.filter((item) =>
          item.id.toString().includes(keyWord)
        );
      }

      setFilteredList(newFilteredList);
    }
  }, [checkBoxFilters, timeOption, datePicker, dateRange, keyWord]);

  const handlePagination = (newDisplayList: any) => {
    console.log(newDisplayList);
    setDisplayList(newDisplayList);
  };
  const searchReceipts = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);

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
    setTimeOption("datePicker");
    setDatePicker(e.currentTarget.value);
  };
  const handleRangeTimeChange = (args: any) => {
    setDateRange({ startDate: args.startDate, endDate: args.endDate });
  };
  const handleDeleteReceipt = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;

    const deleteReceipt = async () => {
      const url = `${process.env.REACT_APP_SERVER}receipts/delete/${id}`;

      const result = await axios.get(url);
      if (result.data.status === "success") {
        toast({
          title: "Return Products successful",

          status: "success",
          duration: 1500,
          isClosable: true,
        });
        const newFilteredList = filteredList.filter((item) => {
          return item.id.toString() !== id;
        });

        setFilteredList(newFilteredList);
      }
    };
    deleteReceipt();
  };
  const handleSort = (e: React.MouseEvent<HTMLTableCaptionElement>) => {
    const field = e.currentTarget.id;
    const indexOfField = fields.indexOf(field);
    const sortedFilteredList = [...filteredList];
    const newSortState = [...sortState];
    newSortState[indexOfField] = !newSortState[indexOfField];
    setSortState(newSortState);
    if (typeof filteredList[0][field] === "object") {
      if (sortState[indexOfField] === false) {
        setFilteredList(
          sortedFilteredList.sort((a: any, b: any) =>
            b[field].name.localeCompare(a[field].name)
          )
        );
      } else {
        setFilteredList(
          sortedFilteredList.sort((a: any, b: any) =>
            a[field].name.localeCompare(b[field].name)
          )
        );
      }
    } else if (typeof filteredList[0][field] === "string") {
      if (sortState[indexOfField] === false) {
        setFilteredList(
          sortedFilteredList.sort((a: any, b: any) =>
            b[field].localeCompare(a[field])
          )
        );
      } else {
        setFilteredList(
          sortedFilteredList.sort((a: any, b: any) =>
            a[field].localeCompare(b[field])
          )
        );
      }
    } else if (sortState[indexOfField] === false) {
      setFilteredList(
        sortedFilteredList.sort((a: any, b: any) => a[field] - b[field])
      );
    } else {
      setFilteredList(
        sortedFilteredList.sort((a: any, b: any) => b[field] - a[field])
      );
    }
  };
  return (
    <div>
      <Flex className="content">
        <Box className="left-column">
          <FilterTemplate
            pageTitle="Receipts"
            checkboxFilters={checkBoxFilters}
            handleCheckBoxClick={handleCheckBoxClick}
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
            fields={fields}
            dataList={displayList}
            itemType="receipt"
            receiptExpandContentProps={{ handleDeleteReceipt }}
            handleSort={handleSort}
          />
          <Pagination
            items={filteredList}
            onChangePage={handlePagination}
            pageSizeProp={15}
          />
        </VStack>
      </Flex>
    </div>
  );
};

export default ReceiptListContainer;
