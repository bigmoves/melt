import { Link as ChakraLink, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import NextLink from "next/link";
import { useRouter } from "next/router";

const LinkContainer = styled(Box)`
  & a:hover {
    text-decoration: underline;
    text-decoration-color: palevioletred;
    text-decoration-style: wavy;
    text-underline-position: under;
    font-weight: bold;
    color: palevioletred;
  }
`;

function Link(props) {
  const { pathname } = useRouter();
  const { children, href, isActive, ...rest } = props;
  const active = pathname === href || isActive;

  return (
    <NextLink passHref href={href}>
      <ChakraLink
        {...rest}
        color={active ? "palevioletred" : "gray.1000"}
        fontWeight={active ? "bold" : "normal"}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
}

export default Link;
