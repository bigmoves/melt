import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Stack, Heading } from "@chakra-ui/react";
import Header from "../components/header";
import Logo from "../components/logo";
import { useRouter } from "next/router";
import Link from "./link";
import Cart from "./cart";

const NewLayout = (props) => {
  const { query } = useRouter();
  const [scrollTop, setScrollTop] = useState(0);
  const wiggle = false;

  const boxShadow = `rgba(0,0,0,0.02) 0px 30px 30px,rgba(0,0,0,0.03) 0px 0px 8px,rgba(0,0,0,0.05) 0px 1px 0px`;

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <Box>
      <Box position="sticky" top={0} zIndex={10}>
        <Box
          ml="auto"
          mr="auto"
          px={6}
          py={4}
          background="lavenderblush"
          boxShadow={scrollTop > 10 && boxShadow}
        >
          <Flex alignItems="center">
            <Flex flex={1} alignItems="flex-end">
              <Logo fill="palevioletred" />
              <Box ml={6}>
                <Link href="/">Shop</Link>
                <Link href="/about" ml={4}>
                  About
                </Link>
                <Link href="/contact" ml={4}>
                  Contact
                </Link>
              </Box>
            </Flex>
            <Flex justifyContent="flex-end">
              <Cart className={`cart ${wiggle ? "shake" : ""}`} fill="black" />
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box as="main">
        <Box ml="auto" mr="auto" px={6}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default NewLayout;
