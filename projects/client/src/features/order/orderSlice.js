import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  transaction: [],
  selectedTransaction: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.transaction = action.payload;
    },
    resetTransaction: (state, aciton) => {
      state.transaction = [];
    },
    setSelectedTransaction: (state, action) => {
      state.selectedTransaction = action.payload;
    },
  },
});

export const addUserOrder = (orderData) => {
  return async (dispatch) => {
    console.log(orderData);
    const userId = JSON.parse(localStorage.getItem("user")).iduser;
    let response = await Axios.post(
      `${process.env.REACT_APP_API_BE}/order/setorder/${userId}`,
      orderData
    );
    return response;
  };
};

export const fetchWaitingTransaction = (keyword, page, limit) => {
  return async (dispatch) => {
    const userId = JSON.parse(localStorage.getItem("user")).iduser;
    //backend limits this fetch to 3 with offset for pagination purposes
    const response = await Axios.get(
      `${process.env.REACT_APP_API_BE}/order/waiting/${userId}?search=${
        keyword || ""
      }&page=${page || 0}&limit=${limit || 3}`
    );
    if (response.data.success) {
      dispatch(setTransaction(response.data.waitingOrder));
      return {
        success: response.data.success,
        page: response.data.page,
        totalPages: response.data.totalPages,
        totalOfRows: response.data.totalOfRows,
      };
    } else {
      dispatch(resetTransaction());
      return {
        success: response.data.success,
        page: 0,
        totalPages: 0,
        totalOfRows: 0,
      };
    }
  };
};

export const fetchReviewTransaction = (keyword, page, limit) => {
  return async (dispatch) => {
    const userId = JSON.parse(localStorage.getItem("user")).iduser;
    //backend limits this fetch to 3 with offset for pagination purposes
    const response = await Axios.get(
      `${process.env.REACT_APP_API_BE}/order/review/${userId}?search=${
        keyword || ""
      }&page=${page || 0}&limit=${limit || 3}`
    );
    if (response.data.success) {
      dispatch(setTransaction(response.data.reviewOrder));
      return {
        page: response.data.page,
        totalPages: response.data.totalPages,
        totalOfRows: response.data.totalOfRows,
      };
    } else {
      return {
        page: 0,
        totalPages: 0,
        totalOfRows: 0,
      };
    }
  };
};

export const fetchAdminWaitingTransaction = (keyword, page, limit) => {
  return async (dispatch) => {
    //backend limits this fetch to 3 with offset for pagination purposes
    const response = await Axios.get(
      `${process.env.REACT_APP_API_BE}/order/allwaiting?search=${
        keyword || ""
      }&page=${page || 0}&limit=${limit || 3}`
    );
    if (response.data.success) {
      dispatch(setTransaction(response.data.allWaitingOrder));
      return {
        success: response.data.success,
        page: response.data.page,
        totalPages: response.data.totalPages,
        totalOfRows: response.data.totalOfRows,
      };
    } else {
      dispatch(resetTransaction());
      return {
        success: response.data.success,
        page: 0,
        totalPages: 0,
        totalOfRows: 0,
      };
    }
  };
};

export const paymentProof = (file, selectedTransaction, modalHandler) => {
  return async (dispatch) => {
    let idtransaction = selectedTransaction.idtransaction;
    const response = await Axios.post(
      `${process.env.REACT_APP_API_BE}/payment/upload/${idtransaction}`,
      file
    );
    if (response.data.success) {
      const condition = Swal.fire({
        icon: "success",
        title: `${response.data.message}`,
        text: "Please wait while we review your payment ^^",
        confirmButtonText: "Ok",
      });
      if ((await condition).isConfirmed) {
        const waitingPageInfo = await dispatch(fetchWaitingTransaction());
        modalHandler();
        return waitingPageInfo;
      }
    }
  };
};

export const { setTransaction, resetTransaction, setSelectedTransaction } =
  orderSlice.actions;

export default orderSlice.reducer;
