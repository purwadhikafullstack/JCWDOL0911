import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        product: {
            idproduct: "",
            idunit: "",
            idcategory: "",
            idpromo: "",
            name: "",
            price: "",
            description: "",
            stock: "",
            product_image: "",
        }
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    }
});

export const { setProduct, setProducts } = productsSlice.actions;
export default productsSlice.reducer;

export function fetchProducts() {
    return async (dispatch) => {
        const response = await Axios.get(process.env.development.REACT_APP_API_BE + "/products");
        dispatch(setProducts(response.data.products))
        return response.data
    }
}