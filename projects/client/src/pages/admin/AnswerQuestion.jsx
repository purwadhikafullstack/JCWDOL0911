import React, { useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { setAllUserQuestion } from "../../features/admin/answerSlice";
import { AUTH_TOKEN } from "../../helpers/constant";
import { useNavigate } from "react-router-dom";

function AnswerQuestion() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.answers.allUserQuestion);
  const token = localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();

  const fetchAllUserQuestion = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_BE}/admin/qna/questions`,
        { headers: { authorization: `Bearer ${token}` } }
      );
      dispatch(setAllUserQuestion(response.data));
    } catch (error) {
      console.log(error);
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

  const handleDeleteQuestion = async (idquestion) => {
    try {
      let response = await axios.delete(
        `${process.env.REACT_APP_API_BE}/admin/qna/${idquestion}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/admin/answer-question");
      fetchAllUserQuestion();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

  const handlePageDetailUserQuestion = async (idquestion) => {
    try {
      navigate(`/admin/answer-question/${idquestion}`);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
      });
    }
  };

  useEffect(() => {
    fetchAllUserQuestion();
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
          <p className="text-3xl font-bold">answer question</p>

          <div className="">
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Title</Th>
                    <Th>question</Th>
                    <Th>date</Th>
                    <Th>description</Th>
                    <Th>action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {questions.map((question, index) => (
                    <Tr
                      key={question.idquestion}
                      onClick={() =>
                        handlePageDetailUserQuestion(question.idquestion)
                      }
                    >
                      <Td>{index + 1}</Td>
                      <Td>{question.title}</Td>
                      <Td>{question.question}</Td>
                      <Td>{getDate(question.date)}</Td>
                      <Td>
                        {question.is_answer ? (
                          <Tooltip label="You already answer this question">
                            <Button
                              colorScheme="gray"
                              variant="solid"
                              className="cursor-not-allowed"
                            >
                              Answered
                            </Button>
                          </Tooltip>
                        ) : (
                          <Button className="button-primary" variant="solid">
                            Answer
                          </Button>
                        )}
                      </Td>
                      <Td>
                        <Tooltip label="delete">
                          <Button
                            colorScheme="red"
                            variant="ghost"
                            onClick={() =>
                              handleDeleteQuestion(question.idquestion)
                            }
                          >
                            <svg
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.5"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="w-7"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              ></path>
                            </svg>
                          </Button>
                        </Tooltip>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnswerQuestion;
