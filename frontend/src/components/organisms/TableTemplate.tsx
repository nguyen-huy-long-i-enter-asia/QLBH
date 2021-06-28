import React, { useEffect, useState } from "react";
import { css, SerializedStyles } from "@emotion/react";
import { Table, Tbody, Tr, Td } from "@chakra-ui/react";
import CustomThead from "components/atoms/CustomThead";
import ProductExpandContent from "components/molecules/Products/ProductExpandContent";
import ReceiptExpandContent from "components/molecules/Receipts/ReceiptExpandContent";
import OrderExpandContent from "components/molecules/Orders/OrderExpandContent";
import ManufacturerExpandContent from "components/molecules/Manufacturers/ManufacturerExpandContent";
import CustomerExpandContent from "components/molecules/Users/CustomerExpandContent";
import StaffExpandContent from "components/molecules/Users/StaffExpandContent";

const tableStyle = css`
  border: groove;
`;
type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];
type ManufacturersList = {
  id: number;
  name: string;
}[];
type ProductExpandContentProps = {
  categoriesList: CategoriesList;
  manufacturersList: ManufacturersList;
  productStatesList: { id: number; name: string }[];
};

type ReceiptExpandContentProps = {
  handleDeleteReceipt: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
type Props = {
  fields: string[];
  handleSort: (e: React.MouseEvent<HTMLTableCaptionElement>) => void;
  dataList: any;
  itemType: string;
  productExpandContentProps?: ProductExpandContentProps;
  receiptExpandContentProps?: ReceiptExpandContentProps;
};

const TableTemplate: React.FC<Props> = ({
  fields,
  dataList,
  handleSort,
  itemType,
  productExpandContentProps,
  receiptExpandContentProps,
}) => {
  const [expandList, setExpandList] = useState<
    { id: number; display: boolean }[]
  >(dataList.map((item: any) => ({ id: item.id, display: false })));

  useEffect(() => {
    if (dataList.length > 0) {
      setExpandList(dataList.map((item: any) => ({ ...item, display: false })));
    } else {
      setExpandList([]);
    }
  }, [dataList]);
  const handleItemClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const newExpandList = expandList.map((item: any) =>
      String(item.id) === e.currentTarget.id
        ? { ...item, display: !item.display }
        : { ...item, display: false }
    );

    setExpandList(newExpandList);
  };
  if (expandList.length === 0) {
    return (
      <Table className="table">
        <CustomThead fields={fields} handleSort={handleSort} />
      </Table>
    );
  }

  return (
    <Table className="table">
      <CustomThead fields={fields} handleSort={handleSort} />

      <Tbody>
        {expandList.map((item: any) => {
          // const displayItem = expandList.filter(
          //   (expandItem) => expandItem.id === Number(item.id)
          // )[0];
          // console.log(displayItem);
          return (
            <React.Fragment key={item.id}>
              <Tr
                id={item.id}
                onClick={handleItemClick}
                bgColor={item.display === true ? "#51cdc426" : "white"}
                borderTop={
                  item.display === true ? "2px solid #3cc7bd" : undefined
                }
                borderLeft={
                  item.display === true ? "2px solid #3cc7bd" : undefined
                }
                borderRight={
                  item.display === true ? "2px solid #3cc7bd" : undefined
                }
              >
                {fields.map((field) => (
                  <Td key={field}>
                    {(() => {
                      if (item[field] === null) {
                        return "";
                      }
                      if (typeof item[field] === "object") {
                        return item[field].name;
                      }
                      return item[field];
                    })()}
                  </Td>
                ))}
              </Tr>

              <Tr
                bg="white"
                id={`${item.id}-content`}
                style={{
                  display: item.display === true ? "table-row" : "none",
                }}
                borderLeft={
                  item.display === true ? "2px solid #3cc7bd" : undefined
                }
                borderRight={
                  item.display === true ? "2px solid #3cc7bd" : undefined
                }
                borderBottom={
                  item.display === true ? "2px solid #3cc7bd" : undefined
                }
              >
                <Td colSpan={fields.length} p="0%">
                  {(() => {
                    if (itemType === "product") {
                      return (
                        <ProductExpandContent
                          product={item}
                          productExpandContentProps={productExpandContentProps}
                          isDisplay={item ? item.display : undefined}
                        />
                      );
                    }
                    if (itemType === "receipt") {
                      return (
                        <ReceiptExpandContent
                          receipt={item}
                          receiptExpandContentProps={receiptExpandContentProps}
                        />
                      );
                    }
                    if (itemType === "order") {
                      return <OrderExpandContent order={item} />;
                    }
                    if (itemType === "manufacturer") {
                      return (
                        <ManufacturerExpandContent
                          manufacturer={item}
                          isDisplay={item ? item.display : undefined}
                        />
                      );
                    }
                    if (itemType === "customer") {
                      return (
                        <CustomerExpandContent
                          customer={item}
                          isDisplay={item ? item.display : undefined}
                        />
                      );
                    }
                    if (itemType === "staff") {
                      return (
                        <StaffExpandContent
                          staff={item}
                          isDisplay={item ? item.display : undefined}
                        />
                      );
                    }
                    return <></>;
                  })()}
                </Td>
              </Tr>
            </React.Fragment>
          );
        })}
      </Tbody>
    </Table>
  );
};
export default TableTemplate;
