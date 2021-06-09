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
import "layouts/layout.css";

type Filter = {
  filterName: string;
  filterConditions: {
    id: string;
    name: string;
    isChecked: boolean;
  }[];
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

const ProductListContainer: React.FC = () => {
  const position = Cookies.get("position");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState<any[]>([]);
  const [keyWord, setKeyWord] = useState("");
  const [expandList, setExpandList] = useState<any>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [displayList, setDisplayList] = useState<any[]>([]);
  const [checkBoxFilters, setCheckBoxFilters] = useState<Filter[]>([]);
  const [categories, setCategories] = useState<CategoriesList>([]);
  const [productStates, setProductStates] = useState([{ id: "0", name: "" }]);
  const [manufacturers, setManufacturers] = useState<any>([]);
  const fields = [
    "id",
    "name",
    "original_price",
    "sell_price",
    "product_state",
  ];
  const [sortState, setSortState] = useState(fields.map((item) => false));
  // Fetch ProductsList and CategoriesList, Manufacturers List
  useEffect(() => {
    const fetchData = async () => {
      const productsData = await axios.get(
        `${process.env.REACT_APP_SERVER}products/index`
      );
      const categoriesData = await axios.get(
        `${process.env.REACT_APP_SERVER}categories/index`
      );
      const manufacturersData = await axios.get(
        `${process.env.REACT_APP_SERVER}manufacturers/index`
      );
      const productStatesData = await axios.get(
        `${process.env.REACT_APP_SERVER}productStates/index`
      );
      setProducts([...productsData.data]);
      setFilteredList([...productsData.data]);

      const newCategoriesData = categoriesData.data.map((category: any) => ({
        ...category,
        isChecked: false,
      }));
      setProductStates(productStatesData.data);
      setCategories(newCategoriesData);
      setManufacturers(manufacturersData.data);
      const newCheckBoxFilters = [
        {
          filterName: "State",
          filterConditions: productStatesData.data.map((state: any) => ({
            id: state.id,
            name: state.name,
            isChecked: false,
          })),
        },
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

      setExpandList(
        productsData.data.map((item: any) => ({ id: item.id, display: false }))
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
    if (checkedFilters.length !== 0 && products.length > 0) {
      if (checkedFilters[0].filterConditions.length === 0) {
        newFilteredList = products;
      } else {
        newFilteredList = products.filter((item) =>
          checkedFilters[0].filterConditions.some((condition) => {
            return condition.id === item.product_state.id;
          })
        );
      }

      // Check Category
      if (checkedFilters[1].filterConditions.length !== 0) {
        newFilteredList = newFilteredList.filter((item: any) => {
          const passCondition = checkedFilters[1].filterConditions.filter(
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
      }

      if (checkedFilters[2].filterConditions.length !== 0) {
        newFilteredList = newFilteredList.filter((item) => {
          return checkedFilters[2].filterConditions.some(
            (condition) => condition.id === item.manufacturer.id
          );
        });
      }

      if (keyWord !== "") {
        newFilteredList = newFilteredList.filter((item) =>
          item.name.includes(keyWord)
        );
      }

      setFilteredList(newFilteredList);
    }
  }, [checkBoxFilters, keyWord]);

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
  const handlePagination = (newDisplayList: Products) => {
    setDisplayList(newDisplayList);
  };
  const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.currentTarget.value);
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
  return (
    <div>
      <Flex className="content">
        <Box className="left-column">
          <FilterTemplate
            pageTitle="Product"
            checkboxFilters={checkBoxFilters}
            handleCheckBoxClick={handleCheckBoxClick}
          />
        </Box>
        <VStack className="right-column">
          <Header
            handleSearch={searchProduct}
            categoriesList={categories}
            manufacturersList={manufacturers}
            position={position}
            productStatesList={productStates}
          />
          <TableTemplate
            fields={[
              "id",
              "name",
              "original_price",
              "sell_price",
              "product_state",
            ]}
            handleSort={handleSort}
            dataList={displayList}
            itemType="product"
            productExpandContentProps={{
              categoriesList: categories,
              manufacturersList: manufacturers,
              productStatesList: productStates,
            }}
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

export default ProductListContainer;
