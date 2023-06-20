import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import Swal from "sweetalert2";

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
        const response = await Axios.get(`http://localhost:8000/products`);
        dispatch(setProducts(response.data))
    }
}
export function updateStock(id, stock, setEdit, updatedStock) {
    if (updatedStock == '0') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `You didn't update anything`,
          });
        setEdit(false)
     }else{

         return async (dispatch) => {
             let response = await Axios.put(`http://localhost:8000/products/stock/${id}?`,{stock,updatedStock})
             Swal.fire(`${response.data.message}`, "", "success");
             dispatch(fetchProducts())
             setEdit(false)
            }
    }
}
