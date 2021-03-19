import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  Button,
  Stat,
  StatNumber,
} from "@chakra-ui/react";
import Image from "next/image";
import Header from "../../components/header";
import useCart from "../../components/useCart";

import Airtable from "airtable";
import Layout from "../../components/layout";

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY,
}).base(prcess.env.NEXT_PUBLIC_AIRTABLE_APP_KEY);

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
  const imageUrl = image ? image.thumbnails.large.url : "";

  return (
    <Layout collections={[]} direction={{ base: "column", md: "row" }} flex={1}>
      <Flex flex={{ base: "none", md: 1 }} pr="3vw" alignItems="flex-start">
        {product?.images?.length > 0 ? (
          <Image
            src={imageUrl}
            alt="melt"
            width={image.thumbnails.large.width}
            height={image.thumbnails.large.height}
            objectFit="contain"
          />
        ) : null}
        <style jsx global>{`
          img {
            border-radius: 5px;
          }
        `}</style>
      </Flex>

      <Box flex={1}>
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
    </Layout>
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
