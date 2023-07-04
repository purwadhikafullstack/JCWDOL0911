import axios from "axios";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AUTH_TOKEN } from "../helpers/constant";
import { useDispatch, useSelector } from "react-redux";
import { setDetailQna } from "../features/qna/questionSlice";
import { Avatar } from "@chakra-ui/react";

function DetailQnaUser() {
  const params = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem(AUTH_TOKEN);
  const questions = useSelector((state) => state.questions.detailQna);
  const profilePicUser = questions.profile_image
    ? `${process.env.REACT_APP_API_PIC}/users/${questions.profile_image}`
    : "/default.jpg";

  const fetchDetailQuestion = async () => {
    try {
      console.log("params", params);
      let response = await axios.get(
        `${process.env.REACT_APP_API_BE}/qna/questions/${params.idquestion}`,
        { headers: { authorization: `Bearer ${token}` } }
      );

      dispatch(setDetailQna(response.data[0]));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

  const getDate = (dateTime) => {
    if (dateTime && dateTime.length > 10) {
      return dateTime.slice(0, 10);
    }
    return dateTime;
  };

  const getTime = (dateTime) => {
    if (dateTime && dateTime.length > 10) {
      return dateTime.slice(11, 19);
    }
    return dateTime;
  };

  useEffect(() => {
    fetchDetailQuestion();
  }, []);

  return (
    <div className="w-3/5 h-full mx-auto mt-11">
      <div className="">
        <Link to="/forum">
          <div className="flex gap-2 items-center text-color-green">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              ></path>
            </svg>
            <p className="font-bold text-lg">Back to Forum</p>
          </div>
        </Link>
        <p className="text-3xl font-bold mt-11 mb-6">{questions.title}</p>
        <div className="flex justify-between my-6">
          <div className="flex gap-6">
            <Avatar src={profilePicUser} alt="" />
            <p className="font-bold text-xl">{questions.username}</p>
          </div>
          <div className="flex flex-col text-right gap-1 text-slate-500">
            <p>{getDate(questions.date)}</p>
            <p>{getTime(questions.date)}</p>
          </div>
        </div>
        <p>{questions.question}</p>
        <div className="border-2 my-6 p-6 rounded-md">
          <p className="font-bold text-slate-400 mb-6 mt-2">dijawab oleh:</p>
          <div className="flex justify-between my-6">
            <div className="flex gap-6">
              <Avatar src={questions.admin_image} alt="" />
              <p className="font-bold text-xl">{questions.admin_name}</p>
            </div>
            <div className="flex flex-col text-right gap-1 text-slate-500">
              <p>{getDate(questions.answer_date)}</p>
              <p>{getTime(questions.answer_date)}</p>
            </div>
          </div>
          <div>
            <p>{questions.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailQnaUser;
