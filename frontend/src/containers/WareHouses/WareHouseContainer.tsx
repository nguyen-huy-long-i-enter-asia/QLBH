/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "components/atoms/Pagination";
import Cookies from "js-cookie";

const WareHouseContainer: React.FC = () => {
  return (
    <div>
      {/* <Flex>
    <VStack>
      <Box>WareHouse</Box>
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
  <Pagination items={filteredList} onChangePage={handlePagination} /> */}
    </div>
  );
};
export default WareHouseContainer;
