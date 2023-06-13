import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadPicture } from '../../features/users/userSlice'
import Swal from 'sweetalert2'

function UploadModal() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState(null)
    const onFileChange = (e) => {
        setFile(e.target.files[0])
        let preview = document.getElementById('image-preview')
      preview.src = URL.createObjectURL(e.target.files[0])
      console.log(file);
      
    }
  const saveHandler = async (image) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to change your profile picture",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    })
    if (result.isConfirmed) { 

      dispatch(uploadPicture(image,setOpen))
    }
    }
  return (
    <div>
          
        {!open? <button onClick={()=>setOpen(!open)}
            className='absolute inset-x-0 bottom-0 invisible group-hover:visible  hover:bg-blue-400 text-white font-bold py-2 px-4 rounded flex items-center justify-center'
          >
            Upload Picture
          </button> :
              <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
                  <div className=' bg-white p-2 rounded gap-2 flex flex-col'>
                      <h1 className=' text-center text-2xl'>Upload Your Picture</h1>
                      <div>
                          <img id='image-preview'
                          className=' max-w-sm'/>  
                      <input type="file"
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        onChange={(e) => {
                            onFileChange(e)
                        }} />
                      <p>*max size 1mb ext .png, .jpg, .jpeg, .gif</p>
                      </div>
                      <div className='flex justify-center gap-3'>  
                      <button onClick={() => saveHandler(file,setOpen)}>Save</button>
                      <button onClick={()=>setOpen(false)}>Cancel</button>
                      </div>
              </div>
              </div>}
         


    </div>

  )
}

export default UploadModal