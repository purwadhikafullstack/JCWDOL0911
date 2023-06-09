import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
// import userReducer from "../features/user/userSlice";
import userReducer from "../features/users/userSlice";
import questionReducer from "../features/qna/questionSlice";

//Global state

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    // user: userReducer,
    questions: questionReducer,
  },
});
