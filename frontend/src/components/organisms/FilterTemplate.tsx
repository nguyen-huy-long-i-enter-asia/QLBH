/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from "react";
import {
  Box,
  Flex,
  Stack,
  Select,
  Radio,
  RadioGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  MenuOptionGroup,
  MenuItemOption,
  IconButton,
} from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";
import CheckBoxFilter from "components/molecules/filter/CheckBoxFilter";
import RangeFilter from "components/molecules/filter/RangeFilter";
import TextFilter from "components/molecules/filter/TextFilter";
import "layouts/layout.css";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

type RangeFilter = {
  from: number;
  to: number;
  isApplied: boolean;
  filterName: string;
  handleSet: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleUnset: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
type Props = {
  pageTitle: string;
  checkboxFilters?: {
    filterName: string;
    filterConditions: {
      name: string;
      isChecked: boolean;
    }[];
  }[];

  selectFilters?: {
    filterName: string;
    value: string;
    selectList: {
      id: string;
      name: string;
    }[];
  }[];
  timeFilter?: {
    datePicker: string;
    dateRange: {
      startDate: Date;
      endDate: Date;
    };
    option: string;
    handleRangeTimeChange: (e: any) => void;
    handleTimeOptionChange: (e: any) => void;
    handleTimePicker: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
  rangeFilter?: RangeFilter;
  handleSelectChange?: (e: React.FormEvent<HTMLSelectElement>) => void;

  handleCheckBoxClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const FilterTemplate: React.FC<Props> = ({
  pageTitle,
  checkboxFilters,
  selectFilters,
  timeFilter,
  rangeFilter,
  handleSelectChange,
  handleCheckBoxClick,
}) => {
  return (
    <Box className="filter-list">
      <Box className="page-title">
        <Text fontSize="3xl">{pageTitle}</Text>
      </Box>
      {timeFilter !== undefined ? (
        <Box className="filter-box">
          <RadioGroup value={timeFilter.option}>
            <Stack>
              <Radio
                id="datePicker"
                value="datePicker"
                onChange={timeFilter.handleTimeOptionChange}
                w="100%"
              >
                <Flex
                  className="ABCXYZ"
                  w="9.38vw"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {timeFilter.datePicker}
                  <Menu placement="right">
                    <MenuButton
                      id="date_picker_menu"
                      as={IconButton}
                      // icon={<UpDownIcon />}
                      bgColor="white"
                      _hover={{ background: "white" }}
                      p="0px"
                      mr="0px"
                    >
                      <UpDownIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuOptionGroup defaultValue="This month" type="radio">
                        <MenuItemOption
                          value="This day"
                          onClick={timeFilter.handleTimePicker}
                        >
                          This day
                        </MenuItemOption>
                        <MenuItemOption
                          value="This week"
                          onClick={timeFilter.handleTimePicker}
                        >
                          This week
                        </MenuItemOption>
                        <MenuItemOption
                          value="This month"
                          onClick={timeFilter.handleTimePicker}
                        >
                          This month
                        </MenuItemOption>
                        <MenuItemOption
                          value="This year"
                          onClick={timeFilter.handleTimePicker}
                        >
                          This year
                        </MenuItemOption>
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
                </Flex>
              </Radio>
              <Radio
                w="100%"
                value="dateRange"
                onChange={timeFilter.handleTimeOptionChange}
              >
                <Box w="9vw">
                  <DateRangePickerComponent
                    placeholder="Enter Date range"
                    startDate={timeFilter.dateRange.startDate}
                    endDate={timeFilter.dateRange.endDate}
                    change={timeFilter.handleRangeTimeChange}
                  />
                </Box>
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
      ) : (
        <></>
      )}

      {checkboxFilters !== undefined ? (
        checkboxFilters.map((filter) => (
          <CheckBoxFilter
            key={filter.filterName}
            filterName={filter.filterName}
            filterConditions={filter.filterConditions}
            handleOnclick={handleCheckBoxClick}
          />
        ))
      ) : (
        <> </>
      )}
      {selectFilters !== undefined ? (
        selectFilters.map((filter) => (
          <Select
            name={filter.filterName}
            value={filter.value}
            onChange={handleSelectChange}
          >
            {filter.selectList.map((selectItem) => (
              <option value={selectItem.id}>{selectItem.name}</option>
            ))}
          </Select>
        ))
      ) : (
        <></>
      )}
      {/* {textFilters.map((filter) => (
        <TextFilter key={filter.filterName} filterName={filter.filterName} />
      ))} */}
      {rangeFilter !== undefined ? (
        <RangeFilter
          filterName={rangeFilter.filterName}
          from={rangeFilter.from}
          to={rangeFilter.to}
          isApplied={rangeFilter.isApplied}
          handleFromChange={rangeFilter.handleFromChange}
          handleToChange={rangeFilter.handleToChange}
          handleSetRange={rangeFilter.handleSet}
          handleUnsetRange={rangeFilter.handleUnset}
        />
      ) : (
        <> </>
      )}
    </Box>
  );
};
export default FilterTemplate;
