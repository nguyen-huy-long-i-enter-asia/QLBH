/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "components/atoms/Pagination";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { Flex, Box, VStack, Input, Table } from "@chakra-ui/react";
import ImportTableTemplate from "components/organisms/Receipts/ImportTableTemplate";
import ReceiptOverViewTemplate from "components/organisms/Receipts/ReceiptOverViewTemplate";
import SearchResultTemplate from "components/organisms/Receipts/SearchResultTemplate";

type searchResultType = {
  id: string;
  name: string;
  original_price: number;
  image: string;
  count: number;
}[];
type importListType = {
  id: string;
  name: string;
  original_price: number;
  image: string;
  count: number;
  size_id: string;
  color_id: string;
  total: number;
}[];
const ImportProductContainer: React.FC = () => {
  const history = useHistory();
  const [manufacturers, setManufacturers] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [transactionStates, setTransactionStates] = useState([]);
  const staffEmail = Cookies.get("email");
  const [selectedManufacturer, setSelectedManufacturer] = useState("1");
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<searchResultType>([]);
  const [importList, setImportList] = useState<importListType>([]);
  const [note, setNote] = useState("");
  const [sum, setSum] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
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
    const findData = async () => {
      const formData = new FormData();
      formData.append("keyword", keyword);
      formData.append("id", selectedManufacturer);
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}products/find`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(result.data);
      setSearchResult(result.data);
    };
    if (keyword !== "") {
      findData();
    } else {
      setSearchResult([]);
    }
  }, [keyword, selectedManufacturer]);
  useEffect(() => {
    if (importList.length > 0) {
      const newSum = importList.reduce(
        (accumulator, currentValue) => accumulator + currentValue.total,
        0
      );
      setSum(newSum);
    } else {
      setSum(0);
    }
  }, [importList]);
  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  const handleManufacturerChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedManufacturer(e.currentTarget.value);
  };

  const handProductClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;

    const selectedProduct = searchResult.filter((item) => item.id === id);
    // const importedProduct = {
    //   ...selectedProduct[0],
    //   count: 0,
    //   size: "",
    //   color: "",
    //   total: 0,
    // };

    // importedProduct.count = 0;
    // const newImportList = importList;
    // // console.log(selectedProduct);

    // newImportList.push(importedProduct);

    setImportList([
      ...importList,
      {
        ...selectedProduct[0],
        count: 0,
        size_id: "1",
        color_id: "1",
        total: 0,
      },
    ]);
  };

  const handleSizeChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const productId = e.currentTarget.id;
    const { value } = e.currentTarget;
    const newImportList = importList.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          size_id: value,
        };
      }
      return item;
    });

    setImportList(newImportList);
  };
  const handleColorChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const productId = e.currentTarget.id;
    const { value } = e.currentTarget;

    const newImportList = importList.map((item) => {
      console.log(item.id === productId);
      if (item.id === productId) {
        return {
          ...item,
          color_id: value,
        };
      }
      return item;
    });
    console.log(newImportList);
    setImportList(newImportList);
  };
  const handleCountChange = (e: React.FormEvent<HTMLInputElement>) => {
    const productId = e.currentTarget.id;
    const { value } = e.currentTarget;

    const newImportList = importList.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          count: value === "" ? 0 : parseInt(value, 10),
          total: value === "" ? 0 : item.original_price * parseInt(value, 10),
        };
      }
      return item;
    });
    setImportList(newImportList);
    // console.log(newImportList);
  };
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setNote(value);
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const formData = new FormData();
    formData.append("receipt_details", JSON.stringify(importList));
    if (staffEmail !== undefined) {
      formData.append("staff_email", staffEmail);
    }
    formData.append("manufacturer_id", selectedManufacturer);
    formData.append("total", sum.toString());
    formData.append("note", note);
    console.log(JSON.stringify(importList));
    try {
      const url = `http://localhost:8765/receipts/import`;
      const result = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.data.status) {
        alert("Add product successfull");
        history.push("/receipts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex>
      <VStack>
        <Flex>
          <Box>Import</Box>
          <Box>
            <Input
              placeholder="Type product id or name"
              value={keyword}
              onChange={changeKeyword}
            />
            <SearchResultTemplate
              searchResult={searchResult}
              handleProductClick={handProductClick}
            />
          </Box>
        </Flex>
        <ImportTableTemplate
          colors={colors}
          sizes={sizes}
          importList={importList}
          handleColorChange={handleColorChange}
          handleSizeChange={handleSizeChange}
          handleCountChange={handleCountChange}
        />
      </VStack>
      <ReceiptOverViewTemplate
        manufacturers={manufacturers}
        staffEmail={staffEmail}
        handleManufacturerChange={handleManufacturerChange}
        selectedManufacturer={selectedManufacturer}
        handleNoteChange={handleNoteChange}
        note={note}
        sum={sum}
        handleSubmit={handleSubmit}
      />
    </Flex>
  );
};
export default ImportProductContainer;
