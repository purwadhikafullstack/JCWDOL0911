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
        },
        categories:[]
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        }
    }
});

export const { setProduct, setProducts,setCategories } = productsSlice.actions;
export default productsSlice.reducer;

export function fetchProducts() {
    return async (dispatch) => {
        const response = await Axios.get(`http://localhost:8000/products`);
        dispatch(setCategories(response.data.categoryQuery))
        dispatch(setProducts(response.data.productQuery))
    }
}
export function updateStock(id, stock, setEdit, updatedStock,unit) {
    if (updatedStock == '0') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `You didn't update anything`,
          });
        setEdit(false)
     }else{

         return async (dispatch) => {
             let response = await Axios.put(`${process.env.REACT_APP_API_BE}/products/stock/${id}`,{stock,updatedStock,unit})
             Swal.fire(`${response.data.message}`, "", "success");
             dispatch(fetchProducts())
             setEdit(false)
            }
    }
}
