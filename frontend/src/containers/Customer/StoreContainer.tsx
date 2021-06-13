/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "components/atoms/Pagination";
import Cookies from "js-cookie";

import { useDisclosure, Box, Flex, VStack } from "@chakra-ui/react";
import MenuBarTemplate from "components/organisms/MenuBarTemplate";
import TableTemplate from "components/organisms/TableTemplate";
import FilterTemplate from "components/organisms/FilterTemplate";
import Header, { CategoriesList } from "components/organisms/Products/Header";
import ProductStageTemplate from "components/organisms/Customer/ProductStageTemplate";
import "layouts/layout.css";

type CheckBoxFilter = {
  filterName: string;
  filterConditions: {
    id: string;
    name: string;
    isChecked: boolean;
  }[];
};
type RangeFilterConst = {
  filterName: string;
  handleSet: (e: React.MouseEvent<HTMLInputElement>) => void;
  handleUnset: (e: React.MouseEvent<HTMLInputElement>) => void;
  handleSmallestChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBiggestChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
type RangeFilterState = {
  smallest: number;
  biggest: number;
  isApplied: boolean;
};
type Products = {
  id: number;
  name: string;
  original_price: string;
  sell_price: string;
  discount: string;
  image: string;
  note: string;
  manufacturer: {
    id: string;
    name: string;
  };
  product_state: {
    id: string;
    name: string;
  };
  categories: {
    id: string;
    name: string;
  }[];
  inventory: {
    size: string;
    colors: {
      color: string;
      count: number;
    }[];
  }[];
}[];

const StoreContainer: React.FC = () => {
  const position = Cookies.get("position");
  const [products, setProducts] = useState<any[]>([]);
  const [keyWord, setKeyWord] = useState("");
  const [expandList, setExpandList] = useState<any>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);

  const [displayList, setDisplayList] = useState<any[]>([]);
  const [checkBoxFilters, setCheckBoxFilters] = useState<CheckBoxFilter[]>([]);
  const [categories, setCategories] = useState<CategoriesList>([]);
  const [rangeFilterStates, setRangeFilterStates] = useState({
    smallest: 0,
    biggest: 0,
    isApplied: false,
  });
  const [manufacturers, setManufacturers] = useState<any>([]);

  // Fetch ProductsList and CategoriesList, Manufacturers List
  useEffect(() => {
    const fetchData = async () => {
      const productsData = await axios.get(
        `${process.env.REACT_APP_SERVER}store/index`
      );
      // console.log(productsData.data);
      const categoriesData = await axios.get(
        `${process.env.REACT_APP_SERVER}categories/index`
      );
      const manufacturersData = await axios.get(
        `${process.env.REACT_APP_SERVER}manufacturers/index`
      );
      // const productStatesData = await axios.get(
      //   `${process.env.REACT_APP_SERVER}productStates/index`
      // );
      setProducts([...productsData.data]);

      const newCategoriesData = categoriesData.data.map((category: any) => ({
        ...category,
        isChecked: false,
      }));

      setCategories(newCategoriesData);
      // setManufacturers(manufacturersData.data);
      const newCheckBoxFilters = [
        {
          filterName: "Category",
          filterConditions: categoriesData.data.map((category: any) => ({
            id: category.id,
            name: category.name,
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

      // setExpandList(
      //   productsData.data.map((item: any) => ({ id: item.id, display: false }))
      // );
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

    let newFilteredList;
    if (checkedFilters.length !== 0 && products.length > 0) {
      // Check Category
      if (checkedFilters[0].filterConditions.length !== 0) {
        newFilteredList = products.filter((item: any) => {
          const passCondition = checkedFilters[0].filterConditions.filter(
            (condition: any) =>
              item.categories.some(
                (category: any) => category.id === condition.id
              )
          );
          if (passCondition.length > 0) {
            return true;
          }
          return false;
        });
      } else {
        newFilteredList = products;
      }
      // Check Manufacturer
      if (checkedFilters[1].filterConditions.length !== 0) {
        newFilteredList = newFilteredList.filter((item) => {
          return checkedFilters[1].filterConditions.some(
            (condition: any) => condition.id === item.manufacturer.id
          );
        });
      }

      if (keyWord !== "") {
        newFilteredList = newFilteredList.filter((item) =>
          item.name.includes(keyWord)
        );
      }
      // Check Price
      if (rangeFilterStates.isApplied === true) {
        newFilteredList = newFilteredList.filter((item) => {
          return (
            rangeFilterStates.smallest <=
              (item.sell_price * (100 - item.discount)) / 100 &&
            (item.sell_price * (100 - item.discount)) / 100 <=
              rangeFilterStates.biggest
          );
        });
      }

      setFilteredList(newFilteredList);
    }
  }, [checkBoxFilters, keyWord, rangeFilterStates]);
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
  const handlePagination = (newDisplayList: Products) => {
    setDisplayList(newDisplayList);
    // console.log(newDisplayList);
  };
  const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.currentTarget.value);
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
          <FilterTemplate
            pageTitle="Product"
            checkboxFilters={checkBoxFilters}
            handleCheckBoxClick={handleCheckBoxClick}
            rangeFilter={{
              from: rangeFilterStates.smallest,
              to: rangeFilterStates.biggest,
              filterName: "Price",
              handleFromChange: handleSmallestChange,
              handleToChange: handleBiggestChange,
              handleSet,
              handleUnset,
            }}
          />
        </Box>
        <VStack className="right-column">
          <ProductStageTemplate dataList={displayList} />
          <Pagination
            items={filteredList}
            onChangePage={handlePagination}
            pageSizeProp={10}
          />
        </VStack>
      </Flex>
    </div>
  );
};

export default StoreContainer;
