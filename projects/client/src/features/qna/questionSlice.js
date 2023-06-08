import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from 'sweetalert2'


export const questionSlice = createSlice({
    name: 'questions',
    initialState: {
        myQuestion: [],
        allQuestion :[],
    },
    reducers: {
        setMyQuestion: (state, action) => {
            state.myQuestion = action.payload
        },
        removeMyQuestion: (state, action) => {
            const deleteQuestion = action.payload
            state.myQuestion=state.myQuestion.filter((question)=>question.idquestion != deleteQuestion)
        },
        setAllQuestion: (state, action) => {
            state.allQuestion = action.payload
        },
        setMore: (state, action) => {
            state.allQuestion.push(...action.payload)
        }
    }
})

export const {setMyQuestion,removeMyQuestion,setAllQuestion,setMore} = questionSlice.actions
export default questionSlice.reducer

export function fetchMyQuestion(offset, search, sort) {
    const userId = JSON.parse(localStorage.getItem('user')).id
    return async (dispatch) => {
    let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/qna/questions/my-question/${userId}?offset=${offset}&search=${search}&sort=${sort}`)
    dispatch(setMyQuestion(response.data))
}
}

export function deleteMyQuestion(id) {
    return async (dispatch) => {
        let response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/qna/questions/remove-question/${id}`)
        dispatch(removeMyQuestion(id))
        dispatch(fetchMyQuestion)
         Swal.fire(
            `${response.data.message}`,
            '',
            'success'
          )
              }
}

export function addMyQuestion(userId,question,title,setOpen) {
    return async (dispatch) => {
        let response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/qna/questions/add-question/${userId}`, { question,title })
        Swal.fire(
            `${response.data.message}`,
            '',
            'success'
          )
        setOpen(false)
        dispatch(fetchMyQuestion())
    }
}

export function fetchAllQuestions(offset, search, sort) {
    return async (dispatch) => {
        let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/qna/questions/all-questions?offset=${offset}&search=${search}&sort=${sort}`)
        dispatch(setAllQuestion(response.data))
    }
}
export function loadMoreQuestion(offset, search,sort) {
    return async (dispatch) => {
        let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/qna/questions/all-questions?offset=${offset}&search=${search}&sort=${sort}`)
        dispatch(setMore(response.data))

    }
}