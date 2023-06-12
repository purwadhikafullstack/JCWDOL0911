import React, { useState } from 'react'

function ProfileCard({ user, setEdit }) {
  const date = new Date(user.birthdate)
  const dateTime = date.getFullYear() + "/" +
  ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
  ("00" + date.getDate()).slice(-2) + " " 
  return (
    <div>
        
    <div class="max-w-sm rounded overflow-hidden shadow-lg group lg:w-64 ">
    <div class="flex flex-col gap-3">
        <div className='  py-2 bg-emerald-500'>    
      <h1 class="font-bold text-xl mb-2 text-white text-center">Profile Info</h1>
        </div>
      <div className=' px-4  flex flex-col gap-1'>
      <h1 
      className="text-emerald-500  font-bold text-lg">
        User Name : 
      </h1>
      <p>{user.username}</p>
      <h1 
      className="text-emerald-500  font-bold text-lg">
      Full Name : 
      </h1>
      <p>{user.fullname}</p>
      <h1 
      className="text-emerald-500  font-bold text-lg">
      Email : 
      </h1>
      <p>{user.email}</p>
      <h1 
      className="text-emerald-500  font-bold text-lg">
      Gender : 
      </h1>
            <p>
            {user.gender}
            </p>
      <h1 
      className="text-emerald-500  font-bold text-lg">
      Phone Number :
      </h1>
      <p>{user.phone_number}</p>
      <h1 
      className="text-emerald-500  font-bold text-lg">
      Birthdate :
      </h1>
      <p>
        {dateTime}
      </p>
      </div>
        <button 
              className='border-2 border-green-300  font-bold py-2 px-4 rounded-md hover:bg-emerald-500 hover:text-white text-emerald-500'
              onClick={() => setEdit(true)} >
            Edit</button>
    </div>

  </div>
    </div>
  )
}

export default ProfileCard