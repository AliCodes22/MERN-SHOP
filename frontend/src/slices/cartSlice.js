import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((product) =>
          product._id === existItem._id ? item : product
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // CALCULATE ITEMS PRICE
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((total, item) => {
          return (total += item.price + item.qty);
        }, 0)
      );

      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // calculate tax
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));

      // total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.taxPrice) +
        Number(state.shippingPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
