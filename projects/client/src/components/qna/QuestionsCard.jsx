import React from 'react'

function QuestionsCard({ question }) {
    const date = new Date(question.date)
    const dateTime = date.getFullYear() + "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
    ("00" + date.getDate()).slice(-2) + " " +
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);
    return (
<div className='flex items-center justify-center '>            
<div class=" max-w-sm max-h-max lg:max-w-md lg: h-96 lg:w-full  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className='flex gap-3'>
    <img class="w-10 h-10 rounded" 
    src={`${process.env.REACT_APP_API_BE}/users/${question.profile_image}`}
    alt="Default avatar"/>
    <div>   
    <p className=' text-xs'>{dateTime}</p>
    <p>by:{question.username}</p>
    </div>

    </div>
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ question.title}</h5>

                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden overflow-ellipsis ">{ question.question}</p>
        <button className=' border-2 border-blue-300 py-2 px-5 rounded-xl hover:bg-blue-300 hover:text-white'> See Answer </button>
</div>

</div>
  )
}

export default QuestionsCard