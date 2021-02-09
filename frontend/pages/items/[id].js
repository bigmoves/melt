import React from "react";
import { Box, Heading, Text, Image, Link } from "@chakra-ui/react";
import axios from "axios";
import Header from "../../components/Header";
import useCart from "../../components/useCart";

const apiHost = "http://localhost:1337";

const Item = ({ item, error }) => {
  const { addToCart } = useCart();

  if (!item || error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <>
      <Header />
      <Box borderWidth="1px" p={4}>
        {item?.images?.length > 0 ? (
          <Image
            src={`${apiHost}${item?.images?.[0].formats.medium.url}`}
            alt="Segun Adebayo"
          />
        ) : null}
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>$$$ {item.price}</Text>
        <Link onClick={() => addToCart(item)}>Add to cart</Link>
      </Box>
    </>
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
