import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import InputComponent from "../components/Input";
import { AUTH_TOKEN, USER } from "../helpers/constant";
import { useDispatch } from "react-redux";
import { setUser } from "../features/users/userSlice";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Password too short"),
  });

  const loginUser = async (value, actions) => {
    try {
      setIsLoading(true);
      let response = await axios.post(
        `${process.env.REACT_APP_API_BE}/auth/login`,
        value
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
      });

      setIsLoading(false);
      if (response.data?.token) {
        localStorage.setItem(AUTH_TOKEN, response.data?.token);
        localStorage.setItem(USER, JSON.stringify(response.data.data));
        dispatch(setUser(response.data?.data));
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data?.message || "Something went wrong!!",
      });
      setIsLoading(false);
    }
  };

  if (localStorage.getItem(AUTH_TOKEN)) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div>
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(value, actions) => {
            loginUser(value, actions);
          }}
        >
          {(props) => {
            return (
              <>
                <div className="flex min-h-screen h-full">
                  <div className="w-4/6 hidden lg:flex items-center justify-center register-page relative">
                    <div className=" absolute left-6 top-6 ">
                      <Link to={"/"}>
                        <img
                          src="./assets/logo-pharmacy.png"
                          alt="pharmacy"
                          className="logo-image"
                        />
                      </Link>
                    </div>
                    <img src="./assets/register-pict-green.svg" width="70%" />
                  </div>
                  <div className="w-full lg:w-3/6 flex justify-center flex-col p-14">
                    <div>
                      <p className="text-3xl font-bold mb-2">Hello again!</p>
                      <p className="text-xl text-slate-500">
                        Log in to your account
                      </p>
                    </div>
                    <div>
                      <Form className="mt-8 space-y-6" action="#" method="POST">
                        <input
                          type="hidden"
                          name="remember"
                          defaultValue="true"
                        />
                        <div className="rounded-md shadow-sm">
                          <div className="my-6">
                            <label
                              htmlFor="email-address"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <Field
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="pl-4 relative block w-full rounded-md border-0 py-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                placeholder="Email"
                                component={InputComponent}
                                icon={
                                  <svg
                                    fill="none"
                                    stroke="gray"
                                    stroke-width="1.5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="p-2 pt-4"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                    ></path>
                                  </svg>
                                }
                              />
                            </div>
                            <ErrorMessage
                              component="div"
                              name="email"
                              style={{ color: "red", fontSize: "12px" }}
                            />
                          </div>

                          <div className="my-6">
                            <label
                              htmlFor="password"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Password
                            </label>
                            <div className="mt-2">
                              <Field
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="pl-4 relative block w-full rounded-md border-0 py-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-900 sm:text-sm sm:leading-6"
                                placeholder="Password"
                                autoComplete="new-password"
                                component={InputComponent}
                                icon={
                                  <svg
                                    fill="none"
                                    stroke="gray"
                                    stroke-width="1.5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="p-2 pt-4"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                    ></path>
                                  </svg>
                                }
                              />
                            </div>
                            <ErrorMessage
                              component="div"
                              name="password"
                              style={{ color: "red", fontSize: "12px" }}
                            />
                          </div>
                        </div>
                        <div>
                          <Button
                            isLoading={isLoading}
                            type="submit"
                            className="w-full rounded-md py-6 text-white button-primary"
                          >
                            <p className="text-lg ">Login</p>
                          </Button>

                          <div className="flex flex-wrap gap-2 items-end justify-end my-4">
                            <p className="text-color-green text-end text-base lg:text-md">
                              Don't have an account?
                            </p>
                            <Link to={"/register"}>
                              <p className="text-color-green text-end font-bold text-md lg:text-lg hover:text-cyan-900">
                                Register
                              </p>
                            </Link>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
