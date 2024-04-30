// here we use createSlice instead of createAPI because there we were dealing with async req

import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; //incoming product to cart

      //checking if the item already exits or not in cart
      const doesItemExist = state.cartItems.find((itm) => itm._id === item._id);

      //if it exist update the item rather than duplicate it
      if (doesItemExist) {
        state.cartItems = state.cartItems.map((itm) =>
          itm._id === doesItemExist._id ? item : itm
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (itm) => itm._id !== action.payload
      );
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },

    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
