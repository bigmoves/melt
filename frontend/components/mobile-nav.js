import { forwardRef } from "react";

import Link from "next/link";

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Box,
} from "@chakra-ui/react";
import useCart from "./useCart";

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
      placement="left"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent bgColor="lavenderblush" pt={2}>
        <DrawerBody>
          <Link href="/">
            <MobileNavLink>Shop</MobileNavLink>
          </Link>
          <Link href="/about">
            <MobileNavLink>About</MobileNavLink>
          </Link>
          <Link href="/contact">
            <MobileNavLink>Contact</MobileNavLink>
          </Link>
          <Link href="/cart">
            <MobileNavLink>
              Cart {products.length ? `(${products.length})` : null}
            </MobileNavLink>
          </Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileNav;
