import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addMyQuestion } from '../../features/qna/questionSlice'

function QuestionModal() {
const dispatch= useDispatch()
const [open, setOpen] = useState(false)
const [question,setQuestion]= useState('')
const [title,setTitle]= useState('')

const inputTitle =(e)=>{
    setTitle(e.target.value)
}
const inputQuestion =(e)=>{
    setQuestion(e.target.value)
}
    const saveHandler = async (question,title,setOpen) => {
        const userId = JSON.parse(localStorage.getItem('user')).id
        dispatch(addMyQuestion(userId,question,title,setOpen))
        
}
const isFormValid = title.trim() !== '' && question.trim() !== '';


    
  return (
      <div>
          {!open ? <button onClick={() => setOpen(true)}
              className='border-2 border-blue-300  font-bold py-2 px-4 rounded-md hover:bg-blue-300 text-white'>ASK QUESTION</button>
              : <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
                  <div className=' bg-white p-2 rounded gap-2 flex flex-col shadow-lg w-80 items-center'>
                      <h1 className=' text-center text-2xl'>Ask Your Question</h1>
                      <div>
                      <div className="relative mb-3" data-te-input-wrapper-init>
                        <p>Title</p>
                        <input
                            type="text"
                            class="peer block min-h-[auto] w-full rounded border-2 border-blue-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput1"
                            placeholder="title" 
                            onChange={(e)=>inputTitle(e)}
                            required/>
                        </div>
                         <textarea onChange={(e)=>inputQuestion(e)}
                          className=' h-44 w-72 border-2 border-blue-400 rounded-lg'
                          required></textarea>
                      </div>
                      <div className='flex justify-center gap-3'>
                          <button onClick={() => saveHandler(question, title,setOpen)}  disabled={!isFormValid}>Save</button>
                          <button onClick={() => setOpen(false)}>Cancel</button>
                      </div>
                  </div>
              </div>}
          </div>
  )
}

export default QuestionModal