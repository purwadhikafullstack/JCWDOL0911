import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AUTH_TOKEN } from "../../helpers/constant";
import { useDispatch, useSelector } from "react-redux";
import { setDetailUserQuestion } from "../../features/admin/answerSlice";
import Sidebar from "../../components/admin/Sidebar";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Tooltip,
  Center,
  Divider,
} from "@chakra-ui/react";

function DetailUserQuestion() {
  const params = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem(AUTH_TOKEN);
  const detailQuestion = useSelector(
    (state) => state.answers.detailUserQuestion
  );
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formAnswer, setFormAnswer] = useState({ answer: "" });
  const [onOpenAnswerModal, setOnOpenAnswerModal] = useState(false);

  const fetchDetailUserQuestion = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_BE}/admin/qna/${params.idquestion}`,
        { headers: { authorization: `Bearer ${token}` } }
      );

      dispatch(setDetailUserQuestion(response.data[0]));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

  const handleAnswerForm = async (event) => {
    const key = event.target.name;
    setFormAnswer({ ...formAnswer, [key]: event.target.value });
  };

  const handleSubmitAnswer = async (event) => {
    try {
      setIsLoading(true);
      event.preventDefault();
      let response = await axios.post(
        `${process.env.REACT_APP_API_BE}/admin/qna/answer/${params.idquestion}`,
        formAnswer,
        { headers: { authorization: `Bearer ${token}` } }
      );
      setIsLoading(false);
      setOnOpenAnswerModal(false);
      navigate("/admin/answer-question");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data?.message,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!!",
      });
      setIsLoading(false);
      setOnOpenAnswerModal(false);
      navigate("/admin/answer-question");
    }
  };

  const getDate = (dateTime) => {
    if (dateTime && dateTime.length > 10) {
      return dateTime.slice(0, 10);
    }
    return dateTime;
  };

  useEffect(() => {
    fetchDetailUserQuestion();
  }, []);

  return (
    <>
      <div className="w-screen h-full flex justify-between bg-slate-50">
        <div className="w-80">
          <Sidebar />
        </div>
        <div
          className="h-screen bg-dashboard-admin p-28  flex flex-col gap-6"
          style={{ width: "calc(100vw - 320px)" }}
        >
          <p className="text-3xl font-bold">Detail Question</p>
          <div className="flex items-center gap-6 pt-12">
            <div className="w-1/4">
              <p>Title </p>
            </div>
            <div className="w-3/4">
              <p className="text-black text-3xl font-bold py-1 px-4">
                {detailQuestion.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-1/4">
              <p>Question </p>
            </div>
            <div className="w-3/4">
              <p className="text-black text-xl py-1 px-4">
                {detailQuestion.question}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-1/4">
              <p>Question Date</p>
            </div>
            <div className="w-3/4">
              <p className="text-black text-md py-1 px-4">
                {getDate(detailQuestion.date)}
              </p>
            </div>
          </div>
          <Divider orientation="horizontal" />
          {detailQuestion.is_answer === 0 ? (
            <>
              <p>Answer</p>
              <div className="w-full flex flex-col">
                <form onSubmit={handleSubmitAnswer}>
                  <textarea
                    rows={10}
                    id="answer"
                    name="answer"
                    type="text"
                    placeholder="Input your answer here"
                    value={formAnswer.answer}
                    onChange={handleAnswerForm}
                    className="bg-white w-full text-black p-4 rounded-md shadow-card-tagline"
                  ></textarea>

                  <div className="text-right">
                    <Button
                      className="button-primary w-11 mt-6"
                      variant="solid"
                      type="submit"
                      isLoading={isLoading}
                    >
                      Submit Answer
                    </Button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="w-1/4">
                  <p>Answer</p>
                </div>
                <div className="w-3/4">
                  <p className="text-black text-md py-1 px-4">
                    {detailQuestion.answer}
                  </p>
                </div>
              </div>
              <div className="w-full text-right">
                <Tooltip label="You already answer this question">
                  <Button
                    colorScheme="gray"
                    variant="solid"
                    className="cursor-not-allowed"
                  >
                    Answered
                  </Button>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailUserQuestion;
