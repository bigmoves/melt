import React from "react";
import { SimpleGrid, Box, Heading, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import Header from "../components/Header";

const apiHost = "http://localhost:1337";

const Item = ({ item }) => (
  <Box borderWidth="1px" p={4}>
    {item.images.length > 0 ? (
      <Image
        src={`${apiHost}${item?.images?.[0].formats.medium.url}`}
        alt="Segun Adebayo"
      />
    ) : null}
    <Text>{item.title}</Text>
    <Text>{item.price}</Text>
    <Link href={`/items/${item.id}`}>Link</Link>
  </Box>
);

const Home = ({ items, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <>
      <Header />
      <SimpleGrid columns={3} spacing={10}>
        {items.map((item) => (
          <Item item={item} />
        ))}
      </SimpleGrid>
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get("http://localhost:1337/items");
    const items = res.data;
    return { items };
  } catch (error) {
    return { error };
  }
};

export default Home;
