import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Select,
  Checkbox,
  Table,
  Tr,
  Td,
  Tbody,
  Textarea,
} from "@chakra-ui/react";
import ProductForm from "components/atoms/Products/ProductForm";

export type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];

type Props = {
  categoriesList: CategoriesList;
  manufacturersList: {
    id: number;
    name: string;
  }[];

  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header: React.FC<Props> = ({
  categoriesList,
  manufacturersList,
  handleSearch,
}) => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [sellPrice, setSellPrice] = useState<string>("");
  const [categories, setCategories] = useState<CategoriesList>([]);

  useEffect(() => {
    setCategories(categoriesList);
  }, [categoriesList]);

  const [note, setNote] = useState("");
  const [image, setImage] = useState<File>();
  const [imageLink, setImageLink] = useState<string>("");

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setName(value);
  };
  const changeManufacturer = (e: React.FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setManufacturer(value);
  };
  const changeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setDiscount(value);
  };
  const changeState = (e: React.FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    setState(value);
  };
  const changeOriginalPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setOriginalPrice(value);
  };
  const changeSellPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSellPrice(value);
  };
  const changeCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const newCategoriesState = categories.map((item) => {
      if (String(item.id) === value) {
        return {
          id: item.id,
          name: item.name,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });
    setCategories(newCategoriesState);
  };

  const changeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setNote(value);
  };
  const changeImage = (e: any) => {
    // console.log(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setImageLink(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("manufacturer", manufacturer);
    formData.append("discount", discount);
    formData.append("state", state);
    formData.append("original_price", originalPrice);
    formData.append("sell_price", sellPrice);
    console.log(
      JSON.stringify(
        categories
          .filter((item) => item.isChecked === true)
          .map((item) => item.id)
      )
    );
    formData.append(
      "categories",
      JSON.stringify(
        categories
          .filter((item) => item.isChecked === true)
          .map((item) => item.id)
      )
    );

    if (image) {
      formData.append("image", image);
    }
    formData.append("note", note);

    try {
      const result = await axios.post(
        "http://localhost:8765/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result.data);
      if (result.data.status) {
        alert("Add product successfull");
      }
    } catch (error) {
      console.log(error);
    }

    window.location.reload(false);
  };
  return (
    <Flex>
      <Input placeholder="Type name of Product" onChange={handleSearch} />
      <ProductForm
        categoriesList={categoriesList}
        manufacturersList={manufacturersList}
        action="add"
      />
    </Flex>
  );
};
export default Header;
