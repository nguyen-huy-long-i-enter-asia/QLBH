import React, { useRef } from "react";
import {
  Box,
  Stack,
  Select,
  Radio,
  RadioGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuOptionGroup,
  MenuItemOption,
  IconButton,
} from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";
import CheckBoxFilter from "components/molecules/filter/CheckBoxFilter";
import TextFilter from "components/molecules/filter/TextFilter";
import "layouts/layout.css";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

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

  handleSelectChange?: (e: React.FormEvent<HTMLSelectElement>) => void;

  handleOnclick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const FilterTemplate: React.FC<Props> = ({
  pageTitle,
  checkboxFilters,
  selectFilters,
  timeFilter,
  handleSelectChange,
  handleOnclick,
}) => {
  // const radioFocus = useRef<HTMLInputElement>(null);
  // const focusRadio = () => {
  //   if (radioFocus.current !== null) {
  //     radioFocus.current.click();
  //   }
  // };
  return (
    <Box className="filter-list">
      <Box className="page-title">
        <p>{pageTitle}</p>
      </Box>
      {timeFilter !== undefined ? (
        <Box className="filter-box" p="4% 0">
          <RadioGroup value={timeFilter.option}>
            <Stack>
              <Radio
                id="datePicker"
                value="datePicker"
                onChange={timeFilter.handleTimeOptionChange}
                // ref={radioFocus}
              >
                <Box>
                  {timeFilter.datePicker}
                  <Menu placement="right">
                    <MenuButton
                      id="date_picker_menu"
                      as={IconButton}
                      icon={<UpDownIcon />}
                      // onClick={focusRadio}
                    />
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
                </Box>
              </Radio>
              <Radio
                value="dateRange"
                onChange={timeFilter.handleTimeOptionChange}
              >
                <DateRangePickerComponent
                  placeholder="Enter Date range"
                  startDate={timeFilter.dateRange.startDate}
                  endDate={timeFilter.dateRange.endDate}
                  change={timeFilter.handleRangeTimeChange}
                />
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
            handleOnclick={handleOnclick}
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
    </Box>
  );
};
export default FilterTemplate;
