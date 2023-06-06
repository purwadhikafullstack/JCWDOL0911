import axios from 'axios'
import React from 'react'
import { useState } from 'react'

function QuestionModal() {
const [open, setOpen] = useState(false)
const [question,setQuestion]= useState('')

const inputQuestion =(e)=>{
    setQuestion(e.target.value)
}
    const saveHandler = async (question) => {
        let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/qna/questions/add-question/1`, { question })
        alert(response.data.message)
        setOpen(false)
}


    
  return (
      <div>
          {!open ? <button onClick={() => setOpen(true)}
              className='border-2 border-blue-400  font-bold py-2 px-4 rounded-md hover:bg-blue-700'>ASK QUESTION</button>
              : <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
                  <div className=' bg-white p-2 rounded gap-2 flex flex-col shadow-lg w-80 items-center'>
                      <h1 className=' text-center text-2xl'>Ask Your Question</h1>
                      <div>
                         <textarea onChange={(e)=>inputQuestion(e)}
                          className=' h-44 w-72 border-2 border-blue-400 rounded-lg'></textarea>
                      </div>
                      <div className='flex justify-center gap-3'>
                          <button onClick={()=>saveHandler(question)}>Save</button>
                          <button onClick={() => setOpen(false)}>Cancel</button>
                      </div>
                  </div>
              </div>}
          </div>
  )
}

export default QuestionModal