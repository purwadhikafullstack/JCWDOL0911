import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
  order: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.order = action.value;
    },
  },
});

export const addUserOrder = (orderData) => {
  return async (dispatch) => {
    const userId = JSON.parse(localStorage.getItem("user")).iduser;
    console.log(orderData);
    let response = await Axios.post(
      `${process.env.REACT_APP_API_BE}/order/setorder/${userId}`,
      orderData
    );
    return response;
  };
};

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
