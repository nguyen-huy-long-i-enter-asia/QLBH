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

import ImportTableTemplate from "components/organisms/Orders/ImportTableTemplate";
import OrderOverViewTemplate from "components/organisms/Orders/OrderOverViewTemplate";
import "layouts/layout.css";
import SearchModal from "components/molecules/Orders/SearchModal";

type importListType = {
  id: number; // id san pham
  name: string;
  sell_price: number;
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
  const [manufacturers, setManufacturers] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [staffEmail, setStaffEmail] = useState(Cookies.get("email"));
  const [selectedManufacturer, setSelectedManufacturer] = useState("1");
  const [importList, setImportList] = useState<importListType>([]);
  const [note, setNote] = useState("");
  const [pay, setPay] = useState(0);
  const [transactionState, setTransactionState] = useState(1);
  const [customer, setCustomer] = useState();
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const fetchData = async () => {
      if (orderId) {
        const orderData = await axios.get(
          `${process.env.REACT_APP_SERVER}orders/find/${orderId}`
        );
        const oldImportedList = orderData.data.order_details.map(
          (item: any) => ({
            id: item.product.id.toString(),
            name: item.product.name,
            sell_price: item.product.sell_price,
            count: item.count,
            size_id: item.size.id.toString(),
            color_id: item.color.id.toString(),
            total: item.count * item.product.original_price,
            note: item.note,
          })
        );
        setImportList(oldImportedList);
        setNote(orderData.data.note);
        setStaffEmail(orderData.data.staff.email);
        setCustomer(orderData.data.customer);
      }
      const manufacturersData = await axios.get(
        `${process.env.REACT_APP_SERVER}manufacturers/index`
      );
      const sizesData = await axios.get(
        `${process.env.REACT_APP_SERVER}sizes/index`
      );
      const colorsData = await axios.get(
        `${process.env.REACT_APP_SERVER}colors/index`
      );

      setManufacturers(manufacturersData.data);
      setSizes(sizesData.data);
      setColors(colorsData.data);
    };
    fetchData();
  }, []);

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

  const handleManufacturerChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedManufacturer(e.currentTarget.value);
  };

  const handleSizeChange = async (e: React.FormEvent<HTMLSelectElement>) => {
    const productId = e.currentTarget.id;
    const { value } = e.currentTarget;
    const selectedOrder = importList.filter(
      (item) => item.id === parseInt(productId, 10)
    )[0];
    const formData = new FormData();
    formData.append("product_id", productId);
    formData.append("size_id", value);
    formData.append("color_id", selectedOrder.color_id);
    const result = await axios.post(
      `http://localhost:8765/colorsProductsSizes/Inventory/`,
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
      `http://localhost:8765/colorsProductsSizes/Inventory/`,
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
          total: value === "" ? 0 : item.sell_price * parseInt(value, 10),
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
    let url = "";
    if (importList.length !== 0) {
      const formData = new FormData();
      formData.append("receipt_details", JSON.stringify(importList));
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
          url = `http://localhost:8765/receipts/edit/`;
        } else {
          url = `http://localhost:8765/receipts/import`;
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
    } else {
      toast({
        title: "Import at least 1 product.",

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
          <SearchModal
            type="product"
            importList={importList}
            setImportList={setImportList}
          />
        </Flex>
        <ImportTableTemplate
          colors={colors}
          sizes={sizes}
          importList={importList}
          handleColorChange={handleColorChange}
          handleSizeChange={handleSizeChange}
          handleCountChange={handleCountChange}
          handleDeleteRD={handleDeleteRD}
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
      />
    </Flex>
  );
};
export default OrderFormContainer;
