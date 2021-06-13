/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Text,
  Button,
} from "@chakra-ui/react";
import ProductForm from "components/atoms/Products/ProductForm";
import axios from "axios";
import { useHistory } from "react-router-dom";

type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];

type Props = {
  manufacturer: any;
  isDisplay?: boolean;
};

const ManufacturerExpandContent: React.FC<Props> = ({
  manufacturer,
  isDisplay,
}) => {
  const [transactions, setTransactions] = useState<any[]>();
  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}receipts/findRecentByManufacturer/${manufacturer.id}`
      );
      if (transactions === undefined) {
        setTransactions(result.data);
      }
    };
    fetchTransactions();
  }, [isDisplay]);
  //   const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //     const result = await axios.post(
  //       `${process.env.REACT_APP_SERVER}products/delete`,
  //       { id }
  //     );

  //     if (result.data.status === "success") {
  //       // history.push("/products");
  //       window.location.reload(false);
  //     } else {
  //       alert(result.data.status);
  //     }
  //   };
  if (isDisplay) {
    return (
      <Box>
        <Box>
          <Flex>
            <Box>
              <Flex>
                <Text>Name</Text>
                <Text>{manufacturer.name}</Text>
              </Flex>
              <Flex>
                <Text>Phone</Text>
                <Text>{manufacturer.phone}</Text>
              </Flex>
              <Flex>
                <Text>Address</Text>
                <Text>{manufacturer.address}</Text>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Text>Email</Text>
                <Text>{manufacturer.email}</Text>
              </Flex>
              <Flex>
                <Text>Note</Text>
                <Text>{manufacturer.note}</Text>
              </Flex>
              <Flex>
                <Text>Total</Text>
                <Text>{manufacturer.total}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Table>
            <Thead>
              <Th>Id</Th>
              <Th>Time</Th>
              <Th>Staff</Th>
              <Th>Total</Th>
            </Thead>
            <Tbody>
              {transactions?.map((item) => (
                <Tr>
                  <Td>{item.id}</Td>
                  <Td>{item.created}</Td>
                  <Td>{item.user.name}</Td>
                  <Td>{item.total}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    );
  }
  return <></>;
  // return (
  //   <Box>
  //     <Flex>
  //       <Box w="33.3%">
  //         <Image w="50%" src={image} alt="Error" />
  //       </Box>
  //       <Box>
  //         <Flex w="100%" bg="tomato">
  //           <Box>
  //             <Box>Id:</Box>
  //             <Box>Name:</Box>
  //             <Box>Original Price:</Box>
  //             <Box>Sell Price:</Box>
  //             <Box>Discount:</Box>
  //             <Box>Brand:</Box>
  //           </Box>
  //           <Box>
  //             <Box>{id}</Box>
  //             <Box>{name}</Box>
  //             <Box>{original_price}</Box>
  //             <Box>{sell_price}</Box>
  //             <Box>{discount}</Box>
  //             <Box>{manufacturer.name}</Box>
  //           </Box>
  //           <Box>
  //             <Box>Description</Box>
  //             <Box>{note}</Box>
  //             <Box>Categories</Box>
  //             {categories !== undefined ? (
  //               categories.map((category) => (
  //                 <Box key={category.name}>{category.name}</Box>
  //               ))
  //             ) : (
  //               <> </>
  //             )}
  //           </Box>
  //         </Flex>

  //         <Table>
  //           <Thead>
  //             <Td>Size</Td>
  //             <Td>Color</Td>
  //             <Td>Count</Td>
  //           </Thead>
  //           <Tbody>
  //             {inventory !== undefined ? (
  //               inventory.map((itemSize) => {
  //                 return itemSize.colors.map((itemColor) => {
  //                   return (
  //                     <Tr key={itemSize.size + itemColor.color}>
  //                       <td>{itemSize.size}</td>
  //                       <td>{itemColor.color}</td>
  //                       <td>{itemColor.count}</td>
  //                     </Tr>
  //                   );
  //                 });
  //               })
  //             ) : (
  //               <></>
  //             )}
  //           </Tbody>
  //         </Table>
  //       </Box>
  //     </Flex>
  //     <Flex>
  //       <ProductForm
  //         categoriesList={
  //           productExpandContentProps
  //             ? productExpandContentProps.categoriesList
  //             : undefined
  //         }
  //         manufacturersList={
  //           productExpandContentProps
  //             ? productExpandContentProps.manufacturersList
  //             : undefined
  //         }
  //         productStatesList={
  //           productExpandContentProps
  //             ? productExpandContentProps.productStatesList
  //             : undefined
  //         }
  //         action="edit"
  //         selectedProduct={product}
  //       />
  //       <Button onClick={handleDelete}>Delete</Button>
  //       <Button>Post FaceBook</Button>
  //       <Button>Stop Selling</Button>
  //     </Flex>
  //   </Box>

  // );
};
export default ManufacturerExpandContent;
