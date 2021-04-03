import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Stack,
  Heading,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Divider,
  List,
  ListItem,
  IconButton,
} from "@chakra-ui/react";
import Header from "../components/header";
import Logo from "../components/logo";
import { useRouter } from "next/router";
import Link from "./link";
import Cart from "./cart";
import useCart from "./useCart";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

const CartDrawer = ({ btnRef, isOpen, onClose }) => {
  const { products, removeFromCart } = useCart();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="sm"
      motionPreset="none"
    >
      <DrawerOverlay>
        <DrawerContent background="lavenderblush">
          <DrawerHeader>
            <Flex justify="space-between">
              <DrawerCloseButton ml={2} position="relative" />
              <Cart />
            </Flex>
            <Heading size="lg">My Cart</Heading>
          </DrawerHeader>

          <DrawerBody>
            <List>
              {products.map((product) => (
                <ListItem
                  display="flex"
                  borderTop="1px"
                  pt={5}
                  pb={5}
                  borderColor="gray.300"
                >
                  <Box width="100px" mr={3}>
                    <Image
                      src={product.image.url}
                      alt="A pot"
                      width={product.image.width}
                      height={product.image.height}
                    />
                  </Box>
                  <Heading flex={1} size="sm">
                    {product.name}
                  </Heading>
                  <Flex direction="column" alignItems="center">
                    <Text>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(product.price)}
                    </Text>
                    <IconButton
                      mt={1}
                      as={FaRegTrashAlt}
                      boxSize={5}
                      onClick={() => removeFromCart(product.id)}
                      variant="ghost"
                    />
                  </Flex>
                </ListItem>
              ))}
            </List>
          </DrawerBody>

          <DrawerFooter>
            <Button
              onClick={onClose}
              width="100%"
              bgColor="palevioletred"
              color="white"
            >
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

const NewLayout = (props) => {
  const { query } = useRouter();
  const [scrollTop, setScrollTop] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const wiggle = false;

  const boxShadow = `rgba(0,0,0,0.02) 0px 30px 30px,rgba(0,0,0,0.03) 0px 0px 8px,rgba(0,0,0,0.05) 0px 1px 0px`;

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <Box>
      <Box position="sticky" top={0} zIndex={10}>
        <Box
          ml="auto"
          mr="auto"
          px={6}
          py={4}
          background="lavenderblush"
          boxShadow={scrollTop > 10 && boxShadow}
        >
          <Flex alignItems="center">
            <Flex flex={1} alignItems="flex-end">
              <Logo fill="palevioletred" />
              <Box ml={6}>
                <Link href="/">Shop</Link>
                <Link href="/about" ml={4}>
                  About
                </Link>
                <Link href="/contact" ml={4}>
                  Contact
                </Link>
              </Box>
            </Flex>
            <Flex justifyContent="flex-end">
              <Box as="button" ref={btnRef} onClick={onOpen}>
                <Cart
                  className={`cart ${wiggle ? "shake" : ""}`}
                  fill="black"
                />
              </Box>
              <CartDrawer btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box as="main">
        <Box ml="auto" mr="auto" px={6}>
          {props.children}
        </Box>
      </Box>
      <Flex
        as="footer"
        mt={10}
        ml="auto"
        mr="auto"
        px={6}
        py={4}
        bgColor="palevioletred"
        opacity="75%"
        color="white"
      >
        <Flex direction="column" flex={1}>
          <Box>
            <Logo fill="white" width={125} />
            <Text fontWeight="bold">Bishop, CA</Text>
          </Box>
          <Divider my={5} borderColor="white" />
          <Flex justifyContent="space-between">
            <Text>© 2021 Melt. All rights reserved.</Text>
            <Text justifyContent="space-between">
              Crafted by Studs 'N Stuff
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NewLayout;
