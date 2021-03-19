import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";
import { atom } from "recoil";

export const cartProductsState = atom({
  key: "cartProductsState",
  default: [],
});

export const cartTotalState = atom({
  key: "cartTotalState",
  default: 0,
});

export const cartWiggleState = atom({
  key: "cartWiggleState",
  default: false,
});

export const initCart = () => {
  const [, setProducts] = useRecoilState(cartProductsState);
  let [, setTotal] = useRecoilState(cartTotalState);

  useEffect(() => {
    const cart = Cookies.getJSON("cart");
    setProducts(cart ? cart : []);
    updateTotal(cart, setTotal);
  }, []);
};

const updateTotal = (products, setTotal) => {
  let total = 0;
  products?.forEach((product) => {
    total += product.price * product.quantity;
  });
  setTotal(total);
};

const useCart = () => {
  const [products, setProducts] = useRecoilState(cartProductsState);
  let [total, setTotal] = useRecoilState(cartTotalState);
  const [wiggle, setWiggle] = useRecoilState(cartWiggleState);

  const wiggleCart = () => {
    setWiggle(true);
    setTimeout(() => {
      setWiggle(false);
    }, 2000);
  };

  const addToCart = (product) => {
    const newProducts = [...products, { ...product, quantity: 1 }];
    setProducts(newProducts);
    updateTotal(newProducts, setTotal);
    wiggleCart();
    Cookies.set("cart", newProducts);
  };

  const removeFromCart = (productId) => {
    const newProducts = products.filter((product) => productId !== product.id);
    setProducts(newProducts);
    updateTotal(newProducts, setTotal);
    Cookies.set("cart", newProducts);
  };

  return { total, products, setProducts, addToCart, removeFromCart, wiggle };
};

export default useCart;
