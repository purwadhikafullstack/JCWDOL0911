import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const initialState = {
  province: [],
  city: [],
};

export const rajaongkirSlice = createSlice({
  name: "rajaongkir",
  initialState,
  reducers: {
    addProvince: (state, action) => {
      state.province = action.payload;
    },
    addCity: (state, action) => {
      state.city = action.payload;
    },
    resetCity: (state, action) => {
      state.city = [];
    },
  },
});

export const getProvince = () => {
  return async (dispatch) => {
    const response = await Axios.get(
      "http://localhost:8000/rajaongkir/province"
    );
    if (response.data.success) {
      dispatch(addProvince(response.data.province));
    } else {
      alert(response.data.message);
    }
  };
};

export const getCity = (provID) => {
  return async (dispatch) => {
    const response = await Axios.get(
      `http://localhost:8000/rajaongkir/city/${provID}`
    );
    if (response.data.success) {
      dispatch(addCity(response.data.city));
    }
  };
};

export const { addProvince, addCity, resetCity } = rajaongkirSlice.actions;

export default rajaongkirSlice.reducer;
