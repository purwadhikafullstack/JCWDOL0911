import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/users/userSlice'
import questionReducer from '../features/qna/questionSlice'
export default configureStore({
    reducer: {
        user: userReducer,
        questions:questionReducer

    }
})