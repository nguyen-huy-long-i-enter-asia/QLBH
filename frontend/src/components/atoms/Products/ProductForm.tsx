/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  FormLabel,
  VStack,
  Select,
  Checkbox,
  Table,
  Tr,
  Td,
  Tbody,
  Textarea,
} from "@chakra-ui/react";

type CategoriesList = {
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
  selectedProduct?: {
    id: string;
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
    state: string;
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
  };
  action: string;
};
const ProductForm: React.FC<Props> = ({
  categoriesList,
  manufacturersList,
  selectedProduct,
  action,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(selectedProduct ? selectedProduct.name : "");
  const [manufacturer, setManufacturer] = useState<string>(
    selectedProduct ? selectedProduct.manufacturer.id : "1"
  );
  const [discount, setDiscount] = useState<string>(
    selectedProduct ? selectedProduct.discount : ""
  );
  const [state, setState] = useState<string>(
    selectedProduct ? selectedProduct.state : "1"
  );
  const [originalPrice, setOriginalPrice] = useState<string>(
    selectedProduct ? selectedProduct.original_price : ""
  );
  const [sellPrice, setSellPrice] = useState<string>(
    selectedProduct ? selectedProduct.sell_price : ""
  );
  const [categories, setCategories] = useState<CategoriesList>([]);
  const [note, setNote] = useState(selectedProduct ? selectedProduct.note : "");
  const [image, setImage] = useState<File>();
  const [imageLink, setImageLink] = useState<string>(
    selectedProduct ? selectedProduct.image : ""
  );
  // if (selectedProduct) {
  //   const [name,setName] = useState(selectedProduct.name);
  //   const[manufact](selectedProduct.manufacturer.id);
  //   setDiscount(selectedProduct.discount);
  //   setState(selectedProduct.state);
  //   setOriginalPrice(selectedProduct.original_price);
  //   setSellPrice(selectedProduct.sell_price);

  //   setNote(selectedProduct.note);

  //   setImageLink(selectedProduct.image);
  // }

  useEffect(() => {
    if (selectedProduct) {
      const productCategories = selectedProduct.categories.map(
        (item) => item.id
      );
      // console.log(
      //   categoriesList.map((category) => ({
      //     id: category.id,
      //     name: category.name,
      //     isChecked: !!productCategories.includes(category.id),
      //   }))
      // );
      setCategories(
        categoriesList.map((category) => ({
          id: category.id,
          name: category.name,
          isChecked: !!productCategories.includes(category.id),
        }))
      );
    } else {
      setCategories(categoriesList);
    }
    // console.log(image);
  }, [categoriesList]);

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
  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(URL.createObjectURL(e.target.files[0]));
    if (e.target) {
      if (e.target.files) {
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
        setImageLink(URL.createObjectURL(e.target.files[0]));
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(name);
    // console.log(manufacturer);
    // console.log(discount);
    // console.log(state);
    // console.log(originalPrice);
    // console.log(sellPrice);
    // console.log(categories);
    // console.log(image);

    const formData = new FormData();
    if (action === "edit" && selectedProduct) {
      formData.append("id", selectedProduct.id);
    }
    formData.append("name", name);
    formData.append("manufacturer", manufacturer);
    formData.append("discount", discount);
    formData.append("state", state);
    formData.append("original_price", originalPrice);
    formData.append("sell_price", sellPrice);
    // console.log(
    //   JSON.stringify(
    //     categories
    //       .filter((item) => item.isChecked === true)
    //       .map((item) => item.id)
    //   )
    // );
    formData.append(
      "categories",
      JSON.stringify(
        categories
          .filter((item) => item.isChecked === true)
          .map((item) => item.id)
      )
    );

    if (image !== undefined) {
      formData.append("image", image);
    }
    formData.append("note", note);

    try {
      const url = `http://localhost:8765/products/${action}`;
      const result = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(result.data);
      if (result.data.status) {
        alert("Add product successfull");
      }
    } catch (error) {
      console.log(error);
    }

    window.location.reload(false);
  };
  // console.log(categories);
  return (
    <>
      <Button onClick={onOpen}>{`${
        action.charAt(0).toUpperCase() + action.slice(1)
      } Product`}</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Flex>
                <Table>
                  <Tbody>
                    <Tr>
                      <Td>Name</Td>
                      <Td>
                        <Input name="name" value={name} onChange={changeName} />
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>Manufacturer</Td>
                      <Td>
                        <Select
                          name="manufacturer"
                          onChange={changeManufacturer}
                          value={manufacturer}
                        >
                          {manufacturersList.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </Select>
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>Discount</Td>
                      <Td>
                        <Input
                          name="discount"
                          type="number"
                          onChange={changeDiscount}
                          value={discount}
                        />
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>State</Td>
                      <Td>
                        <Select name="state" onChange={changeState}>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </Select>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Table>
                  <Tbody>
                    <Tr>
                      <Td>Original Price</Td>
                      <Td>
                        <Input
                          name="original_price"
                          type="number"
                          onChange={changeOriginalPrice}
                          value={originalPrice}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Sell Price</Td>
                      <Td>
                        <Input
                          name="sell_price"
                          type="number"
                          onChange={changeSellPrice}
                          value={sellPrice}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>Categories</Td>
                      <Td>
                        <VStack>
                          {categories.map((item) => (
                            <Checkbox
                              key={item.id}
                              name="categories"
                              value={item.id}
                              isChecked={item.isChecked}
                              onChange={changeCategories}
                            >
                              {item.name}
                            </Checkbox>
                          ))}
                        </VStack>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Flex>
              <Flex>
                <FormLabel>Note</FormLabel>
                <Textarea name="note" onChange={changeNote} value={note} />
              </Flex>
              <Input name="image" type="file" onChange={changeImage} />
              <Image src={imageLink} />
              <Input type="submit" value="Submit" />
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProductForm;
