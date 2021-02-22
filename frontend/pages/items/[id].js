import React from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  Flex,
  Stack,
  Button,
  Stat,
  StatNumber,
} from "@chakra-ui/react";
import Image from "next/image";
import axios from "axios";
import Header from "../../components/header";
import useCart from "../../components/useCart";

const apiHost = "https://api.studsnstuff.dev";

const stripItemForCart = ({ id, title, quantity, price, images }) => {
  let image = null;
  if (images.length) {
    image = images[0].formats.medium;
  }
  return {
    id,
    title,
    quantity,
    price,
    image,
  };
};

const Item = ({ item, error }) => {
  const { addToCart } = useCart();

  if (!item || error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex p="4vw" pb="2vw">
        <Box>{`Shop > ${item.title}`}</Box>
      </Flex>
      <Flex p="4vw" pt="2vw" direction={{ base: "column", md: "row" }}>
        <Flex flex={1} pr="3vw">
          {item?.images?.length > 0 ? (
            <Image
              src={`${apiHost}${item?.images?.[0].formats.medium.url}`}
              alt="A pot"
              width={item?.images?.[0].formats.medium.width}
              height={item?.images?.[0].formats.medium.height}
            />
          ) : null}
        </Flex>

        <Box flex={1}>
          <Stack>
            <Heading>{item.title}</Heading>
            <Text>{item.description}</Text>
            <Stat>
              <StatNumber>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.price)}
              </StatNumber>
            </Stat>
            <Button
              colorScheme="blackAlpha"
              onClick={() => addToCart(stripItemForCart(item))}
            >
              Add to cart
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export async function getServerSideProps(ctx) {
  try {
    const res = await axios.get(`${apiHost}/items/${ctx.params.id}`);
    const item = res.data;
    return { props: { item } };
  } catch (error) {
    return { props: { error: "Not found" } };
  }
}

export default Item;
