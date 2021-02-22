import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";
import { atom } from "recoil";

export const cartItemsState = atom({
  key: "cartItemsState",
  default: [],
});

export const cartTotalState = atom({
  key: "cartTotalState",
  default: 0,
});

export const initCart = () => {
  const [, setItems] = useRecoilState(cartItemsState);
  let [, setTotal] = useRecoilState(cartTotalState);

  useEffect(() => {
    const cart = Cookies.getJSON("cart");
    setItems(cart ? cart : []);
    updateTotal(cart, setTotal);
  }, []);
};

const updateTotal = (items, setTotal) => {
  let total = 0;
  items?.forEach((item) => {
    total += item.price * item.quantity;
  });
  setTotal(total);
};

const useCart = () => {
  const [items, setItems] = useRecoilState(cartItemsState);
  let [total, setTotal] = useRecoilState(cartTotalState);

  const addToCart = (item) => {
    const newItems = [...items, { ...item, quantity: 1 }];
    setItems(newItems);
    updateTotal(newItems, setTotal);
    Cookies.set("cart", newItems);
  };

  const removeFromCart = (itemId) => {
    const newItems = items.filter((item) => itemId !== item.id);
    setItems(newItems);
    updateTotal(newItems, setTotal);
    Cookies.set("cart", newItems);
  };

  return { total, items, setItems, addToCart, removeFromCart };
};

export default useCart;
