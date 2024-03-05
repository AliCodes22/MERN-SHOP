export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
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

  return state;
};
