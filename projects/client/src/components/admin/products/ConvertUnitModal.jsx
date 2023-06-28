import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createConversionRules, setConversionRules } from '../../../features/cart/productsSlice'
import Swal from 'sweetalert2'

function ConvertUnitModal() {
 const dispatch=useDispatch()
 const [unit,setUnit]=useState('')
 const [quantity,setQuantity]=useState(0)
 const [unitDefault, setUnitDefault] = useState('')
 const [open,setOpen]=useState(false)
   
    const saveProductRules = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to Create New Rules",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, create it!'
        })
        if (result.isConfirmed) {
            dispatch(createConversionRules(unit,quantity,unitDefault,setOpen)) 
        }
    }
    return (
        <div>
             {!open?          <button 
        className=' border-2 border-green-300  font-bold h-10 px-2 rounded-md hover:bg-emerald-500 hover:text-white text-emerald-500'
        onClick={()=>setOpen(true)}>
      Create Conversion Rules</button>
                : 
                        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center '>
                    <div className=' bg-white py-3 lg:px-14 px-2 rounded-xl gap-2 flex flex-col shadow-lg w-96  lg:w-[40rem]'>
                        <h1>Conversion Rule</h1>
                        <div className='flex gap-2'>
                            <p>1</p>
                            <input type="text" className='border-b-2' placeholder='unit' onChange={(e)=>setUnitDefault(e.target.value)} />
                            <p>=</p>
                            <input type="text" className='border-b-2' placeholder='quantity' onChange={(e)=>setQuantity(e.target.value)} />
                            <input type="text" className='border-b-2' placeholder='unit' onChange={(e)=>setUnit(e.target.value)} />
                        </div>
                        <button onClick={()=>saveProductRules()}>save</button>
                    </div>
</div>}
</div>
  )
}

export default ConvertUnitModal