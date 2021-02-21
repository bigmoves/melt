import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

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
        _activeLink={{ texttDecoration: "none" }}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
}

export default Link;
