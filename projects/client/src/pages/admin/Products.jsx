import React from 'react'
import CardProduct from '../../components/CardProduct';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { fetchProduct, fetchProducts } from '../../features/cart/productsSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ProductsCard from '../../components/admin/products/ProductsCard';
import Sidebar from '../../components/admin/Sidebar';
import { useNavigate } from 'react-router-dom';

function Products() {
    const products = useSelector(state=>state.product.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchProducts())
        },[])
  return (
    <div className="w-screen h-full flex justify-between bg-slate-50">
    <div className="w-80">
      <Sidebar />
    </div>
      <div className=" h-screen bg-dashboard-admin p-11 "
        style={{ width: "calc(100vw - 320px)" }}> 
        <div className='flex flex-col gap-2 lg:gap-6'>
          <h1 className='text-3xl font-bold lg:text-5xl'>Product's</h1>
          <button 
            className=' border-2 border-green-300  font-bold h-10 px-2 rounded-md hover:bg-emerald-500 hover:text-white text-emerald-500'
          onClick={()=> navigate('/admin/products/unit-conversion')}>
          Unit's Conversion</button>

    <div className="flex items-center justify-center  ">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {products.map((product) => (
        <ProductsCard key={product.id} product={product} />
        ))}
    </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Products