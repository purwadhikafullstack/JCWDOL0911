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
    categories: [],
    convertedUnit:[],
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setConvertedUnit: (state, action) => {
      state.convertedUnit = action.payload
    }
  },
});

export const { setProduct, setProducts, setCategories,setConvertedUnit } = productsSlice.actions;
export default productsSlice.reducer;

export function fetchProducts(order, filter) {
  return async (dispatch) => {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_BE}/products?order=${order}&filter=${filter}`
    );
    dispatch(setCategories(response.data.categoryQuery));
    dispatch(setProducts(response.data.productQuery));
  };
}
export function updateStock(id, stock, setEdit, updatedStock, unit) {
  if (updatedStock == "0") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `You didn't update anything`,
    });
    setEdit(false);
  } else {
    return async (dispatch) => {
      let response = await Axios.put(
        `${process.env.REACT_APP_API_BE}/products/stock/${id}`,
        { stock, updatedStock, unit }
      );
      Swal.fire(`${response.data.message}`, "", "success");
      dispatch(fetchProducts());
      setEdit(false);
    };
  }
}



export function createConversionRules( unit, quantity,unitDefault,setOpen) {
  return async(dispatch) => {
    const response = await Axios.post(`${process.env.REACT_APP_API_BE}/products/unit-conversions`, { unit, quantity,unitDefault })
    Swal.fire(`${response.data.message}`, "", "success");
    setOpen(false)
  }
  
}
export function setConversionRules(idProduct, idUnit,order,filter) {
  return async (dispatch) => {
    let response = await Axios.post(`${process.env.REACT_APP_API_BE}/products/assign-rule/${idProduct}`, { idUnit })
    dispatch(fetchProducts(order,filter))
    Swal.fire(`${response.data.message}`, "", "success");

  }
  
}

export function fetchUnitConversionRules() {
  return async (dispatch) => {
    let response = await Axios.get(`${process.env.REACT_APP_API_BE}/products/rules`)
    dispatch(setConvertedUnit(response.data))
    
  }
  
}

export function changeDefaultUnit(idProduct, unit_product, stock, order, filter) {
  return async (dispatch) => {
    let response = await Axios.put(`${process.env.REACT_APP_API_BE}/products/change-unit/${idProduct}`, { unit_product, stock })
    dispatch(fetchProducts(order,filter))
    Swal.fire(`${response.data.message}`, "", "success");

  }
}

export function removeRuleProduct(idProduct,order,filter) {
  return async (dispatch) => {
    let response = await Axios.delete(`${process.env.REACT_APP_API_BE}/products/remove-rule/${idProduct}`)
    dispatch(fetchProducts(order,filter))
    Swal.fire(`${response.data.message}`, "", "success");

  }
} 