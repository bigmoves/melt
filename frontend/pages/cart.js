import {
  Button,
  Text,
  Flex,
  Box,
  Heading,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";
import useCart from "../components/useCart";
import { checkout } from "../utils/stripe";
import Image from "next/image";
import Layout from "../components/layout";

const Cart = ({ config }) => {
  const { products, total, removeFromCart } = useCart();
  return (
    <Layout
      config={config}
      collections={[]}
      direction="column"
      justifyContent="flex-start"
    >
      <Flex direction={{ base: "column", md: "row" }} mb={[0, 5]}>
        <Heading pb="2vw" flex={1}>
          Shopping Cart
        </Heading>
        {products.length > 0 && (
          <Button
            colorScheme="blackAlpha"
            onClick={() => checkout(products)}
            display={{ base: "none", md: "block" }}
          >
            Checkout
          </Button>
        )}
      </Flex>
      {products.length === 0 && <Flex flex={1}>No items in cart.</Flex>}
      {products.map((product) => (
        <Flex
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor="blackAlpha.300"
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          pb={{ base: 5, md: 0 }}
          mb="5"
        >
          {product.image && (
            <Flex alignItems="center" flexBasis="200px">
              <Image
                src={product.image.url}
                alt="A pot"
                width={product.image.width}
                height={product.image.height}
              />
              <style jsx global>{`
                img {
                  border-radius: 5px;
                }
              `}</style>
            </Flex>
          )}
          <Heading as="h3" size="md" pr="2vw" pl="2vw" flex={1}>
            {product.name}
          </Heading>
          <Box pr="2vw">
            <Text fontWeight="bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </Text>
          </Box>
          <CloseButton
            color="palevioletred"
            pr="2vw"
            pl="2vw"
            onClick={() => removeFromCart(product.id)}
          />
        </Flex>
      ))}
      <Text
        pb="2vw"
        pt="2vw"
        fontSize="x-large"
        fontWeight="bold"
        textAlign="right"
      >
        Subtotal:{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total)}
      </Text>
      {products.length > 0 && (
        <Button
          colorScheme="blackAlpha"
          onClick={() => checkout(products)}
          display={{ base: "blockk", md: "none" }}
        >
          Checkout
        </Button>
      )}
    </Layout>
  );
};

Cart.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get("https://api.studsnstuff.dev/configs/1");
    const config = res.data;
    return { config };
  } catch (error) {
    return { error };
  }
};

export default Cart;
