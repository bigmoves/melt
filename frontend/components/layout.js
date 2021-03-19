import React from "react";
import { Box, Text, Flex, Stack } from "@chakra-ui/react";
import Header from "../components/header";
import Logo from "../components/logo";
import { useRouter } from "next/router";
import Link from "./link";

const Layout = (props) => {
  const { query } = useRouter();

  const { collections, ...rest } = props;

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      {collections.length > 0 && (
        <Flex p="4vw" alignItems="center" justifyContent="center">
          <Flex justifyContent="space-between" width={250}>
            {collections.map((c) => (
              <Link
                href={`/?collection=${c.toLowerCase()}`}
                isActive={c.toLowerCase() === query?.collection?.toLowerCase()}
              >
                {c}
              </Link>
            ))}
          </Flex>
        </Flex>
      )}
      <Flex pl="4vw" pr="4vw">
        <Box
          display={{ base: "none", md: "block" }}
          bgImg="url(/wiggle_L.svg)"
          minH="600px"
          flex="0 0 100px"
          backgroundSize="contain"
        ></Box>
        <Flex
          pl={{ base: 0, md: "4vw" }}
          pr={{ base: 0, md: "4vw" }}
          pb="4vw"
          pt="2vw"
          flex={1}
          justifyContent="center"
          {...rest}
        >
          {props.children}
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          bgImg="url(/wiggle_R.svg)"
          minH="600px"
          flex="0 0 100px"
          backgroundSize="contain"
        ></Box>
      </Flex>
      <Flex
        as="footer"
        mt="4vw"
        pr="12vw"
        pl="12vw"
        pt={10}
        pb={10}
        bgColor="palevioletred"
        opacity="75%"
        color="white"
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <Stack>
          <Logo fill="white" marginLeft={-43} />
          <Text fontWeight="bold">123 Melt St</Text>
          <Text fontWeight="bold">Portland, OR 97232</Text>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Layout;
