import React, { useState } from 'react'
import QuestionModal from '../components/qna/QuestionModal'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllQuestions, fetchMyQuestion, loadMoreQuestion } from '../features/qna/questionSlice'
import MyQuestionModal from '../components/qna/MyQuestionModal'
import { useSelector } from 'react-redux'
import QuestionsCard from '../components/qna/QuestionsCard'
import { useRef } from 'react'


function Forum() {
  const dispatch = useDispatch()
  const allQuestions = useSelector(state => state.questions.allQuestion)
  const [offset, setOffset] = useState(0)
  const [search, setSearch] = useState('')
  const [sort,setSort]=useState('DESC')
  const shouldLog = useRef(true)

  
  const renderQuestions = () => {
    return allQuestions.map((question) => {
      return <QuestionsCard question = {question}/>
    })
  }
  const searchHandler = (e) => {
    shouldLog.current=true
    setOffset(0)
    setSearch(e.target.value)
  }
  
  const handlePagination = (offset) => {
    let count = offset + 6
    setOffset(count)
    dispatch(loadMoreQuestion(count,search,sort))

  }
  const handleSortChange = (e) => {
      shouldLog.current=true
      const selectedSort = e.target.value;
      setOffset(0);
      const updatedSort = selectedSort;
      setSort(updatedSort);
    };
  useEffect(() => {
    if (shouldLog.current) {
        shouldLog.current=false
        dispatch(fetchAllQuestions(offset,search,sort))
      }
    
  },[offset,search,sort])
  return (
    <div className=' flex flex-col my-16 justify-center items-center '>
    
<section className="bg-center bg-no-repeat  bg-gray-700 bg-blend-multiply w-full" style={{ backgroundImage: `url('/doctor.jpg')` }}>
    <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-blue-300 md:text-5xl lg:text-6xl">Got Something Troubling You</h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here Our Team Are Glady to Help You Solve The Problem</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <QuestionModal/>
        <MyQuestionModal/>
        </div>
    </div>
      </section>
      <div className=' flex flex-col gap-5'>

      <div className=' bg-blue-300 w-screen text-center  py-2 flex flex-col shadow-2xl'>
        
        <h1 className=' text-2xl font-extrabold text-white lg:text-5xl'>DISCUSSION</h1>
        </div>
        <div className=' flex  items-center justify-center gap-3 '>
          <div>

        <input type="text"
        placeholder='Search Question' 
        className='max-w-sm rounded-lg  border-2 border-blue-300 '
        onChange={(e)=>searchHandler(e)}/>
          </div>
          <select name="sort" id="sort" className=' border-blue-300 rounded-md border-2'
          onChange={(e)=>handleSortChange(e)}>
            <option value="DESC">Descending Date</option>
            <option value="ASC">Ascending Date</option>
           </select>

        </div>
        <div className='grid grid-rows-3 gap-3 lg:grid-cols-3 '>
        {renderQuestions()}
        </div>
        <button onClick={()=>handlePagination(offset)}>See More</button>
      </div>
    </div>
  )
}

export default Forum