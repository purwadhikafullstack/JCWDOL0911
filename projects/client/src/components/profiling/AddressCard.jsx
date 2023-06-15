import React, { useEffect, useState }  from 'react'
import AddressModal from './AddressModal'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchAddresses, fetchPrimaryAddress } from '../../features/users/addressSlice'
import { getCity } from '../../features/rajaongkir/rajaongkirSlice'
import ManageAddressModal from './ManageAddressModal'
import MyAddressCard from './MyAddressCard'

function AddressCard() {
  const dispatch = useDispatch()
  const primaryAddress = useSelector(state=>state.address.primaryAddress[0])

  
  useEffect(() => {
    dispatch(fetchPrimaryAddress())
  },[])
  return (
    <div>
        
        <div class="max-w-sm rounded overflow-hidden shadow-lg group lg:w-[40rem] ">
    <div class=" flex flex-col gap-3">
        <div className=' py-2 bg-emerald-500'>
            
      <h1 class="font-bold text-xl mb-2 text-white text-center  ">Address</h1>
          </div>{primaryAddress ?<div className=' px-4'>
            <MyAddressCard address={primaryAddress}/> 
            </div>
            : <></>}
         
          <div className='flex items-center justify-center py-2 gap-3'>
            <ManageAddressModal/>
            <AddressModal/>
        </div>
     
    </div>

  </div>
    </div>
  )
}

export default AddressCard