import React, { useEffect } from "react";
import {
  SimpleGrid,
  Box,
  Text,
  Flex,
  Divider,
  Heading,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import Header from "../components/header";
import { useRouter } from "next/router";
import Link from "../components/link";
import Logo from "../components/logo";
import Layout from "../components/layout";

const apiHost = "http://64.227.109.182";

const Item = ({ item }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/items/${item.id}`);
  };

  const image = item.images[0];
  const imageUrl = item ? image.formats.medium.url : "";

  return (
    <Box cursor="pointer" onClick={handleClick}>
      {item.images.length > 0 ? (
        <Image
          className="item-image"
          src={`${apiHost}${imageUrl}`}
          alt="melt"
          width={image.formats.medium.width}
          height={image.formats.medium.height}
        />
      ) : null}
      <style jsx global>{`
        .item-image {
          border-radius: 5px;
        }
      `}</style>
    </Box>
  );
};

const Home = ({ config, collections, error }) => {
  const { query, push } = useRouter();
  let collection = collections.find(
    (c) => c.name.toLowerCase() === query?.collection?.toLowerCase()
  );

  if (!collection) {
    collection = collections[0];
  }

  useEffect(() => {
    push(`/?collection=${collection.name.toLowerCase()}`);
  }, []);

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <Layout collections={collections} config={config}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 10 }}>
        {collection.items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </Layout>
  );
};

Home.getInitialProps = async (ctx) => {
  try {
    const collections = await axios
      .get("http://64.227.109.182/collections")
      .then((r) => r.data);
    const config = await axios
      .get("http://64.227.109.182/configs/1")
      .then((r) => r.data);
    return {
      config,
      collections: collections.sort((a, b) => a.order - b.order),
    };
  } catch (error) {
    return { error };
  }
};

export default Home;
