import axios from "axios";
import "./App.css";
import { Routes,Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import { useEffect } from "react";


function App() {
  const userProfile = {
    name: "Rifqi",
    email: "rifqirafialdy@gmail.com",
    id:1
  }
  useEffect(() => {
    localStorage.setItem('user',JSON.stringify (userProfile))
  })
  return (
    <>
    <Routes>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/forum" element={<Forum/>}/>
    </Routes>
    </>
  );
}

export default App;
