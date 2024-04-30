//we have not added this to store as its a child of apiSlice

import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: order,
      }),
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5
    }),

    // getMyOrders: builder.mutation({
    //   query: () => ({
    //     url: `${ORDERS_URL}/mine`,
    //     method: "GET",
    //   }),
    // }),

  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApiSlice;
