import React, { useEffect, useState } from "react";
import { css, SerializedStyles } from "@emotion/react";
import { Table, Tbody, Tr, Td } from "@chakra-ui/react";
import CustomThead from "components/atoms/CustomThead";
import ProductExpandContent from "components/molecules/Products/ProductExpandContent";
import ReceiptExpandContent from "components/molecules/Receipts/ReceiptExpandContent";

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
};

type ReceiptExpandContentProps = {
  handleDeleteReceipt: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
type Props = {
  fields: string[];
  dataList: any;
  itemType: string;
  productExpandContentProps?: ProductExpandContentProps;
  receiptExpandContentProps?: ReceiptExpandContentProps;
};

const TableTemplate: React.FC<Props> = ({
  fields,
  dataList,
  itemType,
  productExpandContentProps,
  receiptExpandContentProps,
}) => {
  const [expandList, setExpandList] = useState<
    { id: number; display: boolean }[]
  >([]);
  useEffect(() => {
    setExpandList(
      dataList.map((item: any) => ({ id: item.id, display: false }))
    );
  }, [dataList]);
  const handleItemClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const newExpandList = expandList.map((item: any) =>
      String(item.id) === e.currentTarget.id
        ? { id: item.id, display: !item.display }
        : { id: item.id, display: false }
    );

    setExpandList(newExpandList);
  };
  return (
    <Table className="table">
      <CustomThead fields={fields} />

      <Tbody>
        {dataList.map((item: any) => {
          const displayItem = expandList.filter(
            (expandItem) => expandItem.id === Number(item.id)
          )[0];

          return (
            <React.Fragment key={item.id}>
              <Tr id={item.id} onClick={handleItemClick}>
                {fields.map((field) => (
                  <Td key={field}>
                    {typeof item[field] === "object"
                      ? item[field].name
                      : item[field]}
                  </Td>
                ))}
              </Tr>

              <Tr
                bg="white"
                id={`${item.id}-content`}
                style={{
                  display:
                    displayItem !== undefined && displayItem.display === true
                      ? "table-row"
                      : "none",
                }}
              >
                <Td colSpan={fields.length}>
                  {(() => {
                    if (itemType === "product") {
                      return (
                        <ProductExpandContent
                          product={item}
                          productExpandContentProps={productExpandContentProps}
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
