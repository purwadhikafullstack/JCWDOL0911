import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/users/userSlice";
import questionReducer from "../features/qna/questionSlice";
import rajaongkirReducer from "../features/rajaongkir/rajaongkirSlice";
import addressReducer from '../features/users/addressSlice'

//Global state

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    questions: questionReducer,
    rajaongkir: rajaongkirReducer,
    address:addressReducer
  },
});
