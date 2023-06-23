import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
// import userReducer from "../features/user/userSlice";
import userReducer from "../features/users/userSlice";
import questionReducer from "../features/qna/questionSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/cartegory/categorySlice"

//Global state

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    // user: userReducer,
    questions: questionReducer,
    products: productReducer,
    categories: categoryReducer
  },
});
