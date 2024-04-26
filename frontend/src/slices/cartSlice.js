// here we use createSlice instead of createAPI because there we were dealing with async req

import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] }; //cartItems is our state

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; //incoming product to cart

      //checking if the item already exits or not in cart
      const existItem = state.cartItems.find((itm) => itm._id === item._id);

      //if it exist update the item rather than duplicate it
      if (existItem) {
        state.cartItems = state.cartItems.map((itm) =>
          itm._id === existItem._id ? item : itm
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
  },
});

export default cartSlice.reducer;
