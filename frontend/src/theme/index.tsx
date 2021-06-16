import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Td } from "theme/components/table";

// Version 1: Using objects
export const MyTheme = extendTheme({
  components: { Td },
});
// export default overrideTheme;
