import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../features/users/userSlice'
import { useSelector } from 'react-redux'
import UploadModal from '../components/profiling/UploadModal'
import ProfileCard from '../components/profiling/ProfileCard'
import AddressCard from '../components/profiling/AddressCard'
import EditProfile from '../components/profiling/EditProfile'
import { useState } from 'react'

function Profile() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const[edit,setEdit]=useState(false)
  useEffect(() => {
    dispatch(fetchUser())
  },[])
  return (
    <div className=' my-14 px-9 flex flex-col justify-center items-center'>
      <h1 className=' font-extrabold text-emerald-500 text-4xl'>MY PROFILE</h1>
      <div className=' my-14 flex flex-col gap-3 lg:flex lg:flex-row '>

          <div className='relative max-w-lg lg:h-40 group'>
            <img
            src={`${process.env.REACT_APP_API_BE}/users/${user.profile_image}`}
            className='rounded-lg shadow-xl group-hover:opacity-50 max-w-sm lg: max-h-64'
            alt="Avatar"
            />
         
        <UploadModal/>
        </div>

        <div>
          {edit ?           <EditProfile user={user} setEdit={setEdit}/>
:
                    <ProfileCard user={user} setEdit={setEdit} />
                  }
      </div>
      <div>
        <AddressCard/>
      </div>
            </div>
    </div>
  )
}

export default Profile