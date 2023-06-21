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
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Tooltip,
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
          className="h-screen bg-dashboard-admin p-11 flex flex-col gap-11"
          style={{ width: "calc(100vw - 320px)" }}
        >
          <p>title: {detailQuestion.title}</p>
          <p>question: {detailQuestion.question}</p>
          {detailQuestion.is_answer === 0 ? (
            <Button
              className="button-primary"
              variant="solid"
              onClick={() => setOnOpenAnswerModal(true)}
            >
              Answer
            </Button>
          ) : (
            <Tooltip label="You already answer this question">
              <Button
                colorScheme="gray"
                variant="solid"
                className="cursor-not-allowed"
              >
                Answered
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
      <Modal
        isOpen={onOpenAnswerModal}
        onClose={() => setOnOpenAnswerModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmitAnswer}>
            {/* <ModalHeader>Reset password</ModalHeader> */}
            <ModalCloseButton />
            <ModalBody>
              <div className="">
                <label htmlFor="email" className="sr-only" />
                <p className="text-slate-400">
                  Please input your answer below:
                </p>
                <div>
                  <Input
                    id="answer"
                    name="answer"
                    type="text"
                    placeholder="Answer"
                    className="shadow-sm mt-4"
                    value={formAnswer.answer}
                    onChange={handleAnswerForm}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="button-primary"
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
              >
                Submit Answer
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DetailUserQuestion;
