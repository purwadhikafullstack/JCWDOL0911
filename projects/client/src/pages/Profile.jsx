import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../features/users/userSlice'
import { useSelector } from 'react-redux'
import UploadModal from '../components/profiling/UploadModal'
import ProfileCard from '../components/profiling/ProfileCard'
import AddressCard from '../components/profiling/AddressCard'

function Profile() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  console.log(user);
  useEffect(() => {
    dispatch(fetchUser())
  },[])
  return (
    <div className=' my-14 px-9  gap-3 lg:flex lg:flex-row '>
          
          <div className='relative max-w-lg lg:h-40 group'>
            <img
            src={`${process.env.REACT_APP_API_BASE_URL}/users/${user.profile_image}`}
            className='rounded-lg shadow-xl group-hover:opacity-50'
            alt="Avatar"
          />
         
        <UploadModal/>
        </div>

          <div>
        <ProfileCard user={user} />
      </div>
      <div>
        <AddressCard/>
      </div>
    </div>
  )
}

export default Profile