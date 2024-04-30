import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});



//the flow is
// apiSlice -> Routes -> controller -> save to db
// example:
// PlaceOrderScreen -> useCreateOrderMutation(ordersApiSlice) -> addOrderItems(orderRoutes) -> Order.save(orderConteoller)

//if its a apiSlice we can directly call the reducers/function but regular slices need to use useDispatch