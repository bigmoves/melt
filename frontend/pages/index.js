import React, { useEffect } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import uniq from "lodash.uniq";

import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY,
}).base(prcess.env.NEXT_PUBLIC_AIRTABLE_APP_KEY);

const Product = ({ product }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/products/${product.id}`);
  };

  const image = product?.fields?.images?.[0];
  const imageUrl = image ? image.thumbnails.large.url : "";

  return (
    <Box cursor="pointer" onClick={handleClick}>
      {product?.fields?.images?.length > 0 ? (
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
    products.map((p) => p.fields.collection).filter((p) => !!p)
  );
  let collection = collections.find(
    (c) => c.toLowerCase() === query?.collection?.toLowerCase()
  );
  const filteredProducts = products.filter(
    (p) => p.fields.collection === collection
  );

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
    <Layout collections={collections}>
      {filteredProducts.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 10 }}>
          {filteredProducts.map((p) => (
            <Product key={p.id} product={p} />
          ))}
        </SimpleGrid>
      ) : null}
    </Layout>
  );
};

Home.getInitialProps = async (ctx) => {
  try {
    const products = await base("Products")
      .select({
        view: "Grid view",
      })
      .all();

    return { products };
  } catch (error) {
    return error;
  }
};

export default Home;
