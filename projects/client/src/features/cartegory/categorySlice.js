import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        category: {
            idcategory: "",
            name: ""
        }
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        }
    }
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;

export function getAllCategory() {
    return async (dispatch) => {
        const response = await axios.get(`${process.env.REACT_APP_API_BE}/categories`);
        dispatch(setCategories(response.data.categories))
    }
};