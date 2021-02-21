import { RecoilRoot } from "recoil";
import { ChakraProvider, extendTheme, CSSReset } from "@chakra-ui/react";
import Fonts from "../utils/fonts";
import { initCart } from "../components/useCart";

const theme = extendTheme({
  fonts: {
    body: "Work Sans",
    heading: "Work Sans",
    mono: "monospace",
  },
});

const CartProvider = ({ children }) => {
  initCart();
  return children;
};

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <CartProvider>
        <ChakraProvider theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
        </ChakraProvider>
        <Fonts />
      </CartProvider>
    </RecoilRoot>
  );
}

export default MyApp;
