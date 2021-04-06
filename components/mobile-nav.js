import { forwardRef } from "react";

import Link from "next/link";

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Box,
  DrawerCloseButton,
  Icon,
} from "@chakra-ui/react";
import useCart from "./useCart";
import { FaInstagram } from "react-icons/fa";

export const MobileNavLink = forwardRef(({ children, icon, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      as="a"
      mx={-2}
      display="flex"
      cursor="pointer"
      alignItems="center"
      px="2"
      py="1"
      transition="all 0.2s"
      fontWeight="bold"
      outline="none"
      _focus={{ shadow: "outline" }}
      color="gray.700"
      _notFirst={{ mt: 1 }}
      {...props}
    >
      {children}
    </Box>
  );
});

const MobileNav = ({ isOpen, onClose, finalFocusRef }) => {
  const { products } = useCart();
  return (
    <Drawer
      size="xs"
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent bgColor="lavenderblush" pt={2}>
        <DrawerCloseButton />
        <DrawerBody>
          <Link href="/">
            <MobileNavLink>Work</MobileNavLink>
          </Link>
          <Link href="/about">
            <MobileNavLink>About</MobileNavLink>
          </Link>
          <Link href="/contact">
            <MobileNavLink>Contact</MobileNavLink>
          </Link>
          <Icon mt={5} as={FaInstagram} boxSize={10} color="palevioletred" />
          {/* <Link href="/cart">
            <MobileNavLink>
              Cart {products.length ? `(${products.length})` : null}
            </MobileNavLink>
          </Link> */}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
