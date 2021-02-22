import {
  Button,
  Text,
  Flex,
  Box,
  Heading,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";
import Header from "../components/header";
import useCart from "../components/useCart";
import { checkout } from "../utils/stripe";
import Image from "next/image";
import Layout from "../components/layout";

const apiHost = "https://api.studsnstuff.dev";

const Cart = ({ config }) => {
  const { items, total, removeFromCart } = useCart();
  console.log({ items });
  return (
    <Layout config={config} collections={[]}>
      <Flex pr="4vw" pl="4vw" pt="4vw" justifyContent="center">
        <Flex direction="column">
          <Flex direction="row">
            <Heading pb="2vw" flex={1}>
              Shopping Cart
            </Heading>
            <Button colorScheme="blackAlpha" onClick={() => checkout(items)}>
              Checkout
            </Button>
          </Flex>
          {items.map((item) => (
            <Flex
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor="blackAlpha.300"
              direction="row"
              alignItems="center"
              mb="5"
            >
              <CloseButton
                color="palevioletred"
                pr="2vw"
                pl="2vw"
                onClick={() => removeFromCart(item.id)}
              />
              {item.image && (
                <Flex alignItems="center" flexBasis="200px">
                  <Image
                    src={`${apiHost}${item.image.url}`}
                    alt="A pot"
                    width={item.image.width}
                    height={item.image.height}
                  />
                </Flex>
              )}
              <Heading as="h3" size="md" pr="2vw" pl="2vw" flex={1}>
                {item.title}
              </Heading>
              <Box pr="2vw">
                <Text fontWeight="bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.price)}
                </Text>
              </Box>
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
        </Flex>
      </Flex>
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
