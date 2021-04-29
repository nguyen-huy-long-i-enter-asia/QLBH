/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDisclosure, Box, Flex, VStack } from "@chakra-ui/react";
import MenuBarTemplate from "components/organisms/MenuBarTemplate";
import TableTemplate from "components/organisms/Products/TableTemplate";
import FilterTemplate from "components/organisms/Products/FilterTemplate";
import Header, { CategoriesList } from "components/organisms/Products/Header";
import Pagination from "components/atoms/Pagination";

const menuList = [
  {
    menuName: "OverView",

    buttonLink: "/login",
  },
  {
    menuName: "Product",
    buttonLink: "/login",
  },
  {
    menuName: "Transaction",
    buttonLink: "/login",
  },
  {
    menuName: "Warehouse",
    childrenMenus: ["Manufacture", "Import Management"],
    links: {
      Manufacture: "/login",
      "Import Management": "/login",
    },
  },
  {
    menuName: "Customer",
    buttonLink: "/login",
  },
  {
    menuName: "Staff",
    buttonLink: "/login",
  },
  {
    menuName: "History",
    buttonLink: "/login",
  },
  {
    menuName: "Statistic",
    buttonLink: "/login",
  },
  {
    menuName: "Sale",
    buttonLink: "/login",
  },
];

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState<any[]>([]);
  const [keyWord, setKeyWord] = useState("");
  const [expandList, setExpandList] = useState<any>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [displayList, setDisplayList] = useState<any[]>([]);
  const [checkBoxFilters, setCheckBoxFilters] = useState<Filter[]>([]);
  const [categories, setCategories] = useState<CategoriesList>([]);
  const [productStates, setProductStates] = useState([{ id: 0, name: "" }]);
  const [manufacturers, setManufacturers] = useState<any>([]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const productsData = await axios.get(
  //       "http://localhost:8765/products/index"
  //     );
  //     setProducts([...productsData.data]);
  //     // console.log(productsData.data);
  //   };
  //   fetchProducts();
  // }, []);
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const categoriesData = await axios.get(
  //       "http://localhost:8765/categories/index"
  //     );
  //     const newCategoriesData = categoriesData.data.map((category: any) => ({
  //       ...category,
  //       isChecked: false,
  //     }));

  //     setCategories(newCategoriesData);
  //   };
  //   fetchCategories();
  // }, []);
  // useEffect(() => {
  //   const fetchManufacturers = async () => {
  //     const manufacturersData = await axios.get(
  //       "http://localhost:8765/manufacturers/index"
  //     );
  //     setManufacturers(manufacturersData.data);
  //   };
  //   fetchManufacturers();
  // }, []);
  // useEffect(() => {
  //   setFilteredList([...products]);
  // }, [products]);
  // useEffect(() => {
  //   const newCheckBoxFilters = [
  //     {
  //       filterName: "State",
  //       filterConditions: [
  //         {
  //           name: "1",
  //           isChecked: false,
  //         },
  //         {
  //           name: "2",
  //           isChecked: false,
  //         },
  //         {
  //           name: "3",
  //           isChecked: false,
  //         },
  //       ],
  //     },
  //     {
  //       filterName: "Category",
  //       filterConditions: categories.map((category: any) => ({
  //         name: category.name,
  //         isChecked: false,
  //       })),
  //     },
  //     {
  //       filterName: "Manufacturer",
  //       filterConditions: manufacturers.map((manufacturer: any) => ({
  //         name: manufacturer.name,
  //         isChecked: false,
  //       })),
  //     },
  //   ];

  //   setCheckBoxFilters(newCheckBoxFilters);
  // }, [categories, manufacturers]);
  // useEffect(() => {
  //   setExpandList(
  //     products.map((item: any) => ({ id: item.id, display: false }))
  //   );
  // }, [products]);

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
    if (checkedFilters.length !== 0) {
      if (checkedFilters[0].filterConditions.length === 0) {
        newFilteredList = products;
      } else {
        newFilteredList = products.filter((item) =>
          checkedFilters[0].filterConditions.some(
            (condition) => condition.id === item.product_state.id
          )
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
      console.log(newFilteredList);
      setFilteredList(newFilteredList);
    }
  }, [checkBoxFilters]);
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

    setCheckBoxFilters(newCBFilter);
  };
  const handlePagination = (newDisplayList: Products) => {
    setDisplayList(newDisplayList);
  };
  const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.currentTarget.value);
  };
  return (
    <div>
      <Box>
        <MenuBarTemplate menuList={menuList} menuWidth="11.1%" />
      </Box>
      <Flex>
        <VStack>
          <Box>Product</Box>
          <FilterTemplate
            checkboxFilters={checkBoxFilters}
            handleOnclick={handleCheckBoxClick}
          />
        </VStack>
        <VStack>
          <Header
            handleSearch={searchProduct}
            categoriesList={categories}
            manufacturersList={manufacturers}
          />
          <TableTemplate
            fields={["id", "name", "original_price", "sell_price", "state"]}
            dataList={displayList}
            itemType="product"
            expandList={expandList}
            handleClick={handleProductClick}
            categoriesList={categories}
            manufacturersList={manufacturers}
          />
        </VStack>
      </Flex>
      <Pagination items={filteredList} onChangePage={handlePagination} />
    </div>
  );
};

export default ProductListContainer;
