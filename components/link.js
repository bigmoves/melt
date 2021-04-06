import { Link as ChakraLink, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { useRouter } from "next/router";

function Link(props) {
  const { asPath } = useRouter();
  const { children, href, isActive, ...rest } = props;
  const active = asPath === href || isActive;

  return (
    <NextLink passHref href={href}>
      <ChakraLink
        color={active ? "palevioletred" : "gray.1000"}
        fontWeight={active ? "bold" : "normal"}
        _hover={{
          textDecoration: "underline",
          textDecorationColor: "palevioletred",
          textUnderlinePosition: "under",
          textDecorationStyle: "wavy",
        }}
        {...rest}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
}

export default Link;
