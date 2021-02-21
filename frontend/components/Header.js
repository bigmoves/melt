import { Box, Flex, Heading, Img, Text } from "@chakra-ui/react";
import Link from "./link";
import Logo from "./logo";
import useCart from "./useCart";

function Header(props) {
  const { items } = useCart();
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
        <Link href={`/cart`}>{`Cart ${
          items?.length > 0 ? items.length : ""
        }`}</Link>
      </Flex>
    </Flex>
  );
}

export default Header;
