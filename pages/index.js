import React, { useEffect } from "react";
import { SimpleGrid, Box, Stack, Heading, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import NewLayout from "../components/new-layout";
import uniq from "lodash.uniq";

import Airtable from "airtable";
import Link from "next/link";

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_APP_KEY);

const Product = ({ product }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/products/${product.id}`);
  };

  const image = product?.images?.[0];
  const imageUrl = image ? image.thumbnails.large.url : "";

  return (
    <Box cursor="pointer" onClick={handleClick}>
      {product?.images?.length > 0 ? (
        <Image
          src={imageUrl}
          alt="melt"
          width={image.thumbnails.large.width}
          height={image.thumbnails.large.height}
        />
      ) : null}
      <style jsx global>{`
        img {
          border-radius: 5px;
        }
      `}</style>
    </Box>
  );
};

const Home = ({ products, error }) => {
  const { query, push } = useRouter();
  const collections = uniq(
    products.map((p) => p.collection).filter((p) => !!p)
  );
  let collection = collections.find(
    (c) => c.toLowerCase() === query?.collection?.toLowerCase()
  );
  const filteredProducts = products.filter((p) => p.collection === collection);

  if (!collection) {
    collection = collections[0];
  }

  useEffect(() => {
    push(`/?collection=${collection.toLowerCase()}`);
  }, []);

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <NewLayout collections={collections}>
      <Flex>
        <Box ml={6} mr={14} mt={10}>
          <Stack>
            <Link href="/">
              <Heading size="sm">All Categories</Heading>
            </Link>
            <Link href="/">Neolithic</Link>
            <Link href="/">Jewelry</Link>
            <Link href="/">Wiggle</Link>
          </Stack>
        </Box>
        {filteredProducts.length > 0 ? (
          <>
            <Box
              display={{ base: "none", md: "block" }}
              bgImg="url(/wiggle_L.svg)"
              minH="600px"
              flex="0 0 100px"
              backgroundSize="contain"
              mt={10}
              mr={2}
            ></Box>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 4, md: 4 }}
              mt={10}
              flex="1"
            >
              {filteredProducts.map((p) => (
                <Product key={p.id} product={p} />
              ))}
            </SimpleGrid>
            <Box
              display={{ base: "none", md: "block" }}
              bgImg="url(/wiggle_R.svg)"
              minH="600px"
              flex="0 0 100px"
              backgroundSize="contain"
              mt={10}
              ml={2}
            ></Box>
          </>
        ) : null}
      </Flex>
    </NewLayout>
  );
};

export async function getStaticProps(ctx) {
  try {
    const products = await base("Products")
      .select({
        view: "Grid view",
      })
      .all();

    return {
      props: { products: products.map((p) => ({ id: p.id, ...p.fields })) },
      revalidate: 60,
    };
  } catch (error) {
    return { props: { error } };
  }
}

export default Home;
