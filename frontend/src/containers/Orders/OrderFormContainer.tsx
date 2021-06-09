/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import {
  Flex,
  Box,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  Text,
  ModalContent,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import OrderDetailsTableTemplate from "components/organisms/Orders/OrderDetailsTableTemplate";
import OrderOverViewTemplate from "components/organisms/Orders/OrderOverViewTemplate";
import "layouts/layout.css";
import SearchModal from "components/molecules/Orders/SearchModal";
import ProductStageTemplate from "components/organisms/Orders/ProductStageTemplate";

type Filter = {
  filterName: string;
  filterConditions: {
    id: string;
    name: string;
    isChecked: boolean;
  }[];
};
type importListType = {
  id: number; // id san pham
  name: string;
  sell_price: number;
  discount: number;
  count: number;
  size_id: string;
  color_id: string;
  total: number;
  inventory: number;
}[];
type Props = {
  orderId?: string;
};
const OrderFormContainer: React.FC<Props> = ({ orderId }) => {
  // State
  const [checkBoxFilters, setCheckBoxFilters] = useState<Filter[]>([]);
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [staffEmail, setStaffEmail] = useState(Cookies.get("email"));
  const [selectedManufacturer, setSelectedManufacturer] = useState("1");
  const [importList, setImportList] = useState<importListType>([]);
  const [note, setNote] = useState("");
  const [pay, setPay] = useState(0);
  const [orderState, setOrderState] = useState(1);
  const [customer, setCustomer] = useState();
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (orderId) {
        const orderData = await axios.get(
          `${process.env.REACT_APP_SERVER}orders/find/${orderId}`
        );
        const oldImportedList = orderData.data.order_details.map(
          (item: any) => ({
            id: item.product.id,
            name: item.product.name,
            sell_price: item.product.sell_price,
            discount: item.product.discount,
            count: item.count,
            size_id: item.size.id.toString(),
            color_id: item.color.id.toString(),
            total:
              (item.count *
                item.product.sell_price *
                (100 - item.product.discount)) /
              100,
            note: item.note,
            inventory: item.inventory,
          })
        );
        setOrderState(orderData.data.transaction_state.id);
        setImportList(oldImportedList);
        setNote(orderData.data.note);
        // setStaffEmail(orderData.data.staff ? orderData.data.staff.email);
        setCustomer(orderData.data.customer);
      }
      const productsData = await axios.get(
        `${process.env.REACT_APP_SERVER}products/getSellList`
      );
      const categoriesData = await axios.get(
        `${process.env.REACT_APP_SERVER}categories/index`
      );
      const manufacturersData = await axios.get(
        `${process.env.REACT_APP_SERVER}manufacturers/index`
      );
      const sizesData = await axios.get(
        `${process.env.REACT_APP_SERVER}sizes/index`
      );
      const colorsData = await axios.get(
        `${process.env.REACT_APP_SERVER}colors/index`
      );
      setProducts(productsData.data);
      setFilteredList([...productsData.data]);

      setManufacturers(manufacturersData.data);
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
      setSizes(sizesData.data);
      setColors(colorsData.data);
    };
    fetchData();
  }, []);
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

    // CheckManufacturer
    let newFilteredList;
    if (checkedFilters.length !== 0 && products.length > 0) {
      if (checkedFilters[1].filterConditions.length === 0) {
        newFilteredList = products;
      } else {
        newFilteredList = products.filter((item: any) =>
          checkedFilters[1].filterConditions.some((condition) => {
            return condition.id === item.manufacturer.id;
          })
        );
      }

      // Check Category
      if (checkedFilters[0].filterConditions.length !== 0) {
        newFilteredList = newFilteredList.filter((item: any) => {
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
      }

      // if (checkedFilters[2].filterConditions.length !== 0) {
      //   newFilteredList = newFilteredList.filter((item: any) => {
      //     return checkedFilters[2].filterConditions.some(
      //       (condition) => condition.id === item.manufacturer.id
      //     );
      //   });
      // }

      if (keyword !== "") {
        newFilteredList = newFilteredList.filter(
          (item: any) =>
            item.name.includes(keyword) || item.id.toString().includes(keyword)
        );
      }

      setFilteredList(newFilteredList);
    }
  }, [checkBoxFilters, keyword]);
  useEffect(() => {
    if (importList.length > 0) {
      const newPay = importList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.total,
        0
      );
      setPay(newPay);
    } else {
      setPay(0);
    }
  }, [importList]);

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
  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  const handleProductClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;

    const selectedProduct = filteredList.filter(
      (item) => item.id === parseInt(id, 10)
    )[0];

    setImportList([
      ...importList,
      {
        id: selectedProduct.id,
        name: selectedProduct.name,
        sell_price: selectedProduct.sell_price,
        discount: selectedProduct.discount,
        count: 0,
        size_id: "1",
        color_id: "1",
        total: 0,
        inventory: selectedProduct.inventory,
      },
    ]);
  };

  const handleSizeChange = async (e: React.FormEvent<HTMLSelectElement>) => {
    const productId = e.currentTarget.id;
    const { value } = e.currentTarget;
    const selectedOrder = importList.filter(
      (item) => item.id === parseInt(productId, 10)
    )[0];
    console.log(selectedOrder);
    // Call API to get inventory of product with specific size and color
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("size_id", value);
    formData.append("color_id", selectedOrder.color_id);
    const result = await axios.post(
      `http://localhost:8765/colorsProductsSizes/getInventory/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    let inventory = 0;
    if (result.data !== null) {
      inventory = result.data.count;
    }
    console.log("a");
    const newImportList = importList.map((item) => {
      if (item.id === parseInt(productId, 10)) {
        console.log("a0");
        return {
          ...item,
          size_id: value,
          inventory,
        };
      }
      return item;
    });

    setImportList(newImportList);
  };
  const handleColorChange = async (e: React.FormEvent<HTMLSelectElement>) => {
    const productId = e.currentTarget.id;
    const { value } = e.currentTarget;
    const selectedOrder = importList.filter(
      (item) => item.id === parseInt(productId, 10)
    )[0];
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("size_id", selectedOrder.size_id);
    formData.append("color_id", value);
    const result = await axios.post(
      `http://localhost:8765/colorsProductsSizes/getInventory/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    let inventory = 0;
    if (result.data !== null) {
      inventory = result.data.count;
    }
    const newImportList = importList.map((item) => {
      if (item.id === parseInt(productId, 10)) {
        console.log("aa");
        return {
          ...item,
          color_id: value.toString(),
        };
      }
      return item;
    });

    setImportList(newImportList);
  };
  const handleCountChange = (e: React.FormEvent<HTMLInputElement>) => {
    const productId = e.currentTarget.id;
    const { value } = e.currentTarget;

    const newImportList = importList.map((item) => {
      if (item.id === parseInt(productId, 10)) {
        return {
          ...item,
          count: value === "" ? 0 : parseInt(value, 10),
          total:
            value === ""
              ? 0
              : ((item.sell_price * (100 - item.discount)) / 100) *
                parseInt(value, 10),
        };
      }
      return item;
    });
    setImportList(newImportList);
    // console.log(newImportList);
  };
  const handleDeleteRD = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedIndex = parseInt(e.currentTarget.id, 10);
    const newImportList = importList.filter(
      (value, index) => index !== selectedIndex
    );
    setImportList(newImportList);
  };
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;

    setNote(value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let outOfStockCount = 0;
    let url = "";
    importList.forEach((item) => {
      if (item.count > item.inventory) {
        outOfStockCount += 1;
      }
    });
    if (importList.length !== 0 && outOfStockCount === 0) {
      const formData = new FormData();
      formData.append("order_details", JSON.stringify(importList));
      if (staffEmail !== undefined) {
        formData.append("staff_email", staffEmail);
      }
      formData.append("manufacturer_id", selectedManufacturer);
      formData.append("pay", pay.toString());
      formData.append("note", note);
      console.log(JSON.stringify(importList));
      try {
        if (orderId) {
          formData.append("order_id", orderId);
          url = `http://localhost:8765/oreder/edit/`;
        } else {
          url = `http://localhost:8765/orders/addByStaff`;
        }

        const result = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        history.push("/receipts");
      } catch (error) {
        console.log(error);
      }
    } else if (importList.length === 0) {
      toast({
        title: "Import at least 1 product.",

        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Some Products are out of stock",

        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex pt="1%" w="100%" justify="center" minH="90vh">
      <VStack w="60%" mr="1%">
        <Flex justify="space-between" w="100%">
          <Flex align="center" ml="3%">
            <Text fontWeight="bold" fontSize="3xl">
              {orderId ? "Update" : "New"}
            </Text>
          </Flex>
          {/* <SearchModal
            type="product"
            importList={importList}
            setImportList={setImportList}
          /> */}
          <Input
            placeholder="Type product id or name"
            bgColor="white"
            value={keyword === "" ? undefined : keyword}
            onChange={changeKeyword}
          />
        </Flex>
        <OrderDetailsTableTemplate
          colors={colors}
          sizes={sizes}
          importList={importList}
          handleColorChange={handleColorChange}
          handleSizeChange={handleSizeChange}
          handleCountChange={handleCountChange}
          handleDeleteRD={handleDeleteRD}
        />
        <ProductStageTemplate
          dataList={filteredList}
          checkboxFilters={checkBoxFilters}
          handleCheckBoxClick={handleCheckBoxClick}
          handleProductClick={handleProductClick}
        />
      </VStack>
      <OrderOverViewTemplate
        staffEmail={staffEmail}
        handleNoteChange={handleNoteChange}
        note={note}
        pay={pay}
        handleSubmit={handleSubmit}
        customer={customer}
        setCustomer={setCustomer}
        action={orderId ? "edit" : "update"}
        setOrderState={setOrderState}
      />
    </Flex>
  );
};
export default OrderFormContainer;
