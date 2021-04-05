import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Stat,
  StatNumber,
} from "@chakra-ui/react";
import Image from "next/image";
import useCart from "../../components/useCart";

import Airtable from "airtable";
import NewLayout from "../../components/new-layout";

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_APP_KEY);

const stripItemForCart = ({ id, name, quantity, price, images }) => {
  let image = null;
  if (images.length) {
    image = images[0].thumbnails.large;
  }
  return {
    id,
    name,
    quantity,
    price,
    image,
  };
};

const Product = ({ product, error }) => {
  const { addToCart } = useCart();

  if (!product || error) {
    return <div>An error occured: {error.message}</div>;
  }

  const image = product?.images?.[0];
  const imageUrl = image ? image.thumbnails.full.url : "";

  return (
    <NewLayout collections={[]}>
      <Flex height="100%">
        <Flex flex={1} mr={3} minH="100%">
          {product?.images?.length > 0 ? (
            <Image
              src={imageUrl}
              alt="melt"
              width={1050}
              height={1050}
              objectFit="cover"
              quality={100}
            />
          ) : null}
        </Flex>

        <Box flex={1} p={5}>
          <Heading>{product.name}</Heading>
          <Text>{product.description}</Text>
          <Stat pb={5}>
            <StatNumber>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.price)}
            </StatNumber>
          </Stat>
          <Button
            colorScheme="blackAlpha"
            onClick={() => addToCart(stripItemForCart(product))}
          >
            Add to cart
          </Button>
        </Box>
      </Flex>
    </NewLayout>
  );
};

export async function getServerSideProps(ctx) {
  try {
    const product = await base("Products").find(ctx.params.id);
    return { props: { product: product.fields } };
  } catch (error) {
    return { props: { error: "Not found" } };
  }
}

export default Product;
