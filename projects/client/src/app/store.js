import { configureStore } from "@reduxjs/toolkit";

//Global state
import cartReducer from "../features/cart/cartSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
