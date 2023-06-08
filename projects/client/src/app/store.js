import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
=======
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";
>>>>>>> development

//Global state

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});
