import { Box, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { useState } from "react";
import Cart from "./cart";
import Link from "./link";
import Logo from "./logo";
import useCart from "./useCart";

function Header(props) {
  const { items, wiggle } = useCart();
  return (
    <Flex
      as="header"
      alignItems="center"
      width="100%"
      pt="4vw"
      pl="12vw"
      pr="12vw"
      {...props}
    >
      <Box flex={1} display={{ base: "none", md: "block" }}>
        <Flex width={200} justifyContent="space-between">
          <Box>
            <Link href="/">Shop</Link>
          </Box>
          <Box>
            <Link href="/about">About</Link>
          </Box>
          <Box>
            <Link href="/contact">Contact</Link>
          </Box>
        </Flex>
      </Box>

      <Flex flex={1} justifyContent="center">
        <Link href="/">
          <Logo fill="palevioletred" />
        </Link>
      </Flex>

      <Flex
        flex={1}
        justifyContent="flex-end"
        display={{ base: "none", md: "flex" }}
      >
        <Link href={`/cart`}>
          <style jsx global>{`
            .cart.shake {
              animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
              transform: translate3d(0, 0, 0);
              backface-visibility: hidden;
              perspective: 1000px;
            }

            @keyframes shake {
              10%,
              90% {
                transform: translate3d(-1px, 0, 0);
              }

              20%,
              80% {
                transform: translate3d(2px, 0, 0);
              }

              30%,
              50%,
              70% {
                transform: translate3d(-4px, 0, 0);
              }

              40%,
              60% {
                transform: translate3d(4px, 0, 0);
              }
            }
          `}</style>
          <Box position="relative">
            {items.length > 0 ? (
              <Flex
                position="absolute"
                w={7}
                h={7}
                borderRadius="50%"
                alignItems="center"
                justifyContent="center"
                bgColor="palevioletred"
                color="white"
                fontWeight="bold"
                top={0}
                right={0}
              >
                {items.length}
              </Flex>
            ) : null}
            <Cart className={`cart ${wiggle ? "shake" : ""}`} fill="black" />
          </Box>
        </Link>
      </Flex>
    </Flex>
  );
}

export default Header;
