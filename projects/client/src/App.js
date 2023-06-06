import axios from "axios";
import "./App.css";
import { Routes,Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";


function App() {
 
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
