import React from 'react'

function AddressCard() {
  return (
    <div>
        
        <div class="max-w-sm rounded overflow-hidden shadow-lg group lg:w-64 ">
    <div class=" flex flex-col gap-3">
        <div className=' py-2 bg-emerald-500'>
            
      <h1 class="font-bold text-xl mb-2 text-white text-center  ">Address</h1>
        </div>
          <div className='flex items-center justify-center py-2'>
            <button
            className='border-2 border-green-300  font-bold py-2 px-4 rounded-md hover:bg-emerald-500 hover:text-white text-emerald-500'
            >Add Address</button>
        </div>
     
    </div>

  </div>
    </div>
  )
}

export default AddressCard