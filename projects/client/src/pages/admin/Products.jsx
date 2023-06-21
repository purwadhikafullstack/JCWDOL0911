import React from 'react'
import CardProduct from '../../components/CardProduct';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { fetchProduct, fetchProducts } from '../../features/cart/productsSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ProductsCard from '../../components/admin/products/ProductsCard';

function Products() {
    const products = useSelector(state=>state.product.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
        },[])
  return (
    <div className="flex items-center justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {products.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </div>
     </div>
  )
}

export default Products