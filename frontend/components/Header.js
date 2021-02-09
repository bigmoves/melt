import { Heading } from "@chakra-ui/react";
import Link from "next/link";
import useCart from "./useCart";

export default function Header() {
  const { items } = useCart();
  return (
    <>
      <Heading fontWeight={900}>Melt</Heading>
      <Link href={`/`}>Home</Link> |{" "}
      <Link href={`/cart`}>{`Cart ${
        items?.length > 0 ? items.length : ""
      }`}</Link>
    </>
  );
}
