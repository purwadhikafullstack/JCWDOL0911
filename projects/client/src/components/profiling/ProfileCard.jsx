import React from 'react'

function ProfileCard({user}) {
  return (
    <div>
        
    <div class="max-w-sm rounded overflow-hidden shadow-lg group ">
    <div class="flex flex-col gap-3">
        <div className='  py-2 bg-blue-400'>    
      <h1 class="font-bold text-xl mb-2 text-white text-center">Profile Info</h1>
        </div>
      <div className=' px-4  flex flex-col gap-1'>
      <p class="text-gray-700 text-base">
        Username : {user.username}
      </p>
      <p class="text-gray-700 text-base">
        Full Name : {user.fullname}
      </p>
      <p class="text-gray-700 text-base">
        Email : {user.email}
      </p>
      <p class="text-gray-700 text-base">
        Gender : {user.gender}
      </p>
      <p class="text-gray-700 text-base">
        Phone Number:{user.phone_number}
      </p>
      </div>
      <div className='  invisible group-hover:visible'>
        <button className=' bg-blue-400 text-white text-center py-2 w-full' > Edit</button>
      </div>
    </div>

  </div>
    </div>
  )
}

export default ProfileCard