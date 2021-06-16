/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "components/atoms/Pagination";
import Cookies from "js-cookie";
import { useDisclosure, Box, Flex, VStack, useToast } from "@chakra-ui/react";
import TableTemplate from "components/organisms/TableTemplate";
import FilterTemplate from "components/organisms/FilterTemplate";
import StaffHeader from "components/organisms/Users/StaffHeader";
import "layouts/layout.css";

type Filter = {
  filterName: string;
  filterConditions: {
    id: string;
    name: string;
    isChecked: boolean;
  }[];
};

type RangeFilterState = {
  smallest: number;
  biggest: number;
  isApplied: boolean;
};
const StaffListContainer: React.FC = () => {
  const position = Cookies.get("position");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyword, setKeyword] = useState("");
  // const [expandList, setExpandList] = useState<any>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [displayList, setDisplayList] = useState<any[]>([]);
  const [staffs, setStaffs] = useState<any>([]);
  const fields = ["id", "name", "phone", "email"];
  const [rangeFilterStates, setRangeFilterStates] = useState({
    smallest: 0,
    biggest: 0,
    isApplied: false,
  });
  const [sortState, setSortState] = useState(fields.map((item) => false));
  const toast = useToast();
  // Fetch Staff List
  useEffect(() => {
    const fetchData = async () => {
      const staffsData = await axios.get(
        `${process.env.REACT_APP_SERVER}users/getStaffsByManager`
      );
      setStaffs(staffsData.data);
      setFilteredList(staffsData.data);
      // setExpandList(
      //   manufacturersData.data.map((item: any) => ({
      //     id: item.id,
      //     display: false,
      //   }))
      // );
    };
    fetchData();
    const action = sessionStorage.getItem("action");
    sessionStorage.removeItem("action");
    if (action) {
      toast({
        title: `${
          // eslint-disable-next-line no-nested-ternary
          action === "add" ? "Add" : action === "edit" ? "Edit" : "Delete"
        } Staff successful`,

        status: "success",
        duration: 1500,
        isClosable: true,
      });
    }
  }, []);

  // Update DisplayList by Changing Filter
  useEffect(() => {
    // CheckKeyword
    let newFilteredList = staffs;
    const lowerCaseKeyword = keyword.toLowerCase();
    if (keyword !== "") {
      newFilteredList = newFilteredList.filter(
        (item: any) =>
          item.name.toLowerCase().includes(lowerCaseKeyword) ||
          item.email.toLowerCase().includes(lowerCaseKeyword) ||
          item.phone.toLowerCase().includes(lowerCaseKeyword)
      );
    }
    if (rangeFilterStates.isApplied === true) {
      newFilteredList = newFilteredList.filter((item: any) => {
        return (
          rangeFilterStates.smallest <= item.total_pay &&
          item.total_pay <= rangeFilterStates.biggest
        );
      });
    }
    setFilteredList(newFilteredList);
  }, [rangeFilterStates, keyword]);

  const handlePagination = (newDisplayList: any) => {
    setDisplayList(newDisplayList);
  };
  const searchStaff = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  // Sort Display list by field
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
  const handleSet = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRangeFilterStates({ ...rangeFilterStates, isApplied: true });
  };
  const handleUnset = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRangeFilterStates({ ...rangeFilterStates, isApplied: false });
  };
  const handleSmallestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeFilterStates({
      ...rangeFilterStates,
      smallest: parseInt(e.currentTarget.value, 10),
    });
  };
  const handleBiggestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeFilterStates({
      ...rangeFilterStates,
      biggest: parseInt(e.currentTarget.value, 10),
    });
  };
  return (
    <div>
      <Flex className="content">
        <Box className="left-column">
          <FilterTemplate pageTitle="Staff" />
        </Box>
        <VStack className="right-column">
          <StaffHeader handleSearch={searchStaff} />
          <TableTemplate
            fields={fields}
            handleSort={handleSort}
            dataList={displayList}
            itemType="staff"
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

export default StaffListContainer;
