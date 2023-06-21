import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export const answerSlice = createSlice({
  name: "answer",
  initialState: {
    allUserQuestion: [],
    detailUserQuestion: [],
  },
  reducers: {
    setAllUserQuestion: (state, action) => {
      state.allUserQuestion = action.payload;
    },
    setDetailUserQuestion: (state, action) => {
      state.detailUserQuestion = action.payload;
    },
  },
});

export const { setAllUserQuestion, setDetailUserQuestion } =
  answerSlice.actions;
export default answerSlice.reducer;

const addAnswer = async () => {
  try {
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response?.data?.message,
    });
  }
};
