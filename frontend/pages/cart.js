import { Button, Link, Text } from "@chakra-ui/react";
import React from "react";
import Header from "../components/Header";
import useCart from "../components/useCart";
import { checkout } from "../utils/stripe";

const apiHost = "http://localhost:1337";

const Cart = ({}) => {
  const { items, total, removeFromCart } = useCart();
  console.log(items);
  return (
    <>
      <Header />
      <Text>Total: {total}</Text>
      <Button onClick={() => checkout(items)}>Checkout</Button>
      <br />
      {items.map((item) => (
        <>
          <div>{item.title}</div>
          <div>{item.price}</div>
          <Link onClick={() => removeFromCart(item.id)}>x</Link>
        </>
      ))}
    </>
  );
};

export default Cart;
