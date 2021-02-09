import { RecoilRoot } from "recoil";
import { ThemeProvider, extendTheme, CSSReset } from "@chakra-ui/react";
import "@fontsource/work-sans";
import "@fontsource/montserrat";
import "@fontsource/montserrat/900.css";
import { initCart } from "../components/useCart";

const theme = extendTheme({
  fonts: {
    body: "'Work Sans', sans-serif",
    heading: "'Montserrat', sans-serif",
    mono: "'My Monospaced Font', monospace",
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
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
        </ThemeProvider>
      </CartProvider>
    </RecoilRoot>
  );
}

export default MyApp;
