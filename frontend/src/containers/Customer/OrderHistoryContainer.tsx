/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "components/atoms/Pagination";
import Cookies from "js-cookie";

import { useDisclosure, Box, Flex, VStack } from "@chakra-ui/react";
import MenuBarTemplate from "components/organisms/MenuBarTemplate";
import TableTemplate from "components/organisms/TableTemplate";
import FilterTemplate from "components/organisms/FilterTemplate";
import Header from "components/organisms/Orders/Header";
import "layouts/layout.css";

type Filter = {
  filterName: string;
  filterConditions: {
    id: number;
    name: string;
    isChecked: boolean;
  }[];
};
type Orders = {
  id: number;
  pay: number;

  note: string;
  created: string;
  modified: string;
  order_details: {
    id: number;
    order_id: number;
    count: number;
    created: string;
    modified: string;
    color: {
      id: number;
      name: string;
    };
    size: {
      id: number;
      name: string;
    };
    product: {
      id: number;
      name: string;
      manufacturer_id: number;
      state_id: number;
      note: string;
      original_price: number;
      sell_price: number;
      image: string;
      discount: number;
      created: string;
      modified: string;
    };
  }[];
  transaction_state: {
    id: number;
    name: string;
  };
  staff: { id: number; name: string } | null;
  customer: {
    id: number;
    name: string;
  };
  state: {
    id: number;
    name: string;
  };
}[];
type DateRangeType = {
  startDate: Date;
  endDate: Date;
};

const OrderHistoryContainer: React.FC = () => {
  const position = Cookies.get("position");
  const email = Cookies.get("email");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orders, setOrders] = useState<Orders>([]);
  const [keyWord, setKeyWord] = useState("");
  const [expandList, setExpandList] = useState<any>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [displayList, setDisplayList] = useState<any[]>([]);
  const [checkBoxFilters, setCheckBoxFilters] = useState<Filter[]>([]);
  // const [categories, setCategories] = useState<CategoriesList>([]);
  const [orderStates, setOrderStates] = useState([{ id: "0", name: "" }]);
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
  const fields = ["id", "created", "pay", "state"];
  const [sortState, setSortState] = useState(fields.map((item) => false));

  // Fetch ProductsList and CategoriesList, Manufacturers List
  useEffect(() => {
    const fetchData = async () => {
      const ordersData = await axios.get(
        `${process.env.REACT_APP_SERVER}orders/getOrdersByEmail/${email}`
      );
      const staffsData = await axios.get(
        `${process.env.REACT_APP_SERVER}users/staffs`
      );
      const orderStatesData = await axios.get(
        `${process.env.REACT_APP_SERVER}transactionStates/index`
      );
      const productStatesData = await axios.get(
        `${process.env.REACT_APP_SERVER}productStates/index`
      );
      setOrders([...ordersData.data]);

      setOrderStates(orderStatesData.data);

      const newCheckBoxFilters = [
        {
          filterName: "State",
          filterConditions: orderStatesData.data.map((state: any) => ({
            id: state.id,
            name: state.name,
            isChecked: false,
          })),
        },
      ];
      setCheckBoxFilters(newCheckBoxFilters);

      setExpandList(
        ordersData.data.map((item: any) => ({ id: item.id, display: false }))
      );
    };
    fetchData();
  }, []);

  // Update DisplayList by Changing Filter
  useEffect(() => {
    const checkedFilters = checkBoxFilters.map((item) => ({
      filterName: item.filterName,
      filterConditions: item.filterConditions
        .filter((condition) => condition.isChecked === true)
        .map((condition) => ({
          id: condition.id,
          name: condition.name,
        })),
    }));

    // CheckState
    let newFilteredList;
    if (checkedFilters.length !== 0 && orders.length > 0) {
      if (checkedFilters[0].filterConditions.length === 0) {
        newFilteredList = orders;
      } else {
        newFilteredList = orders.filter((item) =>
          checkedFilters[0].filterConditions.some((condition) => {
            return condition.id === item.state.id;
          })
        );
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
        newFilteredList = newFilteredList.filter(
          (item) =>
            item.id.toString().includes(keyWord) ||
            item.customer.name.includes(keyWord)
        );
      }

      setFilteredList(newFilteredList);
    }
  }, [checkBoxFilters, keyWord, timeOption, datePicker, dateRange]);
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
  const handleProductClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const newExpandList = expandList.map((item: any) =>
      String(item.id) === e.currentTarget.id
        ? { id: item.id, display: !item.display }
        : { id: item.id, display: false }
    );
    setExpandList(newExpandList);
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
    // console.log(newCBFilter);
    setCheckBoxFilters(newCBFilter);
  };
  const handlePagination = (newDisplayList: Orders) => {
    setDisplayList(newDisplayList);
    // console.log(newDisplayList);
  };
  const searchOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.currentTarget.value);
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
            pageTitle="Order History"
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
          <Header handleSearch={searchOrder} />
          <TableTemplate
            fields={fields}
            dataList={displayList}
            itemType="order"
            // productExpandContentProps={{
            //   categoriesList: categories,
            //   manufacturersList: manufacturers,
            //   productStatesList: productStates,
            // }}
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

export default OrderHistoryContainer;
