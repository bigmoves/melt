import React from "react";
import { Box } from "@chakra-ui/react";

export const Container = (props) => (
  <Box
    w="full"
    pb="12"
    pt="3"
    maxW={{ base: "xl", md: "7xl" }}
    mx="auto"
    px={{ base: "6", md: "8" }}
    {...props}
  />
);

export default Container;
