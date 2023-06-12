import React, { useEffect } from 'react'
import { useState } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { editProfile } from '../../features/users/userSlice';
import Swal from 'sweetalert2'

  


function EditProfile({ user, setEdit }) {
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date(user.birthdate));
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [emailError, setEmailError] = useState('')

    
    const saveEdit = async (username, fullname, email, gender, birthdate) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to change your profile",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, changen it!'
        })
        if (result.isConfirmed) {
            dispatch(editProfile(username, fullname, email, gender, birthdate))
            setEdit(false)
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      }
    
      const handleEmailBlur = () => {
        if (!email.includes('@')) {
          setEmailError('Invalid email format');
        } else {
          setEmailError('');
        }
      }
  return (
    <div>
        
    <div class="max-w-sm rounded overflow-hidden shadow-lg group lg:w-64 ">
    <div class="flex flex-col gap-3">
        <div className='  py-2 bg-emerald-500'>    
      <h1 class="font-bold text-xl mb-2 text-white text-center">Profile Info</h1>
        </div>
      <div className=' px-4  flex flex-col gap-1'>
    <label htmlFor="username">User Name :</label>
      <input type="text" name="username" id="username"
        className=' bg-gray-50 border-green-300 rounded-md border-2 h-10'
        placeholder={user.username}
        onChange={(e)=>setUsername(e.target.value)}/>
      <label htmlFor="fullname">Full Name :</label>
      <input type="text" name="fullname" id="fullname" 
        className=' bg-gray-50 border-green-300 rounded-md border-2 h-10'
        placeholder={user.fullname}
        onChange={(e)=>setFullname(e.target.value)}/>
    <label htmlFor="email">E-Mail :</label>
            <input
              type="email"
              name="email"
              id="email"
              className=' bg-gray-50 border-green-300 rounded-md border-2 h-10'
              placeholder={user.email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}

            />
            {emailError && <p className="text-red-500">{emailError}</p>}
                <label htmlFor="gender">Gender:</label>
      <select name="gender" id="gender"
    className=' bg-gray-50 border-green-300 rounded-md border-2 h-10'>
        <option value="">{user.gender}</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <label htmlFor="birthdate">Birth Date :</label>
      <DatePicker
      className=' bg-gray-50 border-green-300 rounded-md border-2 h-10'
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
       
        </div>
        <div className='flex gap-3 items-center justify-center py-3'>
        <button 
        className='border-2 border-green-300  font-bold py-2 px-4 rounded-md hover:bg-emerald-500 hover:text-white text-emerald-500'
        onClick={()=>saveEdit(username,fullname,email,gender,startDate)} > Save </button>
        <button
        className='border-2 border-green-300  font-bold py-2 px-4 rounded-md hover:bg-emerald-500 hover:text-white text-emerald-500'
        onClick={()=>setEdit(false)}>
            
        Cancel
        </button>
    </div>  
        </div>
  </div>
    </div>

  )
}

export default EditProfile