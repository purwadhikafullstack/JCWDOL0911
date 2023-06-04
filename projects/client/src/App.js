import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Test from "./pages/Test";

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);

  return (
    <div className="">
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
