import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";


export const promoSlice = createSlice({
  name: "promo",
  initialState : {
    discounts: [],
    discount:{}
  },  
  reducers: {
    setDiscounts: (state, action) => {
      state.discounts = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount=action.payload
    }
  },
});
export const {setDiscounts,setDiscount} =promoSlice.actions
export default promoSlice.reducer

export function createDiscount(discount) {
  return async (dispatch) => {
    const response = await axios.post(`${process.env.REACT_APP_API_BE}/promos/new-discount`, discount)
    dispatch(fetchDiscounts())
    Swal.fire(`${response.data.message}`, "", "success");

  }
    
}
export function fetchDiscounts() {
  return async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_API_BE}/promos/discounts`)
    dispatch(setDiscounts(response.data))
    console.log(response.data);
  }
}
export function fetchDiscount(id) {
  return async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_API_BE}/promos/discount/${id}`)
    console.log(response.data);
    dispatch(setDiscount(response.data[0]))
  }  
}
export function editDiscount(id, editData) {
  return async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_API_BE}/promos/update-discount/${id}`,  editData )
    dispatch(fetchDiscount(id))
    dispatch(fetchDiscounts())
    Swal.fire(`${response.data.message}`, "", "success");
  }  
}
export function disableDiscount(id) {
  return async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_API_BE}/promos/disable-discount/${id}`)
    dispatch(fetchDiscounts())
    Swal.fire(`${response.data.message}`, "", "success");


  }
  
}
export function enableDiscount(id) {
  return async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_API_BE}/promos/enable-discount/${id}`)
    dispatch(fetchDiscounts())
    Swal.fire(`${response.data.message}`, "", "success");


  }
  
}
export function assignDiscount(idpromo,idproduct) {
  return async (dispatch) => {
    const response = await axios.put(`${process.env.REACT_APP_API_BE}/promos/assign-products/${idpromo}`,{idproduct})
    Swal.fire(`${response.data.message}`, "", "success");
  }
  
}
export function transactionDiscounts() {
  return async (dispatch) => {
    const response = await axios.get(`${process.env.REACT_APP_API_BE}/promos/transaction-discounts`)
    dispatch(setDiscounts(response.data))
    console.log(response.data);
  }
}
